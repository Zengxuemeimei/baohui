import request from '@/utils/request'
import store from '@/store'
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
  // params.pageSize=10
  params.enterpriseId = store.getters.enterpriseId
  return request({
    url: '/userInfo/list',
    method: 'get',
    params
  })
}
export function saveOrUpdate(data) {
  data.enterpriseId = store.getters.enterpriseId
  if(!data.id){
    data.password = Base64.encode(data.password + 'V2FuZzkyNjQ1NGRTQkFQSUpXVA');
  }
  return request({
    url: '/userInfo/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteAccountNum(params) {
  return request({
    url: '/userInfo/deleteById',
    method: 'get',
    params
  })
}