import request from '@/utils/request'
import store from '@/store'

export function getHiddenDangerList(params) { 
    params.pageSize = 10
    return request({
      url: '/hiddenDangerInfo/list',
      method: 'get',
      params
    })
}
export function saveOrUpdate(data) { 
    return request({
      url: '/hiddenDangerInfo/saveOrUpdate',
      method: 'post',
      data
    })
}