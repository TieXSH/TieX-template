/**
 * @file 请求入口文件
 */

import Vue from 'vue';
import Myserver from './myserver';
// 扫描模块
export const scan = {
    getApiList: '/app/package/funcUseList' // 获取扫描小程序的的apilist
};
// App模块
export const App = {
    getApiList: '/app/package/funcUseList' // 获取扫描小程序的的apilist
};
// Api模块
export const Api = {
    getApiList: '/app/package/funcUseList' // 获取扫描小程序的的apilist
};
// 注册模块
Myserver.parseRouter('scan', scan);
Myserver.parseRouter('App', App);

// 在原型上定义为只读
Object.defineProperty(Vue.prototype, '$server', /** @lends Vue.prototype */{
    get() {
        return Myserver;
    }
});

export default Myserver;