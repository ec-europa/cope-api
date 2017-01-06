# Note: the context must be set to the root of the project ('../..' from here)
# This is automatically done if you use the root docker-compose.yml file
# => All paths in this file are relative to the context! <=

# Base image
FROM node:7.4.0

# Configure container
ENV NPM_CONFIG_LOGLEVEL warn

# Install dockerize (https://github.com/jwilder/dockerize)
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.3.0/dockerize-linux-amd64-v0.3.0.tar.gz \
    && tar -C /usr/local/bin -xvzf dockerize-linux-amd64-v0.3.0.tar.gz

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./services/changes/package.json /usr/src/app/
RUN npm install

# COPY setup script
COPY ./docker/changes/docker-setup.sh /

# Make setup script executable
RUN chmod +x /docker-setup.sh

# Bundle app source
COPY ./services/changes /usr/src/app
