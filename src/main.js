/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-06-24 11:40:14
 * @LastEditors: 王敏
 * @LastEditTime: 2021-06-28 17:18:48
 */
import Vue from 'vue'
import App from './App.vue'
import './assets/css/init.less'
import 'ant-design-vue/dist/antd.css';

import { Button } from 'ant-design-vue';
Vue.use(Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
