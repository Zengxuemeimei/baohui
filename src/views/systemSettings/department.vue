<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">部门管理</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key @query="keyWordsQuery" />
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
            <!-- <edit-button />
            <del-button /> -->
        </div>
      </div>
      <div class="all-table">
        <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="部门名称"
            width="270">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            prop="creatTime"
            label="创建时间"
            width="270">
          </el-table-column>
          <el-table-column
          label="操作">
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
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <AddDepartment :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" :list="list" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddDepartment from '@/components/AddDepartment/index'
import {getDepartmentList,deleteDepartment} from '@/api/department'
export default {
  name: 'Department',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddDepartment
  },
  data() {
    return {
      list: [],
      pageData:{
        keyword:null,
        pageIndex:0
      },
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
    keyWordsQuery(val){
        this.pageData.keyword = val
        this.pageData.pageIndex = 0
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
         that.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                  deleteDepartment({id:id}).then(res=>{
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
      getDepartmentList(data).then(res=>{
          that.list=res.data
      })
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
/* .filter-label{
  font-weight: 500;
} */
.filter-time{
  margin-left: 34px;
}

</style>
