
import router from './router.js'
import { getUserInfo } from './api/login'

router.beforeEach((to, from, next) => {
    //1.获取token
    const token = localStorage.getItem('gsq-mms-token');
    //1.1如果没有获取到
    if (!token) {
        //如果要访问非登陆页面，则不让访问，加到登录页面 /login
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {//如果要访问登录页面，那就访问好了
            next()
        }
    } else {//1.2如果获取到token
        //如果请求路由/login,那就可以去就完事了
        if (to.path === '/login') {
            next()
        } else {//如果请求非登录页面，就通过token去获取用户信息先，
            //首先看看本地有没有用户信息，本地没有再通过token去获取
            const userInfo = localStorage.getItem('gsq-mms-user');
            if (userInfo) {
                //如果本地获取到了，则直接让它去目标路由
                next()
            } else {//通过token获取用户信息
                getUserInfo(token).then(response => {
                    const resp = response.data;
                    if (resp.flag) {
                        //别忘了先把用户信息保存到本地
                        localStorage.setItem('gsq-mms-user', JSON.stringify(resp.data))
                        //如果获取到用户信息了，则进行非登录页面地跳转
                        next()
                    } else {//未获取到用户信息，重新登陆
                        next({ path: '/login' })
                    }
                })
            }
        }
    }
})