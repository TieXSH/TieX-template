/**
 * @file 模板安装工具库
 */

const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;


exports.sortDependencies = function sortDependencies(data) {
    // 读取文件，解析为json对象，排序，重写文件
    const packageJsonFile = path.join(
        data.inPlace ? '' : data.destDirName,
        'package.json'
    )
    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
    packageJson.devDependencies = sortObject(packageJson.devDependencies)
    packageJson.dependencies = sortObject(packageJson.dependencies)
    fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

// 依赖排序方式
function sortObject(object) {
    // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
    const sortedObject = {}
    Object.keys(object)
        .sort()
        .forEach(item => {
            sortedObject[item] = object[item]
        })
    return sortedObject
}


// 安装依赖
exports.installDependencies = function installDependencies(
    cwd,
    executable = 'npm',
    color
) {
    console.log(`\n\n# ${color('Installing project dependencies ...')}`)
    console.log('# ========================\n')
    return runCommand(executable, ['install'], {
        cwd,
    })
}

function runCommand(cmd, args, options) {
    return new Promise((resolve, reject) => {
        const spwan = spawn(
            cmd,
            args,
            Object.assign(
                {
                    cwd: process.cwd(),
                    stdio: 'inherit',
                    shell: true,
                },
                options
            )
        )
        spwan.on('exit', () => {
            resolve()
        })
    })
}

// eslint 修复
exports.runLintFix = function runLintFix(cwd, data, color) {
    if (data.lint && lintStyles.indexOf(data.lintConfig) !== -1) {
        console.log(
        `\n\n${color(
            'Running eslint --fix to comply with chosen preset rules...'
        )}`
        )
        console.log('# ========================\n')
        const args =
        data.autoInstall === 'npm'
            ? ['run', 'lint', '--', '--fix']
            : ['run', 'lint', '--fix']
        return runCommand(data.autoInstall, args, {
            cwd,
        })
    }
    return Promise.resolve()
}

exports.printMessage = function printMessage(data, { green, yellow }) {
    const message = `
    # ${green('Project initialization finished!')}
    # ========================

    To get started:

        ${yellow(
        `${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${installMsg(
            data
        )}${lintMsg(data)}npm start`
        )}
    `
    console.log(message)
}

// 安装提示语
function installMsg(data) {
    return !data.autoInstall ? 'npm install\n  ' : ''
}

// eslint修复提示语
function lintMsg(data) {
    return !data.autoInstall &&
      data.eslint
      ? 'npm run  eslint-fix\n  '
      : ''
}