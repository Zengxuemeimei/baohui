import request from '@/utils/request'
import store from '@/store'

export function getEviceInfotList(params) { 
    return request({
      url: '/deviceInfo/list',
      method: 'get',
      params
    })
}

export function deleteDeviceInfo(params) { 
    return request({
      url: '/deviceInfo/deleteById',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) { 
    return request({
      url: '/deviceInfo/saveOrUpdate',
      method: 'post',
      data
    })
}