<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">巡更管理-点位管理</p>
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
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="点位名称">
          </el-table-column>
          <el-table-column
            prop="number"
            label="点位编号">
          </el-table-column>
          <el-table-column
            prop="type"
            label="点位类型">
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="点位详细位置">
          </el-table-column>
          <el-table-column
            prop="longitude"
            label="经度">
          </el-table-column>
          <el-table-column
            prop="latitude"
            label="纬度">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="所属部门"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" @click="editItem(scope.row)" size="mini">编辑</el-button>
                  <!-- <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button> -->
                </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage" />
      </div>
      <Loading :loading="loading"/>
    </main>
    <AddPointPosition :isShow="isAdd" :positionTypeList="positionTypeList" :isEdit="isEdit" :listDepartment="listDepartment" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
// import EditButton from '@/components/EditButton/index'
// import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddPointPosition from '@/components/AddPointPosition/index'
import {getKeepWatchPlaceList} from '@/api/keepWatch/index'
import Loading  from '@/components/Loading/index'
import {getDepartmentList} from '@/api/department'
import {getDictionaryList} from '@/api/dictionary'


export default {
  name: 'PointPosition',
  components: {
    SearchKey,
    AddButton,
    // EditButton,
    // DelButton,
    Paging,
    AddPointPosition,
    Loading
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1,
        departmentId:null
      },
      total:0,
      isAdd:false,
      isEdit:false,
      editDetail:{},
      loading:false,
      list:[],
      listDepartment:[],
      positionTypeList:[],
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
    this.getList()
    this.getDepartmentList()
    this.getPositionTypeList()
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
    editItem(item){
      let that = this
      that.isAdd = true
      that.isEdit = true
      that.editDetail = item
      console.log(item)
    },
    getList(){
      let that = this
      let data = that.pageData
      that.loading = true
      getKeepWatchPlaceList(data).then(res=>{
        that.list = res.data.dataList
        that.total = res.data.total
        that.loading = false
      })
    },
    getDepartmentList(){
        let that = this
        getDepartmentList().then(res=>{
          that.listDepartment=res.data
        })
    },
    getPositionTypeList(){
      let data = {}
      data.type = "点位类型"
      getDictionaryList(data).then(res=>{
            this.positionTypeList = res.data
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
