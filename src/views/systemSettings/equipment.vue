<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">设备管理</p>
    </header>
    <main class="content-main relative">
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
            prop="serialNumber"
            label="设备序列号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="ipAddress"
            label="设备IP">
          </el-table-column>
          <el-table-column
            prop="activeStatus"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="设备类型">
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
    <AddEquipment :isShow="isAdd" :isEdit="isEdit" @close="closeAdd" :editDetail="editDetail" :equipmentList="equipmentList" :enterpriseInfolist="enterpriseInfolist"/>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import {getEviceInfotList,deleteDeviceInfo} from '@/api/equipment'
import AddEquipment from '@/components/AddEquipment/index'
import Paging from '@/components/Paging/index'
import {getEnterpriseInfoList} from '@/api/enterprise'
import {getDictionaryList} from '@/api/dictionary'
import Loading from '@/components/Loading/index'

export default {
  name: 'Equipment',
  components: {AddButton,AddEquipment,Paging,Loading},
  data() {
    return {
      isAdd:false,
      isEdit:false,
      list:[],
      editDetail:{},
      total:0,
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10,
        enterpriseId:null
      },
      enterpriseInfolist:[],
      equipmentList:[],
      loading:false
    }
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getEnterpriseInfoList()
    this.getEquipmentList()
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
    deleteList(id){
      let that = this
      that.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDeviceInfo({id:id}).then(res=>{
             that.getList()
               that.$message({
                type: 'success',
                message: '删除成功!'
              });
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    getList(){
      this.loading = true
      getEviceInfotList(this.pageData).then(res=>{
          this.list = res.data.dataList
          this.total = res.data.total
          this.loading = false
      }).catch(error=>{
          this.loading = false
      })
    },
    getEquipmentList(){
      let data = {}
      data.type = "设备类型"
      getDictionaryList(data).then(res=>{
            this.equipmentList = res.data
        })
    },
    getEnterpriseInfoList(){
        getEnterpriseInfoList(this.pageData).then(res=>{
            this.enterpriseInfolist = res.data.dataList

        })
    },
  }
}
</script>
<style scoped>

</style>
