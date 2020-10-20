<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">实时监控-监控地址列表</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
      </div>
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div>
            <label class="filter-label">部门：</label>
            <el-select clearable v-model="pageData.departmentId" @change="pageData.pageIndex=0;pageData.keyword=null;isClearKey=true;getList()" placeholder="请选择">
              <DepartmentSelect :list="listDepartment"/>
            </el-select>
          </div>
        </div>
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
            <!-- <edit-button />
            <del-button /> -->
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
            label="点位名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="videoUrl"
            label="视频播放地址"
            width="280">
          </el-table-column>
          <el-table-column
            prop="address"
            label="点位地址"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
    <AddMonitor :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddMonitor from '@/components/AddMonitor/index'
import {getDepartmentList} from '@/api/department'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import {getMonitorList} from '@/api/monitor/index'

export default {
  name: 'MonitorList',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddMonitor,
    DepartmentSelect
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1,
        departmentId:null
      },
      isAdd:false,
      isEdit:false,
      editDetail:{},
      list:[],
      total:0,
      listDepartment:[]
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
    closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.isEdit = item.isShow 
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
