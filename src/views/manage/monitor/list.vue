<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">实时监控-监控地址列表</p>
    </header>
    <main class="content-main relative">
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div class="">
            <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
          </div>
          <div class="flex-start ml20">
            <label class="filter-label">部门：</label>
            <el-select clearable v-model="pageData.departmentId" @change="pageData.pageIndex=1;pageData.keyword=null;isClearKey=true;getList()" placeholder="请选择">
              <DepartmentSelect :list="listDepartment"/>
            </el-select>
          </div>
           <div class="btn-box flex-start ml20">
              <add-button @addShow="addShow"/>
          </div>
        </div>
       
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type=index
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="点位名称">
          </el-table-column>
          <el-table-column
            prop="videoUrl"
            label="视频播放地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="点位地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            width="200px"
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" @click="editItem(scope.row)" size="mini">编辑</el-button>
                  <!-- <el-button type="success" @click="detailItem(scope.row)" size="mini">详情</el-button> -->
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
      <Loading :loading="loading" />
    </main>
    <AddMonitor :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" :listDepartment="listDepartment" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import Paging from '@/components/Paging/index'
import AddMonitor from '@/components/AddMonitor/index'
import {getDepartmentList} from '@/api/department'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import {getMonitorList} from '@/api/monitor/index'
import Loading from "@/components/Loading/index";

export default {
  name: 'MonitorList',
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddMonitor,
    DepartmentSelect,
    Loading
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10,
        departmentId:null
      },
      isAdd:false,
      isEdit:false,
      isDetail:false,
      editDetail:{},
      list:[],
      total:0,
      listDepartment:[],
      loading:false
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
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    editItem(item){
      this.isAdd = true
      this.isEdit = true
      this.editDetail = item
    },
    closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.editDetail = null
        that.isEdit = item.isShow 
    },
    getDepartmentList(){
        let that = this
        getDepartmentList({status: "启用"}).then(res=>{
          that.listDepartment=res.data
        })
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getMonitorList(data).then(res=>{
          that.list = res.data.dataList
          that.loading = false
          that.total = res.data.total
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
/* .filter-label{
  font-weight: 500;
} */
.filter-time{
  margin-left: 34px;
}

</style>
