import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import VueAMap from 'vue-amap';
import '@/icons' // icon
import '@/permission' // permission control


import LicenseKeyboard from 'vue-license-keyboard';
import 'vue-license-keyboard/lib/vue-license-keyboard.css';
Vue.use(LicenseKeyboard); //键盘车牌
import Mint from 'mint-ui'; //shouji
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import $ from 'jquery'

//qs模块引入(在post提交数据 的时候使用)
import qs from 'qs'
Vue.prototype.$qs = qs;

//引入vue-seamless-scroll滚动插件
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

//引入data-v插件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
Vue.use(ElementUI)

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'ce17cfd72f928e5802722d4e2995fe3a',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4'
});

Vue.filter('dateFormat',function(originVal){

  const dt = new Date(originVal)
	//年的时间	
  const y = dt.getFullYear()
  	//月的时间  .padStart 不足两位自动补0  2位长度
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
   //日的时间
  const d = (dt.getDate() + '').padStart(2,'0')

  //小时
  const hh = (dt.getHours()+'').padStart(2,'0')
  //分钟
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  //秒数
  const ss = (dt.getSeconds()+'').padStart(2,'0')

	//将它们拼接成完整的字符串
	//return 'yyyy-mm-dd hh:mm:ss'  可以改成下面的方法
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
