#!/bin/sh

# Wait for CouchDB to be started & initialized
dockerize -wait ${COPE_FACADE_URL}/beta/changes -timeout 60s

# Start listener
npm start

exec "$@"
