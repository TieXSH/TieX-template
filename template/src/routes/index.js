/**
 * @file 路由文件
 */
import Router from 'vue-router';
import Home from '$pages/home/index.vue';

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
    name: 'test',
    icon: 'fas fa-th',
    path: '/minapp/index.html',
    checked: false,
    title: '测试',
    desc: '测试页面'
}];
