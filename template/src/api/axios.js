/**
 * @file 用于渲染层请求
 */

import axios from 'axios';
// 我的
// const baseURL = 'http://localhost:7777';

let baseURL = 'http://bjyz-qingyong.epc.baidu.com:8141';
// const devMode = process.env.NODE_ENV === 'development';
// if (devMode) {
//     baseURL = '';
// }
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 1200000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
});
// 方便线下机器测试的配置
if (/baidu\.com:\d+/.test(location.host)) {
    service.defaults.withCredentials = true;
}

const globalToken = {
    token: '',
    getToken() {
        return `Bearer ${this.token}`;
    },
    setToken(token) {
        if (token) {
            this.token = token.accessToken;
        }
    }
};
// 请求拦截
service.interceptors.request.use(
    res => {
        if (res['Content-Type'] || res['Content-Type'] === false) {
            res.headers['Content-Type'] = res['Content-Type'];
            delete res['Content-Type'];
        }
        if (res.method === 'post') {
            res.headers.common['Authorization'] = globalToken.getToken();
        }
        // 开发环境，不进行stoken校验
        // if (RUNNING_ENVIRONMENT !== 'dev') {
        //     const {stoken, key} = stokenConfig;
        //     if (res.method === 'get' && stoken) {
        //         res.headers[key] = stoken;
        //     }
        // }
        if (res.method === 'post' && res.tokenMust) {
            // post 请求会验证token，token来自userInfo接口，可能此时未返回
            // token为空，定时1s持续拿token
            let token = globalToken.getToken();

            if (!token || token === 'Bearer ') {
                let limit = 0;

                return new Promise(resolve => {
                    const timer = setInterval(() => {
                        token = globalToken.getToken();

                        if ((token && token !== 'Bearer ') || limit >= 1000) {
                            clearInterval(timer);
                            res.headers.common['Authorization'] = token;

                            return resolve(res);
                        }

                        limit += 50;
                    }, 50);
                });
            }
        }
        return res;
    }
);


// 错误拦截
service.interceptors.response.use(
    res => {
        const data = res.data;
        const errno = Number(data.errno);
        if (errno === 0) {
            // 减少层级
            // 设置token
            // data.data && globalToken.setToken(data.data.userToken);
            return data;
        }
        else if (errno === 302) {
            const {jumpBlankPageFlag = 0, srcUrl = '', targetUrl = ''} = data.data;
            if (jumpBlankPageFlag === 1) {
                location.href = `${decodeURIComponent(srcUrl)}&u=${targetUrl}`;
                return Promise.reject(data);
            }
        }
        // 根据错误码进行重定向
        // interceptorRule({
        //     errno,
        //     data,
        //     res
        // });
        return Promise.reject(data);
    },
    res => {
        if (res.response) {
            let {status, data} = res.response;
            if (status === 302 && data.errno === 302) {
                const {jumpBlankPageFlag = 0, srcUrl = '', targetUrl = ''} = data.data;
                if (jumpBlankPageFlag === 1) {
                    location.href = `${decodeURIComponent(srcUrl)}&u=${targetUrl}`;
                    return Promise.reject(res);
                }
            }
        }

        if (!res.config || (res.config && !res.config.noPrompte)) {
            // 后端要求接口出错 暂时不进行明显的用户提示
            // showToast('请求失败，请稍后重试', 'error');
            console.log('请求失败，请稍后重试');
        }
        console.log('执行到这里', res);
        return Promise.reject(res);
    }
);
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default service;

