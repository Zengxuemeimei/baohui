<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">安全隐患管理</p>
    </header>
    <main class="content-main relative">
      
      <div class="filter-box ">
          <div class="key-words-box flex-start">
            <search-key @query="keyWordsQuery"/>
            <div class="flex-start ml20">
              <label class="filter-label">处理状态：</label>
              <el-select clearable v-model="hiddenDangerStatus" @change="changeStatus"  placeholder="请选择">
                  <DictionarySelect :list="hiddenDangerStatusList"/>
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
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="eventDescribe"
            label="事件描述">
          </el-table-column>
          <el-table-column
            prop="reportTime"
            label="上报时间">
          </el-table-column>
          <el-table-column
            prop="reportStaffName"
            label="上报人">
          </el-table-column>
          <el-table-column
            prop="level"
            label="隐患级别">
          </el-table-column>
          <el-table-column
            prop="manageTime"
            label="处理时间">
          </el-table-column>
          <el-table-column
            prop="manageStatus"
            label="处理状态">
          </el-table-column>
          <el-table-column
            prop="manageStaffName"
            label="处理人">
          </el-table-column>
          <el-table-column
            prop="manageDescribe"
            label="处理描述">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" @click="editItem(scope.row)"  size="mini">编辑</el-button>
                  <el-button type="success" @click="detailItem(scope.row)"  size="mini">详情</el-button>
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
    <AddHiddenDanger :isShow="isAdd" :isEdit="isEdit" :isDetail="isDetail" :hiddenDangerLevelList="hiddenDangerLevelList" :hiddenDangerStatusList="hiddenDangerStatusList" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddHiddenDanger from '@/components/AddHiddenDanger/index'
import {getHiddenDangerList,getHiddenDangerDetail} from '@/api/hiddenDanger'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import {getDictionaryList} from '@/api/dictionary'
import Loading from "@/components/Loading/index";

export default {
  name: 'HiddenDanger',
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddHiddenDanger,
    DictionarySelect,
    Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10
      },
      loading:false,
      isAdd:false,
      isEdit:false,
      isDetail:false,
      editDetail:{},
      list:[],
      total:0,
      hiddenDangerStatusList:[],
      hiddenDangerStatus:null,
      hiddenDangerLevelList:[]
      }
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getHiddenDangerStatusList()
    this.getHiddenDangerLevelList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 0
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
      this.isAdd = true
      this.isEdit = true
      getHiddenDangerDetail({id:item.id}).then(res=>{
          this.editDetail = res.data
      })
    },
    detailItem(item){
      this.isAdd = true
      this.isDetail = true
      getHiddenDangerDetail({id:item.id}).then(res=>{
          this.editDetail = res.data
      })
    },
    changeStatus(){
        
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getHiddenDangerList(data).then(res=>{
          that.list = res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
          that.loading = false
      })
    },
    getHiddenDangerStatusList(){
      let data = {}
      data.type = "隐患处理状态"
      getDictionaryList(data).then(res=>{
            this.hiddenDangerStatusList = res.data
        })
    },
    getHiddenDangerLevelList(){
      let data = {}
      data.type = "隐患级别"
      getDictionaryList(data).then(res=>{
            this.hiddenDangerLevelList = res.data
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
