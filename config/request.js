import store from "@/store"
// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = 'https://api.shcwwl.cn'; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth) {
			console.log('config-----', config, store);

			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = `Bearer ${store.state.user.token}`
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		console.log(response, '和您详细了解')
		// 自定义参数
		const custom = response.config?.custom
		if (data.code === 100000) {
			return data
		}
		// 刷新令牌
		if (data.code === 110401) {
			uni.$u.http.post('/api/security/user/refresh-token', {
				refresh_token: store.state.user.refresh_token
			}).then((res) => {
				if (res.code === 100000) {
					store.commit('SET_TOKEN', {
						token: res?.data?.access_token,
						refresh_token: res?.data?.refresh_token
					});
					return res.data
				}
			}).then(async res => {
				let config = response.config;
				config.header.Authorization = `Bearer ${res.access_token}`;
				let result = await uni.$u.http.request(config)
				return result;
			}).catch((err) => {
				console.log(err)
			})

			return data
		}
		if (data.code === 141000) {
			store.commit('LOGOUT')
			uni.$u.route({
				type: 'reLaunch',
				url: 'pages/login/login',
			})
			return;
		}
		if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data.data === undefined ? {} : data.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
