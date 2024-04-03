#!/bin/bash

set -eux

# you need to create a `.env` with the path to your Stencil directory
# should look like `export STENCIL_DIR=/path/to/repo`
source .env

# grab cwd for later
REPO_DIR=$(pwd)

# Rollup build
cd "$STENCIL_DIR"
npm run clean && npm run build.rollup

cd "$REPO_DIR"
rm -rf internal/*
cp -r "$STENCIL_DIR"/internal .
rm -rf mock-doc/*
cp -r "$STENCIL_DIR"/mock-doc .

./strip-comments.mjs
npm run prettier
npm run prettier

git add internal
git add mock-doc
git commit -am "back to rollup build"

# Esbuild build
cd "$STENCIL_DIR"
npm run build

cd "$REPO_DIR"
rm -rf internal/*
cp -r "$STENCIL_DIR"/internal .
rm -rf mock-doc/*
cp -r "$STENCIL_DIR"/mock-doc .


./strip-comments.mjs
npm run prettier
npm run prettier

git add internal
git commit -am "and back to esbuild build"
