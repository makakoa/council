#!/bin/bash

export NODE_PATH=$NODE_PATH:./api:./api/src

node ./api/db/migrate "$@"

nodemon --ignore app api
