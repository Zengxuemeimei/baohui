import request from '@/utils/request'

export function getList() {
    return request({
      url: '/menuInfo/list',
      method: 'get',
    })
}

export function saveOrUpdateMenu(data) {
  return request({
    url: '/menuInfo/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteMenu(params) {
  return request({
    url: '/menuInfo/deleteById',
    method: 'get',
    params
  })
}