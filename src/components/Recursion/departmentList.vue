<template>
  <div>
    <el-table :data="list" :show-header="isHeader"  :default-expand-all="false" header-cell-class-name="all-table-th" :row-class-name="getRowClassName" >
      <el-table-column type="expand">
        <template slot-scope="prop" v-if="prop.row.children && prop.row.children.length >0">
          <DepartmentList :list="prop.row.children" :isHeader="false" @editMenu="editMenuItem" @stopDepartment="stopDepartmentItem"/>
        </template>
      </el-table-column>
      <el-table-column label="部门名称" prop="name"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>
      <el-table-column label="创建时间" prop="creatTime"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button type="primary" @click="editMenu(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button
              v-show="scope.row.status == '启用'"
              type="danger"
              @click="stopBtn(scope.row)"
              size="mini"
              >停用</el-button
            >
            <el-button
              v-show="scope.row.status != '启用'"
              type="success"
              @click="stopBtn(scope.row)"
              size="mini"
              >启用</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteDepartment} from '@/api/department'

export default {
  name: "DepartmentList",
  components: {},
  props: {
    list: {
      type: Array,
    },
    isHeader:{
        type:Boolean,
        default:true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    editMenuItem(item){
      this.$emit('editMenu',{
        isAdd:item.isAdd,
        isEdit:item.isEdit,
        editDetail:item.editDetail
      })
    },
    getRowClassName({row, rowIndex}){
      if(!row.children){
         return 'row-expand-cover';
      }
      console.log('row',row)
      console.log('rowIndex',rowIndex)
    },
    editMenu(item) {
      this.$emit('editMenu',{
        isAdd:true,
        isEdit:true,
        editDetail:item
      })
    },
    deleteItem(){
        this.$emit('deleteList')
    },
    stopDepartmentItem(item){
      this.$emit('stopDepartment',item)
    },
    stopBtn(item) {
      if(item.status == "启用"){
        item.status = "停用"
      }else{
        item.status = "启用"
      }
      this.$emit('stopDepartment',item)
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
  },
};
</script>
<style>
 .row-expand-cover .el-table__expand-icon{visibility:hidden;}
 .el-table__expanded-cell[class*=cell]{
    padding:0;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #a1d1f142;
}
</style>
