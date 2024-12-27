#!/bin/bash

# Start PostgreSQL
service postgresql start

# Wait for PostgreSQL to be ready
until pg_isready; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

ls -la

echo $PYTHONPATH
python -c "import sys; print('\n'.join(sys.path))"

# Make script executable
# chmod +x /app/app/core/db_management.py

# Run script directly
# ./app/core/db_management.py force-reset --env prod

# Initialize database
# python -m app.core.db_management force-reset --env prod
