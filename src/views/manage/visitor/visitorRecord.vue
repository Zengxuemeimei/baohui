<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">访客管理-访客记录</p>
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
            <!-- <edit-button /> -->
            <!-- <del-button /> -->
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
            prop="image"
            label="头像"
            width="120">
            <template slot-scope="scope">
                <div class="headPortrait-box">
                    <img :src="scope.row.image"  @error="defaultBackImg">
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
            prop="intervieweeName"
            label="访问对象"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="访问时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="leaveTime"
            label="离开时间"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
      <Loading :loading="loading" />
    </main>
    <AddVisitor :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddVisitor from '@/components/AddVisitor/index'
import {getVisitorList} from '@/api/visitor/index'
import {getDictionaryList} from '@/api/dictionary'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import Loading from '@/components/Loading/index'

export default {
  name: 'VisitorRecord',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddVisitor,
    DepartmentSelect,
    Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        status:'PASS',
        type:null
      },
      list:[],
      loading:false,
      isAdd:false,
      isEdit:false,
      editDetail:{},
      total:0,
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
      let data = this.pageData
      let that = this
      that.loading = true
      getVisitorList(data).then(res=>{
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
  background: #e6e6e6;
  margin: 0 auto;
}
.headPortrait-box img{
  height: 100%;
  width: 100%;
}
</style>
