#!/bin/sh

# Prepare schemas
npm run bootstrap && npm run build

# Wait for CouchDB to be started
dockerize -wait ${COPE_DB_HOST} -timeout 10s

# Create system databases
curl -X PUT http://${COPE_DB_USERNAME}:${COPE_DB_PASSWORD}@${COPE_DB_DOMAIN}:${COPE_DB_PORT}/_users
curl -X PUT http://${COPE_DB_USERNAME}:${COPE_DB_PASSWORD}@${COPE_DB_DOMAIN}:${COPE_DB_PORT}/_replicator
curl -X PUT http://${COPE_DB_USERNAME}:${COPE_DB_PASSWORD}@${COPE_DB_DOMAIN}:${COPE_DB_PORT}/_global_changes

# Push schemas
npm run push

# Run tests
npm test

exec "$@"
