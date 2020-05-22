import loginapi from '@/api/login/login.js'

import waterapi from '@/api/water/water.js'

const api = {}

//登录
// POST请求方式
api.login = params => loginapi.login(params)
//获取用户登录后的信息
// GET请求方式
api.getInfo = params => loginapi.getInfo(params)

//水务系统api
api.waterCustomerList = params => waterapi.customerList(params)

export default api