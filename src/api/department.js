import request from '@/utils/request'
import store from '@/store'

export function getDepartmentList() {  
    return request({
      url: '/departmentInfo/list?enterpriseId=' + store.getters.enterpriseId,
      method: 'get',
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