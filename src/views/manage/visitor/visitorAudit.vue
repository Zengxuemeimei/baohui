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
              <el-button :style="{'background':isAll?'#53779D':'','color':isAll?'#ffffff':''}" @click="isAll=true">全部</el-button>
              <el-button :style="{'background':isAll?'':'#53779D','color':isAll?'':'#ffffff'}" @click="isAll=false">审核未通过</el-button>
          </div>
        </div>
        <div class="btn-box flex-start">
            <el-button type="primary" icon="el-icon-edit" @click="isAudit=true">审核</el-button>
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
            prop="headPortrait"
            label="头像"
            width="120">
            <div class="headPortrait-box">
                <img src="" alt="">
            </div>
          </el-table-column>
          <el-table-column
            prop="department"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="电话号码"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="访问对象"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="访问时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="离开时间"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <AuditVisitor :isShow="isAudit" @close="closeAudit"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AuditVisitor from '@/components/AuditVisitor/index'
import Paging from '@/components/Paging/index'
import {getVisitorList} from '@/api/visitor/index'

export default {
  name: 'VisitorAudit',
  components: {
    SearchKey,
    Paging,
    AuditVisitor
  },
  data() {
    return {
       pageData:{
        keyword:null,
        pageIndex:0,
      },
      list:[],
      loading:false,
      isAll:true,
      isAudit:false
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    closeAudit(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 0
      this.getList()
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getVisitorList(data).then(res=>{
          that.list = res.data.dataList
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
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #000000;
  margin: 0 auto;
}
</style>
