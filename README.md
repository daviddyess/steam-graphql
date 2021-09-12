# steam-graphql

GraphQL API server for Steam and game servers

## Requirements

- node.js
- postgreSQL

## Install

```ssh
npm install
```

### Configure

- Copy `/.env.default` as `/.env`

### Start / Development

```ssh
npm start
```

- Nodemon is enabled, server will restart when file changes are detected
- Utilizes `babel-node`, therefore running `build` isn't required

### Build

```ssh
npm run build
```

- Built project is located in the `/.build` folder

### Serve

```ssh
npm run serve
```

- It isn't necessary to run `build` before running `serve`

## GraphiQL

The server offer the GraphiQL in-browser query tool, available at `http://localhost:4020/api`

## Documentation

**Query** examples are located in the `/docs/queries` folder.
