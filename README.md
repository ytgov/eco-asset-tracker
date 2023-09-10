# ECO Asset Tracker

Currently, Executive Council Office's technology and office assets are being managed in multiple and disparate spreadsheets. This requires asset managers to access many spreadsheets to determine statuses of assets and personnel. This app consolidated these assets into a single application so that asset managers can quickly and easily see information on the assets, who it has been assigned to and where it is currently located.

## How It's Built

The ECO asset tracker app is a Vue application styled using Vuetify which communicates with a Node/Express backend.

### Backend API:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://typescriptlang.org)
- [knexjs](https://github.com/knex/knex)

### Frontend

- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Auth0-spa](https://auth0.github.io/auth0-spa-js/)

## Quick Start

### Environment Variables

### Running the application in development

#### Reuirements:

- Node.js

1. Clone the repository
2.

### Development

Before starting the API server, you need to create the appropriate .env file which can be done by running `cp src/api/.env src/api/.env.development`. You must then set the appropriate values

To develop within this environment, you must have Node.js and NPM installed on your development machine. Open two terminal windows and open one to `/src/api` and `src/web` respectively. Both the API back-end and the web front-end can be started with: `npm run start:dev`.

Once both are running, open your browser and navigate to http://localhost:8080 to view the application.

## Understanding the environment variables

Environment variables should never be checked into the repository!

- API_PORT=(the port the API will be listening on (doesn't have to match the docker port))
- FRONTEND_URL=(the url of the service, from browser)
- AUTH_REDIRECT=(FRONTEND_URL from above)/login-complete
- VIVVO_CLIENT_ID=(the client id provided for the service)
- VIVVO_CLIENT_SECRET=(the client secret provided for the service)
- VIVVO_CALLBACK_URL=(the fully qualified url of the API, must match setup in Vivvo)/authorization-code/callback

## Building the container image

docker build -t vue-template .

## Running the container in test or production

By default, the container will run in development mode, but following the step above, you can create the appropriate environment files for the instance you are targetting. Depending, the application will look for either `src/api/.env.test` or `src/api/.env.production`. To tell the API which instance to use, add the environment variable `NODE_ENV` to the docker run command like below.

`docker run -p 8222:3000 -e NODE_ENV=production --restart=on-failure vue-template`

# Vue 3 Front End Template for YG Projects

## Important Differences from Vue 2

### Vue Migration

[Vue 3](https://v3.vuejs.org/guide/introduction.html) works a little differently than Vue 2. If this is your first Vue 3 app it's probably worth reading the [Vue 3 Migration Guide](https://v3-migration.vuejs.org) - specifically the section on [breaking changes](https://v3-migration.vuejs.org/breaking-changes/).

### IDE Support

Vue 3 recommends using [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) rather than Vetur for IDE support. Volar is a fork of Vetur that is specifically designed for Vue 3. Volar and Vetur are not compatible with each other, so you will need to uninstall or disable Vetur if you have it installed.

### Composition API

To simplify migration and to make the transition easier most module implement [Vue's Options API](https://vuejs.org/guide/introduction.html#api-styles).

Vue 3 supports a new composition API which make supporting large comples apps easier. The [Vue 3 Composition API Guide](https://v3.vuejs.org/guide/composition-api-introduction.html) is a good place to start learning about the new API. The [Vue 3 API Reference](https://v3.vuejs.org/api/) is also a good place to look for specific API details.

### Vite

This template uses Vite for development and HRM. Vite is a new build tool for Vue 3 that is much faster than webpack. Some of the commands are a little different than Vue 2. The [Vite Docs](https://vitejs.dev/guide/) are a good place to start learning about Vite.

## Conversion Todos

- [x] Update to [Vue 3](https://vuejs.org)
- [x] Remove webpack and use [Vite](https://vitejs.dev) instead
- [x] Remove Vuex and add [Pinia](https://pinia.vuejs.org) for state management
- [x] Update [Vue Router](https://router.vuejs.org) for routing
- [x] Import Base components from @/components
- [x] Migrate @/layouts
- [x] Migrate config.js
- [x] Migrate urls.j
- [x] Migrate auth Library to [auth0-vue](https://github.com/auth0/auth0-vue)
- [ ] Configure auth flows for login in App.vue and @/layouts
- [ ] Convert build process to use [Vite](https://vitejs.dev)

## Module Conversion

- [x] API notification
- [x] Login/Logout/User Profile
- [ ] Data table component
- [ ] Map component
- [ ] Health check

## Project Structure

### `/src`

The root of the project. Contains the main app all the various modules, plugins, and components. `@` is an alias for `/src` and is used in the project to make imports easier to read.

### `@/components`

Contains all the base components that are used throughout the project. These can be used into the modules and layouts without a local import

### `@/layouts`

Contains the layouts for the project. These are the main containers for the modules. The layouts are used in the `App.vue` file to load the modules. Layouts define common application layouts such as the header, footer, and sidebars.

### `@/modules`

Contains the modules for the project. These are the main containers for the pages. The modules are used in the layouts to load the pages. Modules define common application modules such as the login, dashboard, and profile.

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
