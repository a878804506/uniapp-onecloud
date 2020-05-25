import request from '@/common/request.js'

const waterapi = {}

// GET请求方式
waterapi.customerList = params => request.masterRequest(`/water/customer/list`, 'GET', params)

waterapi.customerMeter = params => request.masterRequest(`/water/watermeter/list`, 'GET', params)

waterapi.updateCustomerMeter = params => request.masterRequest(`/water/watermeter`, 'POST', params)

export default waterapi