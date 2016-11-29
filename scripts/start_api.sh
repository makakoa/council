#!/bin/bash

export NODE_PATH=./api:$NODE_PATH

node ./api/db/migrate "$@"

nodemon --ignore app api
