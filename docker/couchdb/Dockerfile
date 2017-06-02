FROM klaemo/couchdb:2.0.0

# Install dockerize (https://github.com/jwilder/dockerize)
ENV DOCKERIZE_VERSION v0.4.0
RUN curl -SLO https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Copy local configuration
# COPY local.ini /opt/couchdb/etc/
COPY local.ini.tmpl /opt/couchdb/etc/local.ini.tmpl

# Set default environment variables
ENV COPE_DB_USERNAME admin
ENV COPE_DB_PASSWORD pass

# Run dockerize and launch CouchDB
CMD dockerize -template /opt/couchdb/etc/local.ini.tmpl:/opt/couchdb/etc/local.ini /opt/couchdb/bin/couchdb
