import request from '@/utils/request'

export function getList(params) {
    params.pageSize = 12
    return request({
      url: '/menuInfo/list',
      method: 'get',
      params
    })
  }