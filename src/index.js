import { NodeSSH } from "node-ssh"
import chalk from "chalk"
const log = console.log
class AutoDeployWebpackPlugin {
    constructor(config) {
        this.ssh = new NodeSSH();
        this.config = config;
        this.isFail = false
    }

    async connectServer() {
        try {
            await this.ssh.connect({
                host: this.config.host,
                username: this.config.username,
                password: this.config.password
            });
            log(chalk.blue('服务器连接成功~'))
        } catch (error) {
            log(chalk.redBright('连接服务器失败!\n' + error))
            this.isFail = true
        }
    }

    async uploadFiles(localPath, remotePath) {
        if (this.isFail) return
        try {
            log(chalk.blue('开始上传文件,请稍后～'))
            await this.ssh.putDirectory(localPath, remotePath, {
                // 递归上传
                recursive: true,
                // 并发数
                concurrency: 10
            });
            log('\n' + chalk.cyan('发布成功！'))
        } catch (error) {
            log('\n' + chalk.redBright('发布失败！') + '\n' + error)
            this.isFail = true
        }
    }

    async removeFiles() {
        if (this.isFail) return
        try {
            log(chalk.blue('开始清空远程目标目录,请稍后～'))
            const serverDir = this.config.serverDir;
            await this.ssh.execCommand(`rm -rf ${serverDir}/*`);
            return serverDir
        } catch (error) {
            log(chalk.redBright('清空远程目录失败!\n' + error))
            this.isFail = true
        }
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync("AutoDeployWebpackPlugin", async (compilation, callback) => {
            // 1. 获取输出文件夹
            const outputPath = compilation.outputOptions.path
            // 2. 连接服务器(SSH)
            await this.connectServer();
            // 3. 删除原来目录中的内容
            const serverDir = await this.removeFiles()
            // 4. 上传文件到服务器
            await this.uploadFiles(outputPath, serverDir);
            // 5. 关闭 ssh
            this.ssh.dispose();
            callback();
        })
    }
}
export default AutoDeployWebpackPlugin
