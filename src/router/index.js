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
    // component:  (resolve) => require([`@/views/login/index`], resolve),

    hidden: true
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   // component:  (resolve) => require([`@/views/404`], resolve),
  //   hidden: true
  // },
  // {
  //   path: '/manage',
  //   component: Layout,
  //   redirect: '/manage/staff/employee',
  //   meta: { title: '管理系统'},
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'staff',
  //       name: 'Staff',
  //       meta: { title: '员工管理'},
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'employee',
  //           name: 'Employee',
  //           component: () => import('@/views/manage/staff/employee'),
  //           meta: { title: '在职员工'}
  //         },
  //         {
  //           path: 'quit',
  //           name: 'Quit',
  //           component: () => import('@/views/manage/staff/quit'),
  //           meta: { title: '离职员工'}
  //         }
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/manage/staff/employee'
  // }
  //     {
  //       path: 'customer',
  //       name: 'Customer',
  //       meta: { title: '客户管理', icon: 'dashboard' },
  //       component: () => import('@/views/manage/customer')
  //     },
  //     {
  //       path: 'visitor',
  //       name: 'Visitor',
  //       meta: { title: '访客管理', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'visitorRecord',
  //           name: 'VisitorRecord',
  //           component: () => import('@/views/manage/visitor/visitorRecord'),
  //           meta: { title: '访客记录', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'visitorAudit',
  //           name: 'VisitorAudit',
  //           component: () => import('@/views/manage/visitor/visitorAudit'),
  //           meta: { title: '访客审核', icon: 'dashboard' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'checkWorkAttendance',
  //       name: 'CheckWorkAttendance',
  //       meta: { title: '考勤管理', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'calendarSettings',
  //           name: 'CalendarSettings',
  //           component: () => import('@/views/manage/checkWorkAttendance/calendarSettings'),
  //           meta: { title: '工作日历设置', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'shiftSetting',
  //           name: 'ShiftSetting',
  //           component: () => import('@/views/manage/checkWorkAttendance/shiftSetting'),
  //           meta: { title: '班次设置', icon: 'dashboard' }
  //         },
          
  //         {
  //           path: 'eventRegistration',
  //           name: 'EventRegistration',
  //           component: () => import('@/views/manage/checkWorkAttendance/eventRegistration'),
  //           meta: { title: '请假、加班登记', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'attendanceRecord',
  //           name: 'AttendanceRecord',
  //           component: () => import('@/views/manage/checkWorkAttendance/attendanceRecord'),
  //           meta: { title: '考勤记录', icon: 'dashboard' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'alarmCenter',
  //       name: 'AlarmCenter',
  //       meta: { title: '告警中心', icon: 'dashboard' },
  //       component: () => import('@/views/manage/alarmCenter')
  //     },
  //     {
  //       path: 'accessRecords',
  //       name: 'AccessRecords',
  //       meta: { title: '出入记录', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'personRecords',
  //           name: 'PersonRecords',
  //           component: () => import('@/views/manage/accessRecords/personRecords'),
  //           meta: { title: '人员出入记录', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'carRecords',
  //           name: 'CarRecords',
  //           component: () => import('@/views/manage/accessRecords/carRecords'),
  //           meta: { title: '车辆出入记录', icon: 'dashboard' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'hiddenDanger',
  //       name: 'HiddenDanger',
  //       meta: { title: '安全隐患', icon: 'dashboard' },
  //       component: () => import('@/views/manage/hiddenDanger'),
  //     },
  //     {
  //       path: 'patrolManagement',
  //       name: 'PatrolManagement',
  //       meta: { title: '巡更管理', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'pointPosition',
  //           name: 'PointPosition',
  //           component: () => import('@/views/manage/patrolManagement/pointPosition'),
  //           meta: { title: '点位管理', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'patrolScheme',
  //           name: 'PatrolScheme',
  //           component: () => import('@/views/manage/patrolManagement/patrolScheme'),
  //           meta: { title: '巡更方案', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'patrolRecards',
  //           name: 'PatrolRecards',
  //           component: () => import('@/views/manage/patrolManagement/patrolRecards'),
  //           meta: { title: '巡更记录', icon: 'dashboard' }
  //         },
  //       ]
  //     },
  //     {
  //       path: 'monitor',
  //       name: 'monitor',
  //       meta: { title: '实时监控', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'list',
  //           name: 'MonitorList',
  //           component: () => import('@/views/manage/monitor/list'),
  //           meta: { title: '监控地址列表', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'play',
  //           name: 'MonitorPlay',
  //           component: () => import('@/views/manage/monitor/play'),
  //           meta: { title: '视频播放页面', icon: 'dashboard' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'manAndVehicleControl',
  //       name: 'ManAndVehicleControl',
  //       meta: { title: '人车布控', icon: 'dashboard' },
  //       component: () => import('@/views/manage/index'),
  //       alwaysShow: true,
  //       children: [
  //         {
  //           path: 'temporaryManAndVehicles',
  //           name: 'TemporaryMan',
  //           component: () => import('@/views/manage/manAndVehicleControl/temporaryManAndVehicles'),
  //           meta: { title: '临时人员-车辆', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'temporaryManAndVehiclesRecard',
  //           name: 'TemporaryManRecard',
  //           component: () => import('@/views/manage/manAndVehicleControl/temporaryManAndVehiclesRecard'),
  //           meta: { title: '临时人车出入记录', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'controlManAndVehicle',
  //           name: 'ControlMan',
  //           component: () => import('@/views/manage/manAndVehicleControl/controlManAndVehicle'),
  //           meta: { title: '布控人员-车辆', icon: 'dashboard' }
  //         },
  //         {
  //           path: 'controlManAndVehicleRecard',
  //           name: 'ControlManRecard',
  //           component: () => import('@/views/manage/manAndVehicleControl/controlManAndVehicleRecard'),
  //           meta: { title: '布控人车出入记录', icon: 'dashboard' }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/manage/staff/employee'
  //   // redirect: '/systemSettings/accountNumber'
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/manage/staff/employee'
  //   // redirect: '/systemSettings/accountNumber'
  // },
  // {
  //   path: '/systemSettings',
  //   component: Layout,
  //   redirect: '/systemSettings',
  //   meta: { title: '系统设置', icon: 'dashboard' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'accountNumber',
  //       name: 'AccountNumber',
  //       component: () => import('@/views/systemSettings/accountNumber'),
  //       meta: { title: '账号管理', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'department',
  //       name: 'Department',
  //       component: () => import('@/views/systemSettings/department'),
  //       meta: { title: '部门管理', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'equipment',
  //       name: 'Equipment',
  //       component: () => import('@/views/systemSettings/equipment'),
  //       meta: { title: '设备管理', icon: 'dashboard' }
  //     },
  //     {
  //       path: 'visitorCode',
  //       name: 'VisitorCode',
  //       component: () => import('@/views/systemSettings/visitorCode'),
  //       meta: { title: '访客二维码', icon: 'dashboard' }
  //     },
    //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/views/systemSettings/role'),
  //       meta: { title: '角色管理', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
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
