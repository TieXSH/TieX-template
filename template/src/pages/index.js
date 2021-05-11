/**
 * @file 项目入口文件
 */
import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import {router} from '../routes/index';
import Myserver from '../api/index';
{{#eleui}}
import '../utils/compRegister';
{{/eleui}}
{{#vuex}}
import store from '../utils/store'
{{/vuex}}

Vue.prototype.$http = Myserver;

Vue.use(Router);
Vue.config.silent = true;
new Vue({
    el: '#app',
    render: h => h(App),
    {{#vuex}}
    store,
    {{/vuex}}
    router: router,
    mounted() {
        // document.dispatchEvent(new Event('custom-render-trigger'));
    }
});
