import request from '@/utils/request'

export function getEnterpriseInfoList(params) { 
    return request({
      url: '/enterpriseInfo/list',
      method: 'get',
      params
    })
}

export function saveOrUpdate(data) { 
    return request({
      url: '/enterpriseInfo/saveOrUpdate',
      method: 'post',
      data
    })
}