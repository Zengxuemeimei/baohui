<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">客户管理</p>
    </header>
    <main class="content-main">
      <div class="key-words-box flex-between">
        <div class="flex-start">
          <search-key @query="keyWordsQuery"/>
          <div class="ml50">
              <label class="filter-label">车辆类型：</label>
              <el-select clearable v-model="pageData.type" @change="changeCarType" placeholder="请选择">
                <DictionarySelect :list="carTypeList"/>
              </el-select>
          </div>
        </div>
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="序号"
            type=index
            width="80">
          </el-table-column>
          <el-table-column
            prop="photoUrl"
            label="头像"
            width="120">
            <template slot-scope="scope">
              <div class="headPortrait-box flex-center">
                  <!-- <img :src="scope.row.photoUrl" @error="defaultBackImg"/> -->
                  <el-image 
                    fit="scale-down"
                    lazy
                    :src="scope.row.photoUrl">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话号码"
            width="270">
          </el-table-column>
          <el-table-column
            prop="customerEnterpriseName"
            label="所属公司">
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
      <Loading :loading="loading" />
    </main>
    <AddCustomer :isShow="isAdd" :isDetail="isDetail" :carTypeList="carTypeList" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import '@/styles/common.scss'
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import Paging from '@/components/Paging/index'
import AddCustomer from '@/components/AddCustomer/index'
import {getCustomerList,getCustomerDetail} from '@/api/customer'
// import {getDepartmentList} from '@/api/department'
import {getDictionaryList} from '@/api/dictionary'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import Loading from '@/components/Loading/index'

export default {
  name: 'Customer',
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddCustomer,
    DictionarySelect,
    Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        type:null
      },
      isAdd:false,
      isEdit:false,
      isDetail:false,
      editDetail:{},
      list:[],
      loading:false,
      carTypeList:[],
      total:0
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getCarTypeList()
  },
  methods: {
    defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 1
      this.getList()
    },
    editItem(id){
      let that = this
      that.isAdd = true
      that.isEdit = true
      getCustomerDetail({id:id}).then(res=>{
          that.editDetail = res.data
      })
    },
    detailItem(id){
      let that = this
      that.isAdd = true
      that.isDetail = true
      getCustomerDetail({id:id}).then(res=>{
          that.editDetail = res.data
      })
    },
    changeCarType(){
      this.pageData.pageIndex = 1
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
    },
    getList(){
      let that = this
      let data = this.pageData
      that.loading = true
      getCustomerList(data).then(res=>{
        that.list = res.data.dataList
        that.total = res.data.total
        that.loading = false
      }).catch(error=>{
        that.loading = false
      })
    },
    getCarTypeList(){
      let data = {}
      data.type = "车辆类型"
      getDictionaryList(data).then(res=>{
            this.carTypeList = res.data
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
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #f6f6f6;
  margin: 0 auto;
}
</style>
