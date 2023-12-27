## Usage

Open git bash and follow the instructions:

```bash
$ git clone https://github.com/cesarbrancalhao/woovi_eventos.git
$ cd woovi_eventos
$ npm install -g nodemon
$ npm install
$ npm start
```

- `http://localhost:3000` -> Relay
- `http://localhost:8000` -> GraphQL.

## Project Structure

    ├── client - All of client side
    │   ├── assets
    │   ├── components - App and Events
    │   │   └── variables.scss
    │   ├── routes
    │   │   ├── Route.js
    │   │   └── ViewerQuery.js - Entry node for GraphQL
    │   └── index.js
    ├── server - Server side code
    │   ├── config
    │   │   └── environment
    │   │       ├── development.js
    │   │       ├── index.js
    │   │       ├── production.js
    │   │       └── test.js
    │   ├── data
    │   │   ├── database.js - Database logic
    │   │   ├── schema.graphql - Compiled schema
    │   │   ├── schema.js - Schema definitions
    │   │   └── schema.json
    │   ├── utils
    │   │   ├── babelRelayPlugin.js
    │   │   └── updateSchema.js - Compiler for schema to schema.json/schema.graphql
    │   └── index.js - Server entry point
    ├── package.json - List of dependencies
    ├── webpack.config.js

## Stacks

- [React](https://facebook.github.io/react) v15.4.1

- [Relay](https://facebook.github.io/relay) v0.10

- [GraphQL](https://github.com/facebook/graphql) v0.8.2

- [NodeJS](https://nodejs.org/en) v6.6

- [Npm](https://www.npmjs.com/) v3.10

- [Express](http://expressjs.com/) v4.14

- [Webpack](https://webpack.github.io) v2.2

- [Babel](https://babeljs.io) v6.18

- [PostCSS](http://postcss.org) v2.2

- [Eslint](http://eslint.org) v3.12

- [Autoprefixer](https://github.com/postcss/autoprefixer) v6.6

- [Precss 1.4](https://github.com/jonathantneal/precss) v1.4

- [Nodemon](http://nodemon.io) v1.11

- [Webpack](https://webpack.js.org/) v2.2

- [CSS Modules](https://github.com/css-modules/css-modules)
