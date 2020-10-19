import request from '@/utils/request'

export function uploadFile(params) {
    return request({
      url: '/file/upload',
      method: 'get',
      headers: {"content-type": "multipart/form-data"},
      params
    })
  }