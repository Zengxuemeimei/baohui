import request from '@/utils/request'

//更新摄像头数据
export function saveOrUpdate(data) {
    return request({
      url: '/videoInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

//获取摄像头数据
export function getVideoInfoList(params) {
    return request({
      url: '/videoInfo/list',
      method: 'get',
      params
    })
}

//获取出入记录
export function getAccessCount(params) {
    return request({
      url: '/index/accessCount',
      method: 'get',
      params
    })
}
//获取巡跟系统
export function getKeepWatchPlaceCount() {
    return request({
      url: '/index/getKeepWatchPlaceCount',
      method: 'get',
    })
}
//获取安全隐患
export function getHiddenDangerCount() {
    return request({
      url: '/index/getHiddenDangerCount',
      method: 'get',
    })
}
//获取车流统计
export function getTrafficCount() {
    return request({
      url: '/index/trafficCount',
      method: 'get',
    })
}
  