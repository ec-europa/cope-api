# Note: the context must be set to the root of the project ('../..' from here)
# This is automatically done if you use the root docker-compose.yml file
# => All paths in this file are relative to the context! <=

# Base image
FROM node:7.4.0

# Install Yarn
RUN npm install -g yarn

# Configure container
ENV NPM_CONFIG_LOGLEVEL warn

# Install dockerize (https://github.com/jwilder/dockerize)
ENV DOCKERIZE_VERSION v0.4.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

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
