# what is auto-deploy-webpack-plugin

A webpack plugin for deploy

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


// tips:直接将服务器信息（用户名、密码）写在这是不推荐的，正确的做法可以是项目下创建一个服务器配置文件并将其添加到.gitignore文件中，然后在这将其引入，避免敏感信息通过git上传到远程代码仓库，造成泄漏的等安全问题。
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
