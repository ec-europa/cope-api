# COPE API

## Requirements

Without Docker:

-   Node.js >= v4
-   CouchDB 2.0

## Setup

Clone the project and then run the following command in order to get a working build environment.

```bash
npm install
```

Also don't forget to start your CouchDB server.

## Configuration

The default configuration can be found in _config.dist.json_. You can override it by creating a local _config.json_. Make sure to correclty set your admin credentials in your _config.json_: they are needed for the build and the tests.

Moreover, you will need to disable the `secure_rewrites` option from CouchDB. To do so, open the configuration page in Futon (`/_utils/config.html`), search for `secure_rewrites` and set it to `false`.

## Build

If you want to build the whole project, run the two following commands. Otherwise, see further explanations.

```bash
npm run prepare
npm run build
npm run push
```

### Facade

Following the facade design pattern, all the api is described here with the routing.

```bash
npm run build:facade
npm run push:facade
```

### Display

```bash
npm run build:service-display
npm run push:service-display
```

### Document

Responsible for the storage of documents, CRUD operations.

```bash
npm run build:service-document
npm run push:service-document
```

### Notification

Provide push notifications for document consumers.

```bash
npm run build:service-notification
npm run push:service-notification
```

### Types

Provide list of types and json schema

```bash
npm run prepare:service-types
npm run build:service-types
npm run push:service-types
```

## Managing front-end dependencies

We use Bower internally to manage front-end dependencies. Each service can have its own _bower.json_ - in which we declare the dependencies - and _.bowerrc_ to specify the directory in which we want to store the dependencies. We then use the `prepare:*` npm task to run the `bower install` command in the right place.

For more details, you can see how we manage types' dependencies. We have defined a [bower.json](./services/types/bower.json) configuration file as well as a [.bowerrc](./services/types/.bowerrc) and we also have a npm script defined in [package.json](./package.json):

```json
  "prepare:types": "cd types && bower install"
```

## Usage

To start, follow the route exposed by the facade. By default, it should be [http://localhost:5984/ilayer/_design/facade/_rewrite/beta]()

## Testing

You can write your tests inside the `tests` directory. We use [Chakram](https://dareid.github.io/chakram/) and [Mocha](https://mochajs.org/) to run the tests.

You can start the tests with the following command:

```bash
npm test
```

## Lint

The code is linted is ESLint.

```bash
npm run lint
```

## Docker

Build the development environment:

```bash
docker-compose build
```

Start it:

```bash
docker-compose up
```

Or start it as a daemon:

```bash
docker-compose up -d
```

When you're done, put it down:

```bash
docker-compose down
```

To develop, you can access the bash from the nodejs container:

```bash
docker-compose run --service-ports nodejs /bin/bash
```

For more information, please read our [Documentation](./docs/README.md).
