import request from '@/utils/request'
import store from '@/store'

export function getStaffList(params) {  
  params.pageSize = 10
    return request({
      url: '/staffInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) {
    return request({
      url: '/staffInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function deleteDepartment(params) {
    return request({
      url: '/staffInfo/deleteById',
      method: 'get',
      params
    })
  }