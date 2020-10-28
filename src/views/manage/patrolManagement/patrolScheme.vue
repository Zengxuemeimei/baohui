<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">巡更管理-巡更方案</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-start">
        <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
        <div class="btn-box flex-start ml20">
            <add-button @addShow="addShow"/>
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
          <el-table-column
            prop="departmentName"
            label="所属部门">
          </el-table-column>
           <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" @click="editItem(scope.row.id)" size="mini">编辑</el-button>
                  <el-button type="success" @click="detailItem(scope.row.id)" size="mini">详情</el-button>
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
    <AddPatrolScheme :isShow="isAdd" :isEdit="isEdit" :isDetail="isDetail" :repetitionTypeList="repetitionTypeList" :caseTypeList="caseTypeList" :listDepartment="listDepartment" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddPatrolScheme from '@/components/AddPatrolScheme/index'
import {getKeepWatchPlanList,getPlanDetailList} from '@/api/keepWatch/index'
import {getDepartmentList} from '@/api/department'
import {getDictionaryList} from '@/api/dictionary'

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
      isDetail:false,
      editDetail:{},
      list:[],
      total:0,
      loading:false,
      listDepartment:[],
      caseTypeList:[],
      repetitionTypeList:[],
    }
  },
  created() {
  },
  mounted() {
    this.getDepartmentList()
    this.getList()
    this.getCaseTypeList()
    this.getRepetitionTypeTypeList()
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
        that.isDetail = item.isShow 
        that.editDetail = null
    },
    editItem(id){
      getPlanDetailList({id:id}).then(res=>{
          this.isAdd = true
          this.isEdit = true
          this.editDetail = res.data
      })
    },
    detailItem(id){
       getPlanDetailList({id:id}).then(res=>{
          this.isAdd = true
          this.isDetail = true
          this.editDetail = res.data
      })
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
    getCaseTypeList(){
      let data = {}
      data.type = "方案类型"
      getDictionaryList(data).then(res=>{
            this.caseTypeList = res.data
        })
    },
    getRepetitionTypeTypeList(){
      let data = {}
      data.type = "重复计划"
      getDictionaryList(data).then(res=>{
            this.repetitionTypeList = res.data
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
