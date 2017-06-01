#!/bin/sh

# Wait for CouchDB to be started & initialized
dockerize -wait ${FACADE}/beta/changes -timeout 60s

# Start listener
npm start

exec "$@"
