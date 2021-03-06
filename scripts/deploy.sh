#!/bin/bash
commit=$(git rev-parse HEAD)
cd build
git init
git checkout -b gh-pages
git add .
git commit -am "New build by ${USER}, last commit: $commit"
git push "git@github.com:msanatan/pong.git" gh-pages:gh-pages --force
rm -Rf .git
