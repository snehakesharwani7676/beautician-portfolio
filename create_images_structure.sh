#!/usr/bin/env bash
set -euo pipefail

# Create the full images folder structure and add a .gitkeep to each directory
mkdir -p images/{makeup/{self-makeup,teen-makeup,reception-makeup,engagement-makeup,bridal-makeup,glam-makeup,fantasy,bronze-tan,model-bride},hair/{hair-do,keratin,rebonding,botox,smoothening,hairstyles},skin-nails/{nail-art,nail-extensions,facials,manicure-pedicure,waxing}}

# Ensure every directory has a .gitkeep so git tracks empty folders
find images -type d -print0 | while IFS= read -r -d '' d; do
  touch "$d/.gitkeep"
done

echo "Created images/ structure and added .gitkeep files to each folder."