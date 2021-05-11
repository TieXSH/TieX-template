/**
 * @file 用于渲染层请求
 */

import axios from 'axios';
// 我的
// const baseURL = 'http://localhost:7777';
// 飞哥的
const baseURL = 'http://cp01-chengxin-liutengfei.epc.baidu.com:8079';
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 1200000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

export const myMockAjax = {
    get(params) {
        console.log(params);
        return new Promise((resolve, reject) => {
            service.get(params).then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res.data);
            });
        });
    }
};

