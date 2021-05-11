/**
 * @file 路由文件
 */
import Router from 'vue-router';
import Home from '$pages/home/index.vue';

// 之前都是import 组件，然后生成
// const fileObj = require.context('../home', true, /index\.vue$/);
// console.log(fileObj.keys());
// const arr = [];
// (fileObj.keys()).forEach(key => {
//     const keyArr = key.split('/');
//     const pathArr = keyArr[1].split('.');
//     arr.push({
//         path: `/${pathArr[0]}/${pathArr[1]}`,
//         component: fileObj(key).default
//     });
// });
// console.log(arr);
// export default arr;

export const router = new Router({
    mode: 'history',
    routes: [{
        path: '/index.html',
        component: Home,
        children: []
    },
    {
        path: '/minapp/index.html',
        component: Home,
        children: []
    }]
});

// 菜单配置
export const menuConfig = [{
    name: '扫描计算器',
    icon: 'fas fa-th',
    path: '/minapp/index.html',
    checked: false,
    title: '小程序包扫描',
    desc: '展示小程序包关于用到的组件和swan.api的扫描结果'
}];
