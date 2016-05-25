# Integration Layer

## Requirements

* Node.js >= v4
* npm >= v3.3.x
* CouchDB 1.6.1

## Setup

Clone the project and then run the following command in order to get a working build environment.

```bash
npm install
```

Also don't forget to start your CouchDB server.

## Configuration

The default configuration can be found in _config.dist.json_. You can override it by creating a local _config.json_.

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

### Redirection

```bash
npm run build:service-redirection
npm run push:service-redirection
```

### Remote browser

```bash
npm run build:service-remote-browser
npm run push:service-remote-browser
```

### Types

Provide list of types and json schema

```bash
npm run prepare:service-types
npm run build:service-types
npm run push:service-types
```
## Managing front-end dependencies

We use Bower internally to manage front-end dependencies. Each service can have
its own _bower.json_ - in which we declare the dependencies - and _.bowerrc_ to
specify the directory in which we want to store the dependencies. We then use
the `prepare:*` npm task to run the `bower install` command in the right place.

For more details, you can see how we manage types' dependencies. We
have defined a [bower.json](./services/types/bower.json) configuration file as
well as a [.bowerrc](./services/types/.bowerrc) and we also have a npm script
defined in [package.json](./package.json):

```json
  "prepare:types": "cd types && bower install"
```

## Usage

To start, follow the route exposed by the facade. By default, it should be
[http://localhost:5984/ilayer/_design/facade/_rewrite/beta]()

## Testing

You can write your tests inside the `tests` directory. We use
[Chakram](https://dareid.github.io/chakram/) and [Mocha](https://mochajs.org/)
to run the tests.

You can start the tests with the following command:

```bash
npm test
```

## Lint

The code is linted is ESLint.

```bash
npm run lint
```
