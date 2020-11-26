import request from '@/utils/request'
import store from '@/store'
import Base64 from 'base-64';
import Tools from '@/utils/tools';
export function login(data) {
  data.password = Base64.encode(data.password + 'V2FuZzkyNjQ1NGRTQkFQSUpXVA');
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
  if(store.getters.roles.indexOf('superAdmin') === -1){
    params.enterpriseId = store.getters.enterpriseId
  }
  console.log('params',params)
  return request({
    url: '/userInfo/list',
    method: 'get',
    params
  })
}
export function saveOrUpdate(data) {
   if(store.getters.roles.indexOf('superAdmin') === -1){
    data.enterpriseId = store.getters.enterpriseId
  }
  // data.enterpriseId = store.getters.enterpriseId
  if (Tools.isEmpty(data.id)) {
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
//修改密码
export function updatePassword(data) {
  data.enterpriseId = store.getters.enterpriseId
  data.oldPassword = Base64.encode(data.oldPassword + 'V2FuZzkyNjQ1NGRTQkFQSUpXVA');
  data.newPassword = Base64.encode(data.newPassword + 'V2FuZzkyNjQ1NGRTQkFQSUpXVA');
  return request({
    url: '/userInfo/updatePassword',
    method: 'post',
    data
  })
}
