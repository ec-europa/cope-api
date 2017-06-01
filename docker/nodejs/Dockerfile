# Note: the context must be set to the root of the project ('../..' from here)
# This is automatically done if you use the root docker-compose.yml file
# => All paths in this file are relative to the context! <=

# Base image
FROM node:8-alpine

# Configure container
ENV NPM_CONFIG_LOGLEVEL warn
ENV DOCKERIZE_VERSION v0.4.0

# Install dockerize (https://github.com/jwilder/dockerize)
RUN apk add --no-cache openssl curl

ENV DOCKERIZE_VERSION v0.4.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# COPY setup script
COPY ./docker/nodejs/docker-setup.sh /

# Setup directories and permissions
RUN chmod +x /docker-setup.sh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
