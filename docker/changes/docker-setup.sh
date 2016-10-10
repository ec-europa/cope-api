#!/bin/bash

# Wait for CouchDB to be started & initialized
dockerize -wait http://couchdb:5984/alpha/_design/facade/_rewrite/beta/changes -timeout 60s

# Push schemas
node ./services/changes/index.js

exec "$@"
