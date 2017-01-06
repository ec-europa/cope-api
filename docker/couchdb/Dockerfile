FROM klaemo/couchdb:2.0.0

# Install build dependencies
RUN apt-get -y update && apt-get install -y wget

# Install dockerize (https://github.com/jwilder/dockerize)
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.3.0/dockerize-linux-amd64-v0.3.0.tar.gz \
    && tar -C /usr/local/bin -xvzf dockerize-linux-amd64-v0.3.0.tar.gz

# Copy local configuration
# COPY local.ini /opt/couchdb/etc/
COPY local.ini.tmpl /opt/couchdb/etc/local.ini.tmpl

# Set default environment variables
ENV USERNAME admin
ENV PASSWORD pass

# Run dockerize and launch CouchDB
CMD dockerize -template /opt/couchdb/etc/local.ini.tmpl:/opt/couchdb/etc/local.ini /opt/couchdb/bin/couchdb
