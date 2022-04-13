const http = uni.$u.http

// post请求，登录
export const register = (params, config = {}) => {
	return http.post('/api/security/user/register', params, config)
}

// 短信验证码
export const sendSMS = (params, config = {}) => http.post('/api/public/sms/send', params, config)

// get请求
export const addDrainage = (data) => http.get('/api/public/channel/drainage', {
	params: data
})
