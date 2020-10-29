import request from '@/utils/request'
import store from '@/store'

export function getAccessPersonList(params) {  
  params.enterpriseId = store.getters.enterpriseId
  // params.pageSize = 10
      return request({
        url: '/faceAccessRecord/list',
        method: 'get',
        params
      })
}
export function getAccessCarList(params) { 
  params.enterpriseId = store.getters.enterpriseId
  // params.pageSize = 10
      return request({
        url: '/carAccessRecord/list',
        method: 'get',
        params
      })
}