import urlConfig from './config.js'

const request = {}
const headers = {
	'Content-Type': 'application/x-www-form-urlencoded'
}

request.masterRequest = (url, method, data) => {
	const token = uni.getStorageSync('token')
	headers.Authorization = token
	return uni.request({
		url: urlConfig + url,
		method,
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		if(res[1].data.code == 50014){
			// 身份验证信息过期
			uni.showToast({
				title: res[1].data.msg,
				icon: 'none'
			})
			uni.clearStorageSync()
			setTimeout(function() {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}, 1500)
		}
		return res[1].data
	}).catch(parmas => {
		console.log('系统错误：' + parmas)
		/* switch (parmas.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:

				return Promise.reject()
				break
		} */
	})
}

export default request
