import request from '@/utils/request'

export function getRoleList(params) {
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
    data.enterpriseId=0
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
