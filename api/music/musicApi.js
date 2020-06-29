import request from '@/common/request.js'

const musicapi = {}

// GET请求方式
musicapi.musicList = params => request.masterRequest(`/music/app/list`, 'GET', params)

musicapi.getPlatformsList = params => request.masterRequest(`/musicSync/getPlatformsList`, 'GET', params)

musicapi.getAppMusicUrl = params => request.masterRequest(`/music/app/getAppMusicUrl`, 'GET', params)

musicapi.getUnlockCode = params => request.masterRequest(`/musicSync/getUnlockCode`, 'GET', params)

export default musicapi