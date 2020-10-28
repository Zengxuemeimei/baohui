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
export function getPlanDetailList(params) { 
  return request({
    url: '/keepWatchPlanInfo/getById',
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

export function getKeepWatchTaskDetail(params) { 
  return request({
    url: '/keepWatchTaskInfo/getByTaskId',
    method: 'get',
    params
  })
}

export function getKeepWatchRecordList(params) { 
    params.pageSize = 10
    return request({
      url: '/keepWatchTaskInfo/list',
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
