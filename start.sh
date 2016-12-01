#!/bin/bash

if [ "$APP" == "API" ]; then
    export NODE_PATH=./lib:./api:./api/src:$NODE_PATH
    node ./api/db/migrate "$@"
    node  api
fi

if [ "$APP" == "WEB" ]; then
    node app/server.js
fi