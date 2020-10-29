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
    // params.pageSize = 10
    return request({
      url: '/staffRecordInfo/list',
      method: 'get',
      params
    })
}
//考勤记录
export function getStaffAttendanceInfoList(params) { 
    // params.pageSize = 10
    return request({
      url: '/staffAttendanceInfo/list',
      method: 'get',
      params
    })
}
//删除请假，加班记录
export function deleteLeaveRecord(params) { 
  return request({
    url: '/staffRecordInfo/deleteById',
    method: 'get',
    params
  })
}

//按月查看考勤
export function getStaffMonthList(params) { 
  return request({
    url: '/staffAttendanceInfo/getAttendanceInfoListByStaff',
    method: 'get',
    params
  })
}
//查看员工考勤信息
export function getStaffDayDetail(params) { 
  return request({
    url: '/staffAttendanceInfo/getSignInfoByStaff',
    method: 'get',
    params
  })
}
//修改考勤记录
export function updateCheckWork(data) { 
  return request({
    url: '/staffAttendanceInfo/update',
    method: 'post',
    data
  })
}
//审核考勤
export function examine(params) { 
  return request({
    url: 'staffAttendanceInfo/approvalCurrentMonth',
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
