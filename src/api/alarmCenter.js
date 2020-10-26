import request from '@/utils/request'
import store from '@/store'

export function getAlarmInfoList(params) { 
    params.pageSize = 10
    params.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/alarmInfo/list',
      method: 'get',
      params
    })
}
export function saveOrUpdate(data) { 
    data.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/alarmInfo/update',
      method: 'post',
      data
    })
}