# ReactJS Project with TS

[![StartEase](https://img.shields.io/badge/Generated%20by-StartEase-blue)](https://github.com/JC-Coder/startease)

## Overview

Welcome to your project generated using StartEase! This guide will walk you through the basic configuration steps to get your backend project up and running.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js and npm: Download and install Node.js from [nodejs.org](https://nodejs.org/).

## Installation

Install project dependencies using npm :

```bash
   npm install
```

OR

Install project dependencies using yarn :

```bash
yarn install
```

### Start the Project

Once you've configured your environment variables, you can start your project:

```bash
npm run dev
```

Your server should now be running at <http://localhost:5173>.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
