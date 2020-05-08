# electron-react-typescript-boilerplate

A boilerplate to setup Electron with React and TypeScript. It uses Webpack to
compile both the Node and frontend code. I tried to use Parcel at first, but it
didn't work out.

The dependencies and devDependencies in _package.json_ are a confusing. For some reason,
Electron has to be in the devDependencies, which seems counter-intuitive to me.

Install dependencies:

```
yarn install
```

Run in development mode:

```
yarn start
```

Generate application:

```
yarn run pack
```
