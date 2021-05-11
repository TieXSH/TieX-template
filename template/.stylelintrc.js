module.exports = {
    extends: '@ecomfe/stylelint-config',
    rules: {
        'rule-empty-line-before': null,
        'block-opening-brace-space-before': null,
        'comment-empty-line-before': null,
        'selector-type-no-unknown': null,
        // 缩进4
        'indentation': 4,
        // 增加允许使用百度小程序专用单位
        'unit-no-unknown': [
            true,
            {
                'ignoreUnits': ['rpx']
            }
        ],
        // 禁止url里面使用引号
        'function-url-quotes': 'never',
        // 文本内容必须用双引号包围
        'string-quotes': 'double',
        // 禁止属性使用浏览器引擎前缀
        'property-no-vendor-prefix': null,
        // 限制单行的长度不得超过120字符，会忽略url，因为url不可控
        'max-line-length': null,
        // 禁止使用命名的颜色
        'color-named': 'never',
        // font-weight必须是数字
        'font-weight-notation': 'numeric'
    }
};
