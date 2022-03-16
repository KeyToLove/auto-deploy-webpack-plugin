# what is auto-deploy-webpack-plugin

a webpack plugin for deploy

# usage

安装

```bash
npm install create-express-cli -D # npm
yarn -D add create-express-cli  # yarn
```

使用

```js
// webpack.config.js
const AutoDeployWebpackPlugin = requrie("auto-deploy-webpack-plugin");

const serverConfig = {
  host: "xxxxxxxx",
  username: "root",
  password: "******",
  serverDir: "/root/path",
};

module.exports = {
  // ...
  plugins: [new AutoDeployWebpackPlugin(serverConfig)],
};
```
