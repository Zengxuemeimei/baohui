const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  menu: state => state.user.menu,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  name: state => state.user.name,
  enterpriseId: state => state.user.enterpriseId,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
