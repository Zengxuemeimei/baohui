import request from '@/utils/request'
import store from '@/store'

export function saveOrUpdate(data) { 
    data.enterpriseId = store.getters.enterpriseId
    return request({
      url: '/dictionaryInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function getDictionaryList(params) { 
    params.pageSize = 10
    return request({
      url: '/dictionaryInfo/list',
      method: 'get',
      params
    })
}

export function updateStatus(params) { 
    return request({
      url: '/dictionaryInfo/updateStatus',
      method: 'get',
      params
    })
}

// export function updateStatus(params) { 
//   return request({
//     url: '/dictionaryInfo/updateStatus',
//     method: 'get',
//     params
//   })
// }
