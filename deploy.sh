#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'https://client.reststate.org' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:reststate/reststate-client-docs.git master

cd -
