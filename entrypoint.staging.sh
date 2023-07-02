#!/bin/sh
echo "migrating"
yarn migrate:deploy

echo "go"
yarn start