import request from '@/common/request.js'

const loginapi = {}

// POST请求方式
loginapi.login = params => request.masterRequest(`/account/login`, 'POST', params)
// GET请求方式
loginapi.getInfo = params => request.masterRequest(`/account/info`, 'GET',{})
export default loginapi