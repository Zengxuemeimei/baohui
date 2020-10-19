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
                <DepartmentSelect :list="carTypeList"/>
              </el-select>
              <!-- <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
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
              <div class="headPortrait-box">
                  <img :src="scope.row.photoUrl" alt="">
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
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <AddCustomer :isShow="isAdd" :carTypeList="carTypeList" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
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
import DepartmentSelect from '@/components/Recursion/departmentSelect'

export default {
  name: 'Customer',
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddCustomer,
    DepartmentSelect
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:0,
        type:null
      },
      isAdd:false,
      isEdit:false,
      isDetail:false,
      editDetail:{},
      list:[],
      loading:false,
      carTypeList:[]
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getCarTypeList()
  },
  methods: {
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 0
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

    },
    changeCarType(){
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
    getList(){
      let that = this
      let data = this.pageData
      getCustomerList(data).then(res=>{
        that.list = res.data.dataList
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
  background: #000000;
  margin: 0 auto;
}
</style>
