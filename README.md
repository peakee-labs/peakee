# Peakee

Monorepo for language learning platform

# Technology

- Mobile: React Native
- Web: ReactJS, NextJS
- UI-Package: React Native Web (Universal UI Components)
- Monorepo using Yarn workspace and Turbo
- Deployment: SST, AWS
- CI/CD: Github Actions

## Chrome extension

Place `.env` file at `apps/extension`

Run a dev server for all extension components

```
cd apps/extension && yarn start
```

To build in dev mode

```
yarn build
```

To build in production mode

```
yarn build:prod
```
