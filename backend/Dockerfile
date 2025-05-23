FROM python:3.10-slim AS base

# Install necessary system packages
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Copy application code
WORKDIR /app/
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# copy application code
COPY ./app /app

# copy data files to data dir
COPY ./app/data/simple_data.json /app/data/simple_data.json
COPY ./app/data/dfa-devil_fruits.json /app/data/dfa-devil_fruits.json

# Create necessary directories
RUN mkdir -p /app/data/db /app/data/backups && \
    chmod -R 777 /app/data

# Development stage
FROM base AS dev

CMD ["fastapi", "run", "./main.py", "--port", "8000"]

# Production stage
FROM base AS prod

ENV ENVIRONMENT=prod

# Install Google Cloud SDK for troubleshooting if needed
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && \
    apt-get install -y google-cloud-sdk && \
    rm -rf /var/lib/apt/lists/*

CMD ["fastapi", "run", "./main.py", "--port", "8000"]
