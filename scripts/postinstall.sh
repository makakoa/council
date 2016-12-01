#!/bin/bash

if [ "$APP" == "WEB" ]; then
    NODE_ENV='production' webpack
    export NODE_PATH=./lib:./app:./app/src:$NODE_PATH
    node app/styler.js
fi