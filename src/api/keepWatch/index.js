import request from '@/utils/request'
import store from '@/store'

export function getKeepWatchPlanList(params) { 
    params.pageSize = 10
    return request({
      url: '/keepWatchPlanInfo/list',
      method: 'get',
      params
    })
}

export function getKeepWatchPlaceList(params) { 
    params.pageSize = 10
    return request({
      url: '/keepWatchPlaceInfo/list',
      method: 'get',
      params
    })
}

export function getKeepWatchRecordList(params) { 
    params.pageSize = 10
    return request({
      url: '/keepWatchRecordInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) { 
    return request({
      url: '/keepWatchPlaceInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function saveOrUpdatePlan(data) { 
    return request({
      url: '/keepWatchPlanInfo/saveOrUpdate',
      method: 'post',
      data
    })
}
