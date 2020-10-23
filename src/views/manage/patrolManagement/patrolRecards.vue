<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">巡更管理-巡更记录</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key @query="keyWordsQuery" :isClear="isClearKey"/>
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
            label="类型"
            width="146">
          </el-table-column>
          <el-table-column
            label="完成进度"
            width="146">
            <template slot-scope="scope">
              {{scope.row.checkedCount}}:{{scope.row.checkTotal}}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="巡更状态"
            width="146">
          </el-table-column>
           <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
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
    <PatrolSchemeDetail :isDetail="isDetail"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import PatrolSchemeDetail from '@/components/PatrolSchemeDetail/index'
import {getKeepWatchRecordList} from '@/api/keepWatch/index'

export default {
  name: 'PatrolRecards',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    PatrolSchemeDetail
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1
      },
      isDetail:false,
      list:[],
      total:0,
      }
  },
  created() {
  },
  mounted() {
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
    detailItem(){

    },
    getList(){
      let that = this
      let data = that.pageData
      that.loading = true
      getKeepWatchRecordList(data).then(res=>{
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
/* .filter-label{
  font-weight: 500;
} */
.filter-time{
  margin-left: 34px;
}

</style>
