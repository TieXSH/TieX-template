/**
 * @file Myserver类
 */
import service from './axios';
import qs from 'qs';

class Myserver {
    constructor() {
        this.server = service;
        this.nowHandle = null;
    }
    v(ob) {
        this.nowHandle = ob;
        return this;
    }
    // 接口api化
    parseRouter(moduleName, urlObj) {
        // 每一个模块对应一个缓存对象
        const ob = this[moduleName] = {};
        // 循环注册
        (Object.keys(urlObj)).forEach(key => {
            ob[key] = this.sendMsg.bind(this, moduleName, key, urlObj[key]);
        });
    }
    // 统一调接口
    sendMsg(moduleName, name, url, customConfig) {
        // 当需要将获取的数据缓存在store中，就可以按moduleName维度存储
        return new Promise((resolve, reject) => {
            let config = customConfig || {};
            let type = config.type || 'get';
            let data = config.data || {};
            let self = this;
            let bindName = config.bindName || name;
            // 数据响应后统一的格式化处理 （分模块）
            function before(res) {
                defaultFn(res);
                return res;
            }
            // 默认自动绑定到组件的data上
            function defaultFn(res) {
                if (config.bindName) {
                    self.nowHandle[bindName] = res && res.data;
                }
            }
            // 默认错误处理
            function defaultError(err) {
                this.$message(err.errMsg, 'error');
            }
            let errorCallBack = reject || defaultError;
            let state = {
                get() {
                    let urlqs = url + '?' + qs.stringify(data);
                    // return self.server.get(urlqs).then(before).then(callback).catch(errorCallBack);
                    return self.server.get(urlqs).then(before).then(resolve).catch(errorCallBack);
                },
                post() {
                    return self.server.post(url, data, Object.assign({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }, config['axiosConfig'])).then(before).then(resolve).catch(errorCallBack);
                }
            };
            state[type]();
        });
    }
}
export default new Myserver();