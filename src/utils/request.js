import axios from 'axios'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    //baseURL: '/dev-api',
    //baseURL: '/'
    timeout: 5000//5000毫秒后 连接超时
})

//定义拦截器
request.interceptors.request.use(config =>{
    //请求拦截
    return config
},error=>{
    //出现异常 抛出异常
    return Promise.reject(error)
})

request.interceptors.response.use(response =>{
    return response
},error=>{
    return Promise.reject(error)
})

//测试
// request.get('/db.json')
//     .then(response => {
//         console.log(response.data)
//     })
export default request