import request from '@/utils/request'

// request.get('/db.json')
//     .then(response => {
//         console.log(response.data)
//     })

//方法2
// request({
//     method: 'get',
//     url: '/db.json',
// }).then(response => {
//     console.log('get2', response.data)
// })

//方法3
//const BASE_URL = process.env.VUE_APP_BASE_API
export default {
    getList() {
        const req = request({
            method: 'get',
            url: '/db.json'//在封装的request.js中会自动加上前缀 这里就不用了
        })
        return req
    }
}