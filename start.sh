#!/bin/bash

if [[ "$1" == "dev" ]]; then
    docker-compose -f docker-compose.dev.yml up --build
elif [[ "$1" == "prod" ]]; then
    docker-compose -f docker-compose.prod.yml up --build
else
    echo "Invalid parameter. Please specify 'dev' or 'prod'."
fi