import request from '@/utils/request'
import store from '@/store'

export function getCustomerList(params) { 
    // params. = 10
    return request({
      url: '/customerInfo/list',
      method: 'get',
      params
    })
}

export function getCustomerDetail(params) { 
  return request({
    url: '/customerInfo/getById',
    method: 'get',
    params
  })
}

export function saveOrUpdate(data) { 
    // data.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/customerInfo/saveOrUpdate',
      method: 'post',
      data
    })
}