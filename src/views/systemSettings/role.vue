<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">角色管理</p>
    </header>
    <main class="content-main relative">
      <div class="filter-box flex-between">
        <div class="btn-box flex-start">
            <add-button @addShow="addRole"/>
            <!-- <el-button type="success" class="ml20" icon="el-icon-refresh" @click="refresh">刷新</el-button> -->
        </div>
      </div>
      <div class="all-table">
          <el-table
            header-cell-class-name="all-table-th"
            :data="list"
            border
            style="width: 100%">
            <el-table-column
            label="序号"
            type="index"
            width="80">
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="remark">
            </el-table-column>
            <el-table-column
            label="角色标识"
            prop="roleCode">
            </el-table-column>
            <el-table-column
            label="添加时间"
            prop="creatTime">
            </el-table-column>
            <el-table-column
            prop="enterpriseName"
            label="所属企业">
          </el-table-column>
            <el-table-column
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="success" size="mini" @click="setRoles(scope.row.id)">权限</el-button>
                  <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
                  <el-button type="danger" @click="deleteList(scope.row.id)" size="mini">删除</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <!-- <p>双击进入详情页面</p>
        <paging /> -->
        <Loading :loading="loading" />
      </div>
    </main>
    <AddRole :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
    <TreeRole :isShow="isSetRoles" @closeTree="closeTree" :menuList="menuList" :roleId="roleId"/>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import Paging from '@/components/Paging/index'
import AddRole from '@/components/AddRole/index'
import TreeRole from '@/components/TreeRole/index'
import {getRoleList,deleteRole} from '@/api/roles'
import {getList} from '@/api/menu'
import Loading from "@/components/Loading/index";
import { mapGetters } from 'vuex'

export default {
  name: 'Role',
  components: {
    AddButton,
    AddRole,
    Paging,
    TreeRole,
    Loading
  },
  computed: {
    ...mapGetters([
      'menu',
      'roles'
    ])
  },
  inject: ['reload'],
  data() {
    return {
      isSetRoles:false,
      roleId:null,
      pageDatas:{
          keyword:null,
          pageIndex:1
      },
      list: [],
      isAdd:false,
      isEdit:false,
      editDetail:{},
      loading:false,
      menuList:[]
    }
  },
  created() {
  },
  mounted() {
      this.getRoleList()
  if(this.roles.indexOf('superAdmin') != -1){
      this.getMenuList() 
  }else{
    this.menuList = this.menu
  }
  },
  methods: {
    getMenuList(){
        let that = this
        getList().then(res=>{
            that.menuList = res.data
        })
    },
      getRoleList(){
        let that = this
        that.loading = true
        getRoleList({}).then(res=>{
          that.loading = false
           that.list = res.data.dataList
        }).catch(error=>{
          that.loading = false
        })
      },
      setRoles(id){
        this.isSetRoles=true
        this.roleId = id
      },
      addRole(value){
        this.isAdd = value
      },
      editMenu(item){
        let that = this
        that.isAdd = true
        that.isEdit = true
        that.editDetail = item
      },
      deleteList(id){
        let that = this
          that.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    deleteRole({id:id}).then(res=>{
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        that.getRoleList()
                    })
                    
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            });
      },
      closeAdd(item){
          if(item.isSuccess){
              this.getRoleList()
          }
          this.isAdd = item.isShow
          this.isEdit = item.isShow
          this.editDetail = null
      },
      closeTree(item){
        if(item.isSuccess){
              this.getRoleList()
          }
          this.isSetRoles = item.isShow
      },
      getRoles(value){
        let menuIds = []
        value.forEach(el=>{
          menuIds.push(el.id)
        })
        this.menuIds = menuIds
      }
  }
}
</script>
<style scoped>

</style>
<style>
.el-table__expanded-cell[class*=cell]{
    padding: 0 0 0 48px;
}
.el-button--success{
  background: #13ce66;
}
.el-button--success:focus, .el-button--success:hover{
  background: #42d885;
}
</style>
