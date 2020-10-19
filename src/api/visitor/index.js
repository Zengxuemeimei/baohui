import request from '@/utils/request'
import store from '@/store'

export function getVisitorList(params) { 
    params.pageSize = 10
    return request({
      url: '/visitorInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) { 
    data.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/visitorInfo/saveOrUpdate',
      method: 'post',
      data
    })
}
export function auditVisitor(data) { 
  return request({
    url: '/visitorInfo/audit',
    method: 'post',
    data
  })
}

export function deleteVisitor(params) { 
  return request({
    url: '/visitorInfo/deleteById',
    method: 'get',
    params
  })
}