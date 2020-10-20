<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">账号管理</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key @query="keyWordsQuery"/>
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          ref="multipleTable"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="账号"
            width="270">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="status"
            width="80"
            label="状态">
          </el-table-column>
         <el-table-column
            prop="address"
            label="操作"
            width="270">
            <template slot-scope="scope">
                <div class="flex-start">
                    <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
                    <el-button type="danger" @click="deleteList(scope.row.id)" size="mini">删除</el-button>
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
    <AddAccountNumber :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddAccountNumber from '@/components/AddAccountNumber/index'
import {getList,deleteAccountNum} from '@/api/user'
import Loading from '@/components/Loading/index'

export default {
  name: 'AccountNumber',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddAccountNumber,
    Loading
  },
  data() {
    return {
      list: [],
      pageData:{
        keyword:null,
        pageIndex:1
      },
      isAdd:false,
      isEdit:false,
      editDetail:{},
      total:0,
      loading:false
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
        this.getList()
    },
    addShow(value){
      let that = this
      that.isAdd = value
    },
    closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.isEdit = item.isShow
      },
      editMenu(item){
        this.isAdd = true
        this.isEdit = true
        this.editDetail = item
      },
      deleteList(id){
        let that = this
         that.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                  deleteAccountNum({id:id}).then(res=>{
                       that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.getList()
                  })               
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            });
        
      },
    getList(){
      let that = this
      let data = that.pageData
      that.loading = true
      getList(data).then(res=>{
          that.list=res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
          that.loading = false
      })
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
