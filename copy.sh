#!/bin/bash

rm -rf internal
cp -r ~/Code/stencil/internal .

npm run prettier
