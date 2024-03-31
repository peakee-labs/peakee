<h1 align="center">Peakee</h1>
<p align="center">Monorepo for a language learning platform.</p>
<p align="center">React Native, ReactJS, NextJS, Babel, Webpack, SST, AWS, Github Actions</p>

## Project structure

```
├── apps
│ ├── dashboard -> admin dashboard
│ ├── extension -> browser extension - React Native Web, Webpack, Babel
│ ├── landing -> landing page / docs - NextJS, ReactJS, Styled-component
│ ├── mobile -> mobile app - React Native
│ └── web -> web app - NextJS, React Native Web
├── cli
├── packages
│ ├── app -> almost implementation goes here
│ ├── ui -> universal UI components
│ ├── icons -> all app icons
│ └── utils -> common utils
│ ├── chat -> deprecated
│ ├── eslint-config
│ ├── tsconfig
├── stacks -> setup SST/deployment
└── tools -> general configuration
...
```

## Install all dependencies

```
yarn install
```

## Mobile App

```
cd apps/mobile
```

You need to setup `.env` file in `apps/mobile`

Prepare `google-services.json` in `apps/mobile/android/app`

Prepare `GoogleService-Info.plist` in `apps/mobile/ios`

```
cd ios && pod install # install ios dependencies
```

```
yarn start
```

## Web App

Prepare `.env` please check `.env.example`

```
cd apps/web && yarn dev
```

## Chrome extension

Place `.env` file in `apps/extension`

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

## Landing page

```
cd apps/landing && yarn dev
```
