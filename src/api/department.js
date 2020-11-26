import request from '@/utils/request'
import store from '@/store'

export function getDepartmentList(params) { 
  params.enterpriseId =  store.getters.enterpriseId
    return request({
      url: '/departmentInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) {
    data.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/departmentInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function deleteDepartment(params) {
    return request({
      url: '/departmentInfo/deleteById',
      method: 'get',
      params
    })
}