# Native

## Requirements

-   Node.js >= v4
-   CouchDB 2.0

## Setup

Clone the project and then run the following command in order to get a working build environment.

```bash
npm install
```

From here, we assume that your CouchDB server is running.

In order to get the application running, we have to create an administrator and
disable the secure rewrites. To do so, you can either copy the following .ini
configuration file or open the configuration page in [Fauxton](http://127.0.0.1:5984/_utils/config.html), search for `secure_rewrites` and set it to `false`. Here's a sample of
what our .ini configuration file looks like:

```ini
[admins]
admin = pass

[httpd]
secure_rewrites = false
```

By default, some system databases are missing, you will have to create them manually:

```bash
curl -X PUT http://127.0.0.1:5984/_users
curl -X PUT http://127.0.0.1:5984/_replicator
curl -X PUT http://127.0.0.1:5984/_global_changes
```

## Configuration

The default configuration can be found in _config.dist.json_. You can override it by creating a local _config.json_. Make sure to correclty set your admin credentials in your _config.json_: they are needed for the build and the tests.

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

## Listening for changes

The changes listener is an independent service you must start yourself. After
running `npm install`, you can start the service by simply typing `npm start`.

## Lint

The code is linted is ESLint.

```bash
npm run lint
```
