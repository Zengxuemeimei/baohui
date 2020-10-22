<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">员工管理-离职员工</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
      </div>
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div>
            <label class="filter-label">部门：</label>
            <el-select v-model="pageData.departmentId" clearable @change="changeDepartment" placeholder="请选择">
              <DepartmentSelect :list="listDepartment"/>
            </el-select>
          </div>
          <div class="filter-time">
            <label class="filter-label">入职时间：</label>
            <el-date-picker
              @change="changeTimeList"
              v-model="quitTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          ref="multipleTable"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type=index
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            width="270">
          </el-table-column>
          <el-table-column
            prop="position"
            width="270"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="entryTime"
            label="入职时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="quitTime"
            label="离职时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
      <Loading :loading="loading" />
    </main>
  </div>
</template>

<script>
import '@/styles/common.scss'
import SearchKey from '@/components/searchKey/index'
import Paging from '@/components/Paging/index'
import Loading from '@/components/Loading/index'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import {getStaffList,getStaffDetail} from '@/api/staff/index'
import {getDepartmentList} from '@/api/department'
import moment from 'moment'

export default {
  name: 'Quit',
  components: {
    SearchKey,
    Loading,
    Paging,
    DepartmentSelect
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        departmentId:null,
        quitTimeStartTime:null,
        quitTimeEndTime:null
      },
      list:[],
      listDepartment:[],
      loading:false,
      quitTime:null,
      isClearKey:false
      }
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
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
    changeDepartment(val){
      this.pageData.keyword=null
      this.isClearKey=true;
      if(val){
        this.pageData.pageIndex = 1
      }else{
        this.pageData.departmentId = null
      }
      this.getList()

    },
    changeTimeList(val){
      this.isClearKey=true;
      this.pageData.pageIndex = 1
      if(val){
        this.pageData.quitTimeStartTime = moment(val[0]).format('YYYY-MM-DD hh:mm:ss')
        this.pageData.quitTimeEndTime = moment(val[1]).format('YYYY-MM-DD hh:mm:ss')
      }else{
        this.pageData.quitTimeStartTime = null
        this.pageData.quitTimeEndTime = null
      }
      
      this.getList()
      console.log(val)
    },
    getDepartmentList(){
        let that = this
        getDepartmentList().then(res=>{
          that.listDepartment=res.data
        })
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      data.quit=true
      getStaffList(data).then(res=>{
          that.list = res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
          that.loading = false
      })
    },
    tableRowClassName({row, rowIndex}){
        //修改table行的颜色
        if(rowIndex%2 != 1){
          return 'odd-row'
        }
    }
  }
}
</script>
<style scoped>
.key-words-box{
  margin-bottom: 20px;
}
.filter-label{
  font-weight: 500;
}
.filter-time{
  margin-left: 34px;
}

</style>
