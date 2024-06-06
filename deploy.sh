#!/bin/bash

# Step 1: Install dependencies
echo "Installing dependencies..."
npm i -f && sudo npm i -g pm2

# Step 2: Build the application with environment variables
echo "Building the application..."

# Default values
DB_HOST=${1:-localhost}
DB_USER_NAME=${2:-postgres}
DB_NAME=${3:-postgres}
DB_PASSWORD=${4:-krishnateja}

# Building with provided or default environment variables
cross-env DB_HOST=$DB_HOST DB_USER_NAME=$DB_USER_NAME DB_NAME=$DB_NAME DB_PASSWORD=$DB_PASSWORD next build

# Step 3: Run the application
echo "Starting the application with PM2..."
pm2 start ecosystem.config.js

echo "Deployment complete."
