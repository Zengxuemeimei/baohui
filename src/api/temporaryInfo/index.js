import request from '@/utils/request'
import store from '@/store'

export function getTemporaryInfoList(params) { 
    params.pageSize = 10
    return request({
      url: '/temporaryInfo/list',
      method: 'get',
      params
    })
}