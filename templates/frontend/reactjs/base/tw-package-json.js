export const ReactJsJavaScriptTempWithTailwind = {
  name: "startease-react-javascript-temp",
  description:
    "Startease template to get up and developing quickly with React and JavaScript",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    lint: "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
  },
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
  },
  devDependencies: {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    eslint: "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    vite: "^4.4.5",
    postcss: "^8.4.31",
    tailwindcss: "^3.3.3",
    autoprefixer: "^10.4.16",
  },
};

export const ReactJsTypeScriptTempWithTailwind = {
  name: "startease-react-typescript-temp",
  description:
    "Startease template to get up and developing quickly with React and TypeScript",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
  },
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
  },
  devDependencies: {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    eslint: "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    typescript: "^5.0.2",
    vite: "^4.4.5",
    postcss: "^8.4.31",
    tailwindcss: "^3.3.3",
    autoprefixer: "^10.4.16",
  },
};
