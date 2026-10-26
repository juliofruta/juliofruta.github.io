#!/bin/sh
# Copies the static site into dist/ for Cloudflare Pages.
set -e
cd "$(dirname "$0")/.."
rm -rf dist && mkdir dist
cp index.html resume.html dist/
