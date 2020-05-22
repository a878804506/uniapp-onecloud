import request from '@/common/request.js'

const waterapi = {}

// GET请求方式
waterapi.customerList = params => request.masterRequest(`water/customer/list`, 'GET', params)

export default waterapi