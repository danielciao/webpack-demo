# Webpack playground

To run with webpack mode directly (when not using webpack --env for switching between different build config.)

```bash
npm run build -- --devtool false --mode development
```

**when used with --env, then --env takes precedence as it will**

1. read the env variables that are passed in and
2. set the webpack mode accordingly


