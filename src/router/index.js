import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Layout_top from '@/pages/layout/layout_top'
import Layout from '@/pages/layout/layout_dex'
import {
  getIFramePath,
  getIFrameUrl
} from '@/utils/iframe'
/*组件的三种引入方式*/
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Layout_top,
      hide: true,
      meta: {
        title: '首页',
      },
      children: [{
        path: '',
        name: '首页',
        component: () => import('@/pages/layout/home'),
        meta: {
          title: '首页',
        }
      }, ]
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/pages/common/Login'], resolve),
      meta: {
        title: '系统入口',
      }
    },
  ]
})

router.beforeEach((to, from, next) => {

  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = window.localStorage.getItem('token')
  // let userName = "admins"
  if (to.path === '/Login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (!token) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({
        path: '/Login'
      })
    } else {
      // 加载动态菜单和路由(导致登录要点两次)
      addDynamicMenuAndRoutes(to, from, next)
      next()
    }
  }

})

/**
 * 加载动态菜单和路由
 */
let flag = 0 //解决登录点两次的问题还有刷新空白的问题
function addDynamicMenuAndRoutes(to, from, next) {
  handleIFrameUrl(to.path)
  if (flag == 0) {
    const menuList = [{
      id:1,
      path: "/item/test",
      component: 'layout',
      name: "首页",
      icon:"el-icon-menu",
      children: []
    }, {
      id:2,
      path: "/item/test2",
      component: 'layout', //任意的
      name: "普通路由",
      icon:"el-icon-menu",
      children: []
    },{
      path: "/item/test2",
      component: 'layout', //任意的
      id:3,
      name: "普通路由",
      icon:"el-icon-menu",
      children: [{
        path: "/item/test",
        component: 'layout',
        icon:"el-icon-menu",
        id:4,
        name: "首页",
        children: [
          {
            path: "http://www.baidu.com",//路由是这个http://localhost:8080/#/www.baidu.com
            component: 'baisu', //任意的
            name: "外联地址",
            id:5,
            icon:"el-icon-menu",
            children: []
          }
        ]
      },]
    }, {
      path: "http://www.baidu.com",//路由是这个http://localhost:8080/#/www.baidu.com
      component: 'baisu', //任意的
      name: "外联地址",
      id:6,
      children: [
        {
          path: "http://www.taobao.com",//路由是这个http://localhost:8080/#/www.baidu.com
          component: 'baisu', //任意的
          name: "外联地址",
          icon:"el-icon-menu",
          children: []
        }
      ]
    }];
    //左边的菜单从这里取值
 store.commit('setNavTree', menuList)
    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(menuList)
    console.log(dynamicRoutes)
    // 处理静态组件绑定路由
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)
    flag++
    next({ ...to,
      replace: true
    })

  } else {
    next()
  }

  if (store.state.app.menuRouteLoaded) {
    return
  } else {
    store.commit('menuRouteLoaded', true)
  }


}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {

  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    console.log(menuList[i].children)
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
      menuList[i].path = menuList[i].path.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].path,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }

      let path = getIFramePath(menuList[i].path)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/pages/common/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].path)
        let iFrameUrl = {
          'path': path,
          'url': url
        }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].path.split('/')
          let path = ''
          for (let i = 0; i < array.length; i++) {
            path += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
          }
          path = path.substring(0, path.length - 1)
          route['component'] = resolve => require([`@/pages/${path}`], resolve)
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {

  }
  return routes
}


export default router
