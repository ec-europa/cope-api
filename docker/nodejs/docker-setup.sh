#!/bin/bash

# Prepare schemas
npm run prepare && npm run build

# Wait for CouchDB to be started
dockerize -wait http://couchdb:5984 -timeout 10s

# Create system databases
curl -X PUT http://admin:pass@couchdb:5984/_users
curl -X PUT http://admin:pass@couchdb:5984/_replicator
curl -X PUT http://admin:pass@couchdb:5984/_global_changes

# Push schemas
npm run push

# Run tests
npm test

exec "$@"
