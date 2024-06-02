#!/bin/bash

# Check if the target directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <target_directory>"
  exit 1
fi

# Create a new folder
TARGET_DIR=$1
mkdir -p "$TARGET_DIR"

# Copy the .next folder and package.json to the new folder
cp -R .next "$TARGET_DIR/"
cp package.json "$TARGET_DIR/"

# Zip the new folder
zip -r "$TARGET_DIR.zip" "$TARGET_DIR"

# Check if the zip command was successful
if [ $? -eq 0 ]; then
  # Delete the main folder
  rm -rf "$TARGET_DIR"
  echo "The bundle $TARGET_DIR has been created, upload it to your elastic bean stalk."
else
  echo "Failed to create zip file. The original folder has not been deleted."
fi
