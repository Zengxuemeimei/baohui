import { constantRoutes } from '@/router'
import { getInfo } from '@/api/user'
import Layout from '@/layout/index'
import store from '@/store'
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRouter(store.getters.menu)
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    console.log('route',route)
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
        console.log('route.component',route.component)
      }
    }
    console.log('route.children',route.children)
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

const loadView = (view) => {
  console.log('view',view)
  return (resolve) => require([`@/views${view}`], resolve)
  
  // return () => import(`@${view}`)
}

export default permission
