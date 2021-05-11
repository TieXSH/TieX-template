/**
 * @file 如何处理模板
 */

const path = require('path');
const fs = require('fs');

// const {
//     sortDependencies,
//     installDependencies,
//     runLintFix,
//     printMessage
// } = require('./utils');
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
        // build: {
        //     when: 'isNotTest',
        //     type: 'list',
        //     message: 'Vue build',
        //     choices: [
        //         {
        //             name: 'Runtime + Compiler: recommended for most users',
        //             value: 'standalone',
        //             short: 'standalone'
        //         },
        //         {
        //             name:
        //                 'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
        //             value: 'runtime',
        //             short: 'runtime'
        //         }
        //     ]
        // },
        router: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Install vue-router?'
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
        // lintConfig: {
        //     when: 'isNotTest && lint',
        //     type: 'list',
        //     message: 'Pick an ESLint preset',
        //     choices: [
        //         {
        //             name: 'Standard (https://github.com/standard/standard)',
        //             value: 'standard',
        //             short: 'Standard'
        //         },
        //         {
        //             name: 'Airbnb (https://github.com/airbnb/javascript)',
        //             value: 'airbnb',
        //             short: 'Airbnb'
        //         },
        //         {
        //             name: 'none (configure it yourself)',
        //             value: 'none',
        //             short: 'none'
        //         }
        //     ]
        // },
        // unit: {
        //     when: 'isNotTest',
        //     type: 'confirm',
        //     message: 'Set up unit tests'
        // },
        // runner: {
        //     when: 'isNotTest && unit',
        //     type: 'list',
        //     message: 'Pick a test runner',
        //     choices: [
        //         {
        //             name: 'Jest',
        //             value: 'jest',
        //             short: 'jest'
        //         },
        //         {
        //             name: 'Karma and Mocha',
        //             value: 'karma',
        //             short: 'karma'
        //         },
        //         {
        //             name: 'none (configure it yourself)',
        //             value: 'noTest',
        //             short: 'noTest'
        //         }
        //     ]
        // },
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
        'src/router/**/*': 'router',
        'src/utils/compRegister.js': 'eleui'
    },
    complete: function(data, {chalk}) {
        const green = chalk.green;
        console.log(data);
        // sortDependencies(data, green);

        // const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);

        // if (data.autoInstall) {
        //     installDependencies(cwd, data.autoInstall, green)
        //     .then(() => {
        //         return runLintFix(cwd, data, green);
        //     })
        //     .then(() => {
        //         printMessage(data, green);
        //     })
        //     .catch(e => {
        //         console.log(chalk.red('Error:'), e);
        //     });
        // } else {
        //     printMessage(data, chalk);
        // }
    }
}