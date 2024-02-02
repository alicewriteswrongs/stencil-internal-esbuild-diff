#!/bin/bash

rm -rf internal
cp -r ~/Code/stencil/internal .
npm run prettier

./strip-comments.mjs
npm run prettier
npm run prettier
