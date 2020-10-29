import request from '@/utils/request'
import store from '@/store'

export function getMonitorList(params) { 
    // params.pageSize = 10
    return request({
      url: '/videoInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) { 
    return request({
      url: '/videoInfo/saveOrUpdate',
      method: 'post',
      data
    })
}