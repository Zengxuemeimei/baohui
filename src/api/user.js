import request from '@/utils/request'

import Base64  from 'base-64';
export function login(data) {
  data.password = Base64.encode(data.password + 'V2FuZzkyNjQ1NGRTQkFQSUpXVA');
  console.log('密码',data)
  return request({
    url: '/userInfo/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/userInfo/getUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/userInfo/logout',
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: '/userInfo/list',
    method: 'get',
    params
  })
}
