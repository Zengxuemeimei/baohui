<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">巡更管理-巡更方案</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
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
            label="方案名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="type"
            label="方案类型"
            width="280">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="280">
          </el-table-column>
          <!-- <el-table-column
            prop="department"
            label="巡更人员"
            width="280">
          </el-table-column>
          <el-table-column
            prop="department"
            label="巡更点位"
            width="146">
          </el-table-column> -->
          <el-table-column
            prop="department"
            label="所属部门"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
    <AddPatrolScheme :isShow="isAdd" :isEdit="isEdit" :listDepartment="listDepartment" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddPatrolScheme from '@/components/AddPatrolScheme/index'
import {getKeepWatchPlanList} from '@/api/keepWatch/index'
import {getDepartmentList} from '@/api/department'

export default {
  name: 'PatrolScheme',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddPatrolScheme
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1,
        departmentId:null,
        staffId:null
      },
      isAdd:false,
      isEdit:false,
      editDetail:{},
      list:[],
      total:0,
      loading:false,
      listDepartment:[],
      value3:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
  },
  created() {
  },
  mounted() {
    this.getDepartmentList()
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
    getList(){
      let that = this
      let data = that.pageData
      that.loading = true
      getKeepWatchPlanList(data).then(res=>{
        that.list = res.data.dataList
        that.total = res.data.total
        that.loading = false
      }).catch(error=>{
        that.loading = false
      })
    },
    getDepartmentList(){
        let that = this
        getDepartmentList().then(res=>{
          that.listDepartment=res.data
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
