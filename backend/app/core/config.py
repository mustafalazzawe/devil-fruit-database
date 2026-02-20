import os
from typing import Optional
from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.core.constants import Environment


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    PROJECT_NAME: str = "Devil Fruit Database"

    DOMAIN: str = "localhost"
    ENVIRONMENT: Environment = Environment.DEV

    IS_ALLOWED_CREDENTIALS: bool = True
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost",
        "http://localhost:5173",
        "http://0.0.0.0:5173",
        "http://127.0.0.1:5173",
        "http://mustafalazzawe.github.io",
        "https://mustafalazzawe.github.io",
    ]
    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]

    SQLITE_DB_PATH: str = "data/db/devil_fruits.db"
    
    GC_PROJECT_ID: str = "devil-fruit-database-id"
    GC_SECRET_ID: str = "devil-fruit-service-account-key"

    GCS_BUCKET_NAME: str = "devil-fruit-database-id-db"
    GCS_DB_PATH: str = "db/devil_fruits.db"

    API_KEY: str = ""

    @computed_field
    @property
    def USE_GCP(self) -> bool:
        """Determine if GCP services should be used"""
        return self.ENVIRONMENT.is_prod or (self.ENVIRONMENT.is_dev and os.getenv('USE_GCP', 'false').lower() == 'true')

    @computed_field
    @property
    def GOOGLE_APPLICATION_CREDENTIALS(self) -> Optional[str]:
        if self.ENVIRONMENT.is_prod:
            return None
        return "auth/devil-fruit-database-id-74c3321bcd94.json" if self.ENVIRONMENT.is_dev else None

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"sqlite:///{self.SQLITE_DB_PATH}"


settings = Settings()
