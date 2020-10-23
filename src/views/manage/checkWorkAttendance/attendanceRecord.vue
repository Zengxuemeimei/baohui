<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">考勤管理-考勤记录</p>
    </header>
    <main class="content-main">
      <div class="key-words-box flex-start">
        <search-key @query="keyWordsQuery" :isClear="isClearKey" />
        <div class="filter-time ml20">
          <label class="filter-label">选择时间：</label>
          <el-date-picker
            v-model="pageData.years"
            value-format="yyyy-MM"
            format="yyyy-MM"
            type="date"
          >
          </el-date-picker>
        </div>

      </div>
      
      <div class="all-table">
        <el-table
          border
          header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="270">
          </el-table-column>
          <el-table-column prop="idNumber" label="身份证号" width="270">
          </el-table-column>
          <el-table-column prop="totalCountAttendance" label="应出勤天数"> </el-table-column>
          <el-table-column prop="actualAttendanceCount" label="实际出勤天数"> </el-table-column>
          <el-table-column prop="leaveDuration" label="请假时长"> </el-table-column>
          <el-table-column prop="lateDuration" label="迟到时长"> </el-table-column>
          <el-table-column prop="absenteeismDuration" label="矿工时长"> </el-table-column>
          <el-table-column prop="extendDuration" label="加班时长"> </el-table-column>
          <!-- <el-table-column prop="entryTime" label="入职时间" width="270"> -->
          <!-- </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="flex-start">
                <el-button
                  type="primary"
                  @click="editItem(scope.row)"
                  size="mini"
                  >编辑</el-button
                >
                <!-- <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
  </div>
</template>

<script>
import Paging from '@/components/Paging/index'
import Loading from '@/components/Loading/index'
import SearchKey from '@/components/searchKey/index'
import { getStaffAttendanceInfoList,getStaffMonthList } from '@/api/calendar'
import moment from 'moment'
export default {
  name: "AttendanceRecord",
  components: {
    Paging,
    Loading,
    SearchKey
  },
  data() {
    return {
      isClearKey:false,
      entryTime:null,
      pageData:{
        keyword:null,
        pageIndex:1,
        years:null
      },
      list:[],
      loading:false,
      total:0
    };
  },
  created() {},
  mounted() {
    let date = new Date()
    this.pageData.years = moment(date).format('YYYY-MM')
    this.getList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 1
      this.isClearKey=false
      this.getList()
    },
    // changeTimeList(val){
    //   this.isClearKey=true
    //   if(val){
    //     this.pageData.entryTimeStartTime = moment(val[0]).format('YYYY-MM-DD hh:mm:ss')
    //     this.pageData.entryTimeEndTime = moment(val[0]).format('YYYY-MM-DD hh:mm:ss')
    //   }else{
    //     this.pageData.entryTimeStartTime = null
    //     this.pageData.entryTimeEndTime = null
    //   }
      
    //   this.getList()
    //   console.log(val)
    // },
    editItem(item){
      let date = new Date()

      let data={
        staffId:item.staffId,
        years: moment(date).format('YYYY-MM')
      }
      getStaffMonthList(data).then(res=>{

      })
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getStaffAttendanceInfoList(data).then(res=>{
          that.list = res.data.dataList
          that.loading = false
          that.total = res.data.total
      }).catch(error=>{
          that.loading = false
      })
    },
  },
};
</script>
<style scoped>
</style>
