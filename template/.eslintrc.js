module.exports = {
    extends: [
        '@ecomfe/eslint-config/baidu/default', // 根据代码库ES版本选择default或es5
        '@ecomfe/eslint-config/baidu/defect', // 根据代码库ES版本选择defect或defect-es5
        '@ecomfe/eslint-config/vue'
    ],
    rules: {
        // 关闭arrow-parens规则
        'arrow-parens': 'off',
        // 修改规则等级为warn
        'no-array-constructor': 'warn',
        'no-class-assign': 'off',
        'vue/max-len': 'off',
        'vue/attribute-hyphenation': 'off'
    }
};