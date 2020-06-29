import loginapi from '@/api/login/login.js'

import waterapi from '@/api/water/water.js'

import musicapi from '@/api/music/musicApi.js'

const api = {}

//登录
// POST请求方式
api.login = params => loginapi.login(params)
//获取用户登录后的信息
// GET请求方式
api.getInfo = params => loginapi.getInfo(params)

//水务系统api
//获取客户列表
api.waterCustomerList = params => waterapi.customerList(params)
//获取客户起止码列表
api.waterCustomerMeter = params => waterapi.customerMeter(params)
//修改客户的起止码
api.updateCustomerMeter = params => waterapi.updateCustomerMeter(params)

//音乐api
api.musicList = params => musicapi.musicList(params)
api.getPlatformsList = params => musicapi.getPlatformsList(params)
api.getAppMusicUrl = params => musicapi.getAppMusicUrl(params)
api.getUnlockCode = params => musicapi.getUnlockCode(params)

export default api