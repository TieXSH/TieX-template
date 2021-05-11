/**
 * @file 如何处理模板
 */

const path = require('path');
const fs = require('fs');

const {
    sortDependencies,
    installDependencies,
    runLintFix,
    printMessage
} = require('./utils');
const pkg = require('./package.json');

const templateVersion = pkg.version;

// const {
//     addTestAnswers
// } = require('./scenarios');

module.exports = {
    metalsmith: {
        // When running tests for the template, this adds answers for the selected scenario
        // before: addTestAnswers
    },
    helpers: {
        if_or (v1, v2, options) {

            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
        template_version() {
            return templateVersion
        }
    },

    prompts: {
        name: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: 'Project name'
        },
        description: {
            when: 'isNotTest',
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A Vue.js project'
        },
        author: {
            when: 'isNotTest',
            type: 'string',
            message: 'Author'
        },
        vuex: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Install vuex?'
        },
        eleui: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Use element-ui develop app?'
        },
        eslint: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Use baidu ESLint to lint your code?'
        },
        stylelint: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Use baidu stylelint to lint your code?'
        },
        autoInstall: {
            when: 'isNotTest',
            type: 'confirm',
            message:
                'Should we run `npm install` for you after the project has been created? (recommended)'
        }
    },
    filters: {
        '.eslintrc.js': 'eslint',
        '.eslintignore': 'eslint',
        '.stylelintrc.js': 'stylelint',
        '.stylelintignore': 'stylelint',
        'src/utils/store.js': 'vuex',
        'src/utils/compRegister.js': 'eleui',
    },
    complete: function(data, {chalk}) {
        const green = chalk.green;
        console.log(data);
        // 1，给依赖排序
        // 2，是否自动安装
        sortDependencies(data, green);

        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);

        console.log('cwd', cwd);
        if (data.autoInstall) {
            installDependencies(cwd, 'npm', green)
            .then(() => {
                return runLintFix(cwd, data, green);
            })
            .then(() => {
                printMessage(data, green);
            })
            .catch(e => {
                console.log(chalk.red('Error:'), e);
            });
        } else {
            printMessage(data, chalk);
        }
    }
}
