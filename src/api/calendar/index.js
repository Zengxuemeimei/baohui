import request from '@/utils/request'
import store from '@/store'

export function getCalendarList(params) { 
    return request({
      url: '/staffWorkCalendarInfo/list',
      method: 'get',
      params
    })
}

export function getStaffRecordInfoList(params) { 
    params.pageSize = 10
    return request({
      url: '/staffRecordInfo/list',
      method: 'get',
      params
    })
}
//考勤记录
export function getStaffAttendanceInfoList(params) { 
    params.pageSize = 10
    return request({
      url: '/staffAttendanceInfo/list',
      method: 'get',
      params
    })
}

export function workSaveOrUpdate(data) { 
    return request({
      url: '/staffWorkCalendarInfo/saveOrUpdate',
      method: 'post',
      data
    })
}

export function staffSaveOrUpdate(data) { 
    return request({
      url: '/staffRecordInfo/saveOrUpdate',
      method: 'post',
      data
    })
}
