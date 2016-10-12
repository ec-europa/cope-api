# Using Docker

## Requirements

-   Docker >= 1.x
-   Docker Compose

## Setup

Build the development environment:

```bash
docker-compose build
```

## Running the environment

You can either choose to run all the services in the same console or launch
them one by one.

### All-in-one

Start the whole environment (CouchDB + Node.js push schema + changes listener):

```bash
docker-compose up
```

Or start it as a daemon:

```bash
docker-compose up -d
```

### Step-by-step

You can also start the services one by one (in different terminals for example):

```
docker-compose up couchdb
docker-compose up nodejs
docker-compose up changes
```

## Accessing the Node.js container

To develop, you can access the bash from the nodejs container:

```bash
docker-compose run --service-ports nodejs /bin/bash
```

## Shutting it down

When you're done, put it down:

```bash
docker-compose down
```
