import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/staff/employee',
    meta: { title: '管理系统', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'staff',
        name: 'Staff',
        meta: { title: '员工管理', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          {
            path: 'employee',
            name: 'Employee',
            component: () => import('@/views/manage/staff/employee'),
            meta: { title: '在职员工', icon: 'dashboard' }
          },
          {
            path: 'quit',
            name: 'Quit',
            component: () => import('@/views/manage/staff/quit'),
            meta: { title: '离职员工', icon: 'dashboard' }
          }
        ]
      },
      {
        path: 'customer',
        name: 'Customer',
        meta: { title: '客户管理', icon: 'dashboard' },
        component: () => import('@/views/manage/customer')
      },
      {
        path: 'visitor',
        name: 'Visitor',
        meta: { title: '访客管理', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      },
      {
        path: 'checkWorkAttendance',
        name: 'CheckWorkAttendance',
        meta: { title: '考勤管理', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      },
      {
        path: 'alarmCenter',
        name: 'AlarmCenter',
        meta: { title: '告警中心', icon: 'dashboard' },
        component: () => import('@/views/manage/alarmCenter')
      },
      {
        path: 'accessRecords',
        name: 'AccessRecords',
        meta: { title: '出入记录', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      },
      {
        path: 'hiddenDanger',
        name: 'HiddenDanger',
        meta: { title: '安全隐患', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      },
      {
        path: 'patrolManagement',
        name: 'PatrolManagement',
        meta: { title: '巡更管理', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: { title: '实时监控', icon: 'dashboard' },
        component: () => import('@/views/manage/index'),
        alwaysShow: true,
        children: [
          // {
          //   path: 'employee',
          //   name: 'Employee',
          //   component: () => import('@/views/manage/staff/employee'),
          //   meta: { title: '在职员工', icon: 'dashboard' }
          // },
          // {
          //   path: 'quit',
          //   name: 'Quit',
          //   component: () => import('@/views/manage/staff/quit'),
          //   meta: { title: '离职员工', icon: 'dashboard' }
          // }
        ]
      }
    ]
  },
  {
    path: '/systemSettings',
    component: Layout,
    redirect: '/systemSettings',
    meta: { title: '系统设置', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'accountNumber',
        name: 'AccountNumber',
        component: () => import('@/views/systemSettings/accountNumber'),
        meta: { title: '账号管理', icon: 'dashboard' }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/systemSettings/department'),
        meta: { title: '部门管理', icon: 'dashboard' }
      },
      {
        path: 'equipment',
        name: 'Equipment',
        component: () => import('@/views/systemSettings/equipment'),
        meta: { title: '设备管理', icon: 'dashboard' }
      },
      {
        path: 'visitorCode',
        name: 'VisitorCode',
        component: () => import('@/views/systemSettings/visitorCode'),
        meta: { title: '访客二维码', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/manage/staff/employee'
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
