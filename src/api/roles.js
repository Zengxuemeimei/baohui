import request from '@/utils/request'
import store from '@/store'

export function getRoleList(params) {
  if(store.getters.roles.indexOf('superAdmin') === -1){
    params.enterpriseId = store.getters.enterpriseId
  }
  // console.log('咦',params)
    return request({
      url: '/roleInfo/list',
      method: 'get',
      params
    })
}

export function setMenu(data) {
    return request({
      url: '/roleInfo/setMenu',
      method: 'post',
      data
    })
}

export function saveOrUpdate(data) {
  if(store.getters.roles.indexOf('superAdmin') === -1){

    data.enterpriseId=store.getters.enterpriseId
  }
    return request({
      url: '/roleInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function getMenuListByRoleId(params) {
  return request({
    url: '/roleInfo/getMenuListByRoleId',
    method: 'get',
    params
  })
}
export function deleteRole(params) {
  return request({
    url: '/roleInfo/deleteById',
    method: 'get',
    params
  })
}
