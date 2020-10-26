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
              <el-button :style="{'background':isAll?'#53779D':'','color':isAll?'#ffffff':''}" @click="getAllList">全部</el-button>
              <el-button :style="{'background':isAll?'':'#53779D','color':isAll?'':'#ffffff'}" @click="getUnPassList">审核未通过</el-button>
          </div>
        </div>
        <!-- <div class="btn-box flex-start">
            <el-button type="primary" icon="el-icon-edit" @click="isAudit=true">审核</el-button>
        </div> -->
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
            <template slot-scope="scope">
              <div class="headPortrait-box flex-center">
                  <!-- <img :src="scope.row.image" @error="defaultBackImg"> -->
                  <el-image 
                    fit="scale-down"
                    lazy
                    :src="scope.row.image">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="intervieweeName"
            label="访问对象">
          </el-table-column>
          <el-table-column
            prop="visitTime"
            label="访问时间">
          </el-table-column>
          <el-table-column
            prop="leaveTime"
            label="离开时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" v-if="isAll" icon="el-icon-edit" size="small" @click="isAudit=true;audit(scope.row)">审核</el-button>
                  <el-button type="success" v-if="!isAll" icon="el-icon-edit" size="small" @click="isAudit=true;detailItem(scope.row)">详情</el-button>
                  <el-button type="danger" v-if="!isAll" size="small" @click="deleteVisitor(scope.row.id)">删除</el-button>
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
    <AuditVisitor :isShow="isAudit" @close="closeAudit" :isDetail="isDetail" :editDetail="editDetail"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AuditVisitor from '@/components/AuditVisitor/index'
import Paging from '@/components/Paging/index'
import {getVisitorList,deleteVisitor} from '@/api/visitor/index'
import Loading from '@/components/Loading/index'

export default {
  name: 'VisitorAudit',
  components: {
    SearchKey,
    Paging,
    AuditVisitor,
    Loading
  },
  data() {
    return {
       pageData:{
        keyword:null,
        pageIndex:1,
        status:'REVIEWED'
      },
      list:[],
      loading:false,
      isAll:true,
      isAudit:false,
      isDetail:false,
      editDetail:{},
      total:0,
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    audit(item){
      this.editDetail = item
    },
    detailItem(item){
      this.isDetail = true
      this.editDetail = item
    },
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
    deleteVisitor(id){
      let that = this
         that.$confirm('此操作将永久删除该访客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                  deleteVisitor({id:id}).then(res=>{
                       that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.getUnPassList()
                  })               
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            });
    },
    getAllList(){
        this.isAll = true
        this.pageData.status="REVIEWED"
        this.pageData.pageIndex=0
        this.getList()
    },
    getUnPassList(){
        this.isAll=false
        this.pageData.status="UNPASS"
        this.pageData.pageIndex=1
        this.getList()
    },
    closeAudit(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAudit = item.isShow
        that.isDetail = item.isShow
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex =1
      this.getList()
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
