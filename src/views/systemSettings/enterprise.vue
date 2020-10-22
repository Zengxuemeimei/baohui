<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">企业管理</p>
    </header>
    <main class="content-main">
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
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
            prop="name"
            label="企业名称">
          </el-table-column>
          <el-table-column
            prop="mobilNumber"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="detailedAddress"
            label="详细地址">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
         <el-table-column
            prop="address"
            label="操作"
            width="270">
            <template slot-scope="scope">
                <div class="flex-start">
                    <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
                    <!-- <el-button type="danger" @click="deleteList(scope.row.id)" size="mini">删除</el-button> -->
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
    <AddEnterprise :isShow="isAdd" :enterpriseTypeList="enterpriseTypeList" :isEdit="isEdit" @close="closeAdd" :editDetail="editDetail"/>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import {getEnterpriseInfoList} from '@/api/enterprise'
import Paging from '@/components/Paging/index'
import AddEnterprise from '@/components/AddEnterprise/index'
import {getDictionaryList} from '@/api/dictionary'

export default {
  name: 'Enterprise',
  components: {AddButton,Paging,AddEnterprise},
  data() {
    return {
        isAdd:false,
        isEdit:false,
        pageData:{
            keyword:null,
            pageIndex:1,
            pageSize:10,
        },
        editDetail:{},
        list:[],
        total:0,
        enterpriseTypeList:[]
    }
  },
  created() {
  },
  mounted() {
      this.getList()
      this.getEnterpriseTypeList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    addShow(value){
      let that = this
      that.isAdd = value
    },
    closeAdd(item){
      if(item.isSuccess){
          this.getList()
      }
      this.isAdd = item.isShow
    },
    editMenu(item){
      this.isAdd = true
      this.isEdit = true
      this.editDetail = item
    },
    deleteList(){

    },
    getList(){
        this.loading = true
        getEnterpriseInfoList(this.pageData).then(res=>{
            this.list = res.data.dataList
            this.total = res.data.total
            this.loading = false
        }).catch(error=>{
            this.loading = false
        })
    },
    getEnterpriseTypeList(){
      let data = {}
      data.type = "企业类型"
      getDictionaryList(data).then(res=>{
            this.enterpriseTypeList = res.data
        })
    },
  }
}
</script>
<style scoped>

</style>
