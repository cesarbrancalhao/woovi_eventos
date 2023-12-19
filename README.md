This repository used [relay-fullstack](https://github.com/lvarayut/relay-fullstack) as a starting point. Please take a look at the code.

## Usage

Open git bash and follow the instructions:
```bash
$ git clone https://github.com/cesarbrancalhao/woovi_eventos.git
$ cd woovi_eventos
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

[Relay](https://facebook.github.io/relay)

[React](https://facebook.github.io/react)

[GraphQL](https://github.com/facebook/graphql)

[Express](http://expressjs.com/)

[Webpack](https://webpack.github.io)

[Babel](https://babeljs.io)

[ES6/ES7](https://github.com/lukehoban/es6features)

[PostCSS](http://postcss.org)

[Eslint](http://eslint.org)

[Autoprefixer](https://github.com/postcss/autoprefixer)

[Precss](https://github.com/jonathantneal/precss)

[Nodemon](http://nodemon.io)

[CSS Modules](https://github.com/css-modules/css-modules)
