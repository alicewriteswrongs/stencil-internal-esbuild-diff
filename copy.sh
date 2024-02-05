#!/bin/bash

set -eux

# you need to create a `.env` with the path to your Stencil directory
# should look like `export STENCIL_DIR=/path/to/repo`
source .env

# clear out old stuff
rm -rf internal/rollup/*
rm -rf internal/esbuild/*

# grab cwd for later
REPO_DIR=$(pwd)

# Rollup build
cd $STENCIL_DIR
npm run clean && npm run build

cd $REPO_DIR
cp -r $STENCIL_DIR/internal ./internal/

./strip-comments.mjs
npm run prettier
npm run prettier

git commit -am "back to rollup build"

# Esbuild build
cd $STENCIL_DIR
npm run clean && npm run build.esbuild

cd $REPO_DIR
cp -r $STENCIL_DIR/internal ./internal/

./strip-comments.mjs
npm run prettier
npm run prettier

git commit -am "and back to esbuild build"
