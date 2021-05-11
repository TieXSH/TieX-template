export PATH=$NODEJS_12_16_1_BIN:$YARN_1_22_4_BIN:$PATH

# jarvis app name
JARVIS_APP_NAME='{{name}}'
# code build folder(eg: dist or build)
SOURCE_FLODER='dist'
PUBLICK_SOURCE_FLODER='server/public'
# The absolute path of your code
BASEDIR=$(pwd)
# output folder
OUTPUT=output/${JARVIS_APP_NAME}
# custom node version for agile build
NPM_REGITRY="http://registry.npm.baidu-int.com"
function procedure_check() {
    [[ "$?" != "0" ]] && exit $?
    return 0
}
# 准备build node 环境，不需要修改
function prepare_build_env() {
    # node_modules should be another repo, build more quickly
    # Add node and node_modules env
    # 编译集群提供了node环境，直接使用即可（其他版本：http://wiki.baidu.com/pages/viewpage.action?pageId=480000071）
    export PATH=$NODEJS_BIN_LATEST:$PATH
    npm install --registry ${NPM_REGITRY}
    echo '--install finish--'
}
function build() {
    echo '--build start--'
    ## tip: Do not support pass env params when build
    # 执行构建，具体构建方式根据自己项目自行编写
    procedure_check
    # 静态工具网页编译至node目录
    rm -rf ${PUBLICK_SOURCE_FLODER}
    npm run build
    echo '--build finish--'
    echo '--start pack tar--'
    rm -rf ${OUTPUT}
    mkdir -p ${OUTPUT}
    # get noahdes and bin from jarvis must not modify
    wget -O - --header "IREPO-TOKEN:7a6dedbd-1431-4c67-b2e5-6387c76636e0" "http://irepo.baidu-int.com/rest/prod/v3/baidu/ebiz/cpdinf-deps/releases/1.0.53.1/files?m=baidu/ebiz/cpdinf-deps" | tar -zxOf - './output/archer3-emcnode.tar.gz'  | tar zx -C $OUTPUT || exit 3 ;[ -d "$OUTPUT/bin" ] && [ -d "$OUTPUT/noahdes" ] || exit 1
    # 有部分node_module需要打到包中
    rm -rf node_modules
    # npm install --registry ${NPM_REGITRY} --production
    # move build file to output
    # 将编译后的产出和服务运行需要的代码复制到output下,  node_modules（最好有pm2,否则每次npx启动pm2会下载pm2需要的包）和 package.json 必须要有
    # cp -R -f ${SOURCE_FLODER}/*  ${OUTPUT}
    # cp -R -f node_modules ${OUTPUT}
    cp -R -f package.json ${OUTPUT}
    # if setenv then cp setenv to bin/
    # 自定义一些变量，目前node支持：
    # 1.健康检查path
    # 2.pm2 cluster模式instance数目
    # 3.如果在线上平台还要区分预上线，可自定义平台名称，然后在服务启动时会注入到node_env中
    # cp -R -f custom_bin/setenv.sh ${OUTPUT}/bin
    # pack the output as archer3 package
    tar -zcf ${OUTPUT}.tar.gz -C ${OUTPUT} .; procedure_check
    rm -rf ${OUTPUT}
    echo '--finish pack tar--'
}
# main
# 本项目暂不需要远程打包，最简编译即可
function main() {
    # Prepare node env and node_modules
    # prepare_build_env; procedure_check
    # echo node and npm version
    echo "node: $(node --version)"
    echo "npm: $(npm --version)"
    # Build
    build; procedure_check
}
main "$@"