<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">菜单管理</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <div class="btn-box flex-start">
            <add-button @addShow="addMenu"/>
        </div>
      </div>
      <div class="all-table">
          <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="prop">
                <el-table
                    :data="prop.row.children"
                    :show-header="false"
                    style="width: 100%">
                <el-table-column
                    label="菜单名称"
                    prop="meta.title">
                    </el-table-column>
                    <!-- <el-table-column
                    label="id"
                    prop="id">
                    </el-table-column> -->
                    <el-table-column
                    label="name"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="component"
                    prop="component">
                    </el-table-column>
                    <el-table-column
                    label="path"
                    prop="path">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <div class="flex-start">
                            <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
                            <el-button type="danger" @click="deleteList(scope.row.id)" size="mini">删除</el-button>
                        </div>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
            </el-table-column>
            <el-table-column
            label="菜单名称"
            prop="meta.title">
            </el-table-column>
            <!-- <el-table-column
            label="id"
            prop="id">
            </el-table-column> -->
            <el-table-column
            label="name"
            prop="name">
            </el-table-column>
            <el-table-column
            label="component"
            prop="component">
            </el-table-column>
            <el-table-column
            label="path"
            prop="path">
            </el-table-column>
            <el-table-column
            label="操作"
            >
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
        <!-- <p>双击进入详情页面</p>
        <paging /> -->
      </div>
    </main>
    <AddMenu :isShow="isAdd" :isEdit="isEdit" :menuList="list" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import Paging from '@/components/Paging/index'
import AddMenu from '@/components/AddMenu/index'
import {getList,deleteMenu} from '@/api/menu'

export default {
  name: 'Menu',
  components: {
    AddButton,
    AddMenu,
    Paging,
  },
  data() {
    return {
        pageDatas:{
            keyword:null,
            pageIndex:0
        },
        list: [],
        isAdd:false,
        isEdit:false,
        editDetail:{} 
    }
  },
  created() {
  },
  mounted() {
      this.getList()
    
  },
  methods: {
      getList(){
        let that = this
        let data = that.pageDatas
        getList().then(res=>{
            that.list = res.data
        })
      },
      addMenu(value){
        let that = this
        that.isAdd = value
        console.log('isadd',value)
      },
      editMenu(item){
        let that = this
        that.isAdd = true
        that.isEdit = true
        that.editDetail = item
      },
      closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
      },
      deleteList(id){
           this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    deleteMenu({id:id}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList()
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            });
          
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
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #d1ba6a42;
}
</style>
