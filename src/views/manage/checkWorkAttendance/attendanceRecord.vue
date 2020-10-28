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
            @change="changeTime"
            v-model="pageData.years"
            value-format="yyyy-MM"
            format="yyyy-MM"
            type="month">
          </el-date-picker>
        </div>
        <el-button type="primary" class="ml20 el-icon-check" @click="examine" v-show="isExamine"> 审核</el-button>
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
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="idNumber" label="身份证号">
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
                <el-button type="primary" v-show="scope.row.id" @click="editItem(scope.row)" size="mini">编辑</el-button>
                <el-button type="success" @click="detailItem(scope.row)" size="mini">详情</el-button>
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
    <CheckWorkDetail :isDetail="isDetail" @close="closeDetail" :staffId="staffId" :list="staffMonthList"/>
    <CheckWorkEdit :isEdit="isEdit" :editDetail="editDetail" @close="closeDetail"/>
  </div>
</template>

<script>
import Paging from '@/components/Paging/index'
import Loading from '@/components/Loading/index'
import SearchKey from '@/components/searchKey/index'
import { getStaffAttendanceInfoList,getStaffMonthList } from '@/api/calendar'
import moment from 'moment'
import CheckWorkDetail from '@/components/checkWorkDetail/index'
import CheckWorkEdit from '@/components/checkWorkEdit/index'
// import Print from '@/utils/print'
// Vue.use(Print)
export default {
  name: "AttendanceRecord",
  components: {
    Paging,
    Loading,
    SearchKey,
    CheckWorkDetail,
    CheckWorkEdit,
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
      isDetail:false,
      isEdit:false,
      editDetail:null,
      list:[],
      loading:false,
      total:0,
      staffMonthList:[],
      staffId:null,
      isExamine:false
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
    changeTime(val){
      console.log('改变时间')
      let change_time = moment(val).valueOf()
      let date = moment(new Date()).format('YYYY-MM')
      let current_time = moment(date).valueOf()
      console.log('改变时间',current_time > change_time)
      if(current_time > change_time){
          this.pageData.historyMonth = true
      }else{
        this.pageData.historyMonth = false
      }
        this.pageData.pageIndex = 1
        this.getList()
    },
    editItem(item){
      this.isEdit = true
      this.editDetail = item
    },
    detailItem(item){
      
      let data={
        staffId:item.staffId,
        years: this.pageData.years
      }
      console.log('staffId',item)
      this.staffId = item.staffId
      this.isDetail = true
      getStaffMonthList(data).then(res=>{
          this.staffMonthList = res.data
      })
    },
    closeDetail(item){
      this.isDetail = item.isShow
      this.isEdit = item.isShow
      this.editDetail = null
      if(item.isSuccess){
        this.getList()
      }
    },
    examine(month){
      this.$confirm('确认一键审核该月考勤, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            currentMonth:this.pageData.years
          }
          examine(data).then(res=>{
              this.$message({
                type: 'success',
                message: '审核成功!'
              });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getStaffAttendanceInfoList(data).then(res=>{
          that.list = res.data.dataList
          if(that.list[0].id){
            that.isExamine = true
          }else{
            that.isExamine = false
          }
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
