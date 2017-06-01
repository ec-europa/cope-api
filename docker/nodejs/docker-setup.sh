#!/bin/bash

# Prepare schemas
npm run bootstrap && npm run build

# Wait for CouchDB to be started
dockerize -wait ${HOST} -timeout 10s

# Create system databases
curl -X PUT http://${USERNAME}:${PASSWORD}@${DOMAIN}:${PORT}/_users
curl -X PUT http://${USERNAME}:${PASSWORD}@${DOMAIN}:${PORT}/_replicator
curl -X PUT http://${USERNAME}:${PASSWORD}@${DOMAIN}:${PORT}/_global_changes

# Push schemas
npm run push

# Run tests
npm test

exec "$@"
