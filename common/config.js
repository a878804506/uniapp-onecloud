// 环境配置
let base_url = ""

const projectUrl = '/onecloud'

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    base_url = 'http://172.16.0.177:9528' + projectUrl
}else{
    // 生产环境
    base_url = 'http://onecloud.erdongchen.top' + projectUrl
}

export default base_url