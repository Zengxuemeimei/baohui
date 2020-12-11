import request from '@/utils/request'
import store from '@/store'

export function getSecurityAlarmRecordList(params) { 
    // params.pageSize = 10
    return request({
      url: '/securityAlarmRecordData/list',
      method: 'get',
      params
    })
}