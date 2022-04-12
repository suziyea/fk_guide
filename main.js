import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
// vuex 状态管理
import store from '@/store/index.js'

if (process.env.NODE_ENV === 'development') {
	console.log("开发环境")
	} else {
	console.log('生产环境')
}
// uview-ui版本
// console.log(uni.$u.config.v);
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
// 引入请求封装，将app参数传递到配置中
require('./config/request.js')(app)
app.$mount()
