/**
 * @file vuex状态管理工具
 * reference doc: https://vuex.vuejs.org/zh/guide/
 */

 import Vue from 'vue';
 import Vuex from 'vuex';
 Vue.use(Vuex);

const state = {
    showFooter: true, // 要设置的全局访问的state对象
    changableNum: 0 // 要设置的初始属性值
};
 const store = new Vuex.Store({
    state,
    mutations: {
        increment (state) {
          state.changableNum++
        }
    },
    actions: {
        increment ({ commit }) {
          commit('increment')
        }
    }
 });

 export default store;