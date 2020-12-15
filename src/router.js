import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./views/login"//默认会导入./views/login目录下的index.vue组件 
//布局路由组件
import Layout from "@/components/Layout.vue"

import Home from "./views/home"
import Member from "./views/member"
import Supplier from "./views/supplier"
import Goods from "./views/goods"
import Staff from "./views/staff"

Vue.use(VueRouter);


export default new VueRouter({
  routes: [
    {//登录路由
      path: '/login',
      name: 'login',
      component: Login//组件对象
    },
    {//布局路由
      path: '/',
      name: 'layout',
      component: Layout,//组件对象
      redirect: '/home',//重定向到/home了 无论访问/还是单击首页，都会访问到#/home
      children: [
        {//将主页组件作为布局组件路由的子路由
          path: '/home',
          component: Home,
          meta: { title: '首页' }
        },
        // {
        //   path:'/member',
        //   component: Member
        // }
      ]
    },
    {
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/',//会在/前自动拼接/member 相当于/member/
          component: Member,
          meta: { title: '会员管理' }
        }
      ]
    },
    {
      path: '/supplier',
      component: Layout,
      children: [
        {
          path: '/',//会在/前自动拼接/member 相当于/member/
          component: Supplier,
          meta: { title: '供应商管理' }
        }
      ]
    },
    {
      path: '/goods',
      component: Layout,
      children: [
        {
          path: '/',//会在/前自动拼接/member 相当于/member/
          component: Goods,
          meta: { title: '商品管理' }
        }
      ]
    },
    {
      path: '/staff',
      component: Layout,
      children: [
        {
          path: '/',//会在/前自动拼接/member 相当于/member/
          component: Staff,
          meta: { title: '员工管理' }
        }
      ]
    }
  ]
});
