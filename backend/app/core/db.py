import json
import os
import shutil
import time

from uuid import UUID
from pathlib import Path
from datetime import datetime
from sqlmodel import create_engine, SQLModel, Session, select

from google.cloud import storage, secretmanager
from google.auth import default
from google.oauth2 import service_account

from app.core.config import settings
from app.models import (
    DevilFruit,
    FruitTypeAssociation,
    RomanizedName,
    TranslatedName,
    User,
    UserAwakening,
)


def get_engine_config():
    config = {
        "connect_args": {
            "check_same_thread": False,
        },
        "echo": settings.ENVIRONMENT.is_dev,
    }

    if settings.ENVIRONMENT.is_prod:
        # SQLite read-only configuration
        config["connect_args"].update(
            {
                "uri": True,
            }
        )

    return config


def set_engine():
    return create_engine(str(settings.SQLALCHEMY_DATABASE_URI), **get_engine_config())


engine = set_engine()

def ensure_db_directory_exists():
    """Ensure the database directory exists."""
    # Get the directory path without the filename
    db_path = Path(settings.SQLITE_DB_PATH)
    db_dir = db_path.parent
    
    if not db_dir.exists():
        print(f"Creating database directory at {db_dir}")
        db_dir.mkdir(parents=True, exist_ok=True)

def init_db():
    print("Initializing database...")
    try:
        ensure_db_directory_exists()

        SQLModel.metadata.create_all(engine)
        print("Database initialized successfully")
    except Exception as e:
        print(f"Failed to initialize database: {e}")
        raise


def drop_db():
    db_path = Path(settings.SQLITE_DB_PATH)
    if db_path.exists():
        try:
            db_path.unlink()
            SQLModel.metadata.drop_all(engine)
        except Exception as e:
            print(f"Failed to drop database: {e}")
            raise


def backup_db():
    db_path = Path(settings.SQLITE_DB_PATH)
    if not db_path.exists():
        raise FileNotFoundError(f"Database file not found: {db_path}")

    backup_dir = Path("backend/app/data/backups")
    if not backup_dir.exists():
        print(f"Creating backup directory at {backup_dir}")
        backup_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = backup_dir / f"devil_fruits_{timestamp}.db"

    try:
        shutil.copy2(db_path, backup_path)
        return backup_path
    except Exception as e:
        print(f"Failed to backup database: {e}")
        raise


def get_session():
    with Session(engine) as session:
        yield session


def load_json_data(json_file_path: str):
    with open(json_file_path, "r") as file:
        data = json.load(file)

        return data["devil_fruits"]


def verify_db_population() -> bool:
    with Session(engine) as session:
        try:
            # Check tables exist and have data
            devil_fruits = session.exec(select(DevilFruit)).all()

            print(f"\nVerification Results:")
            print(f"Devil Fruits: {len(devil_fruits)}")

            if len(devil_fruits) == 0:
                print("ERROR: Data population failed - empty tables")
                return False

            # Sample check
            sample = session.exec(select(DevilFruit).limit(1)).first()
            print(f"\nSample Devil Fruit:")
            print(f"ID: {sample.fruit_id}")

            return True
        except Exception as e:
            print(f"ERROR: Database verification failed - {str(e)}")
            return False


def populate_db(json_file_path: str, upload: bool = False):
    # Wait for database to be ready
    retries = 5
    while retries > 0:
        try:
            init_db()
            break
        except Exception as e:
            print(f"Database not ready, retrying... {e}")
            retries -= 1
            time.sleep(2)

    print("Database ready, populating...")

    devil_fruits_data = load_json_data(json_file_path)

    with Session(engine) as session:
        for fruit_data in devil_fruits_data:
            # Create devil fruit table
            devil_fruit = DevilFruit(
                fruit_id=UUID(fruit_data["fruit_id"]),
                ability=fruit_data["abilities"]["ability"],
                awakened_ability=fruit_data["abilities"]["awakened_ability"],
                is_canon=fruit_data["is_canon"],
            )
            session.add(devil_fruit)

            # Add romanized names
            for rname in fruit_data["names"]["romanized_names"]:
                romanized_name = RomanizedName(
                    name=rname["name"],
                    is_spoiler=rname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(romanized_name)

            # Add translated names
            for tname in fruit_data["names"]["translated_names"]:
                translated_name = TranslatedName(
                    name=tname["name"],
                    is_spoiler=tname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(translated_name)

            # Add types
            for type_data in fruit_data["types"]:
                fruit_type = FruitTypeAssociation(
                    type=type_data["type"],
                    is_spoiler=type_data["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(fruit_type)

            # Add current users
            if fruit_data["users"]["current_users"]:
                for user_data in fruit_data["users"]["current_users"]:
                    user = User(
                        user=user_data["user"],
                        is_artificial=user_data["is_artificial"],
                        is_current=True,
                        is_spoiler=user_data["is_spoiler"],
                        fruit_id=devil_fruit.fruit_id,
                    )
                    session.add(user)

                    # Add user awakening
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

            # Add previous users
            if fruit_data["users"]["previous_users"]:
                for user_data in fruit_data["users"]["previous_users"]:
                    user = User(
                        user=user_data["user"],
                        is_current=False,
                        is_spoiler=user_data["is_spoiler"],
                        fruit_id=devil_fruit.fruit_id,
                    )
                    session.add(user)

                    # Add user awakening
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

        session.commit()

        db_populated = verify_db_population()

        if db_populated and upload:
            upload_db_to_gcs()  


# GOOGLE CLOUD STORAGE

def get_service_account_key():
    """Retrieve service account key from Secret Manager."""
    print("Attempting to retrieve service account key from Secret Manager...")
    try:
        credentials, _ = default()
        client = secretmanager.SecretManagerServiceClient(credentials=credentials)
        
        name = f"projects/{settings.GC_PROJECT_ID}/secrets/{settings.GC_SECRET_ID}/versions/latest"
        response = client.access_secret_version(request={"name": name})
        
        payload = response.payload.data.decode("UTF-8")
        if not payload:
            raise ValueError("Service account key is empty")
        
        print("Successfully retrieved service account key")
        return json.loads(payload)
    except Exception as e:
        print(f"Failed to retrieve service account key: {e}")
        raise

def get_gcs_client():
    print("\nInitializing GCS client...")
    try:
        if settings.ENVIRONMENT.is_prod:
            print("Production environment detected, using Workload Identity...")
            # Debug directory structure
            print("Current working directory:", os.getcwd())
            print("Directory contents:", os.listdir("/app/data"))

            # Explicitly unset GOOGLE_APPLICATION_CREDENTIALS to force Workload Identity
            if 'GOOGLE_APPLICATION_CREDENTIALS' in os.environ:
                del os.environ['GOOGLE_APPLICATION_CREDENTIALS']
            return storage.Client(project=settings.GC_PROJECT_ID)
        else:
            print("Development environment detected, using Secret Manager...")
            service_account_key = get_service_account_key()
            credentials = service_account.Credentials.from_service_account_info(
                service_account_key,
                scopes=['https://www.googleapis.com/auth/cloud-platform']
            )
            return storage.Client(credentials=credentials, project=settings.GC_PROJECT_ID)
    except Exception as e:
        print(f"Failed to initialize GCS client: {e}")
        raise

def download_db_from_gcs():
    if not settings.USE_GCP:
        print("GCP services disabled, using local database")
        init_db()
        return

    try:
        client = get_gcs_client()
        if not client:
            print("Failed to create GCS client.")
            return
        
        bucket = client.bucket(settings.GCS_BUCKET_NAME)
        blob = bucket.blob(settings.GCS_DB_PATH)

        # Download the database file
        db_path = Path(settings.SQLITE_DB_PATH)
        
        # Ensure only the directory exists, not the full path
        ensure_db_directory_exists()

        # If the file exists and is a directory, remove it
        if db_path.exists() and db_path.is_dir():
            print(f"Removing incorrectly created directory at {db_path}")
            db_path.rmdir()

        if not blob.exists():
            print(f"Database file not found in GCS: {settings.GCS_DB_PATH}")
            print("Initializing a new database...")
            init_db()
            return

        print(f"Downloading database from GCS: {settings.GCS_DB_PATH}")
        blob.download_to_filename(str(db_path))
        print(f"Database downloaded from GCS to {db_path}")
    except Exception as e:
        print(f"Failed to download database: {e}")
        print(f"Current directory structure:")
        os.system(f"ls -la {db_path.parent}")
        raise

def upload_db_to_gcs():
    if not settings.USE_GCP:
        print("GCP services disabled, skipping upload")
        return

    client = get_gcs_client()
    if not client:
        print("Failed to create GCS client.")
        return
    
    bucket = client.bucket(settings.GCS_BUCKET_NAME)
    blob = bucket.blob(settings.GCS_DB_PATH)

    # Upload the database file
    db_path = Path(settings.SQLITE_DB_PATH)
    if db_path.exists():
        print(f"Uploading database to GCS: {settings.GCS_DB_PATH}")
        blob.upload_from_filename(db_path)
        
        print(f"Database uploaded to GCS: {settings.GCS_DB_PATH}")
    else:
        print(f"Database file not found: {db_path}")




