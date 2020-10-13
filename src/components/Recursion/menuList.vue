<template>
  <div>
    <el-table :data="list" :show-header="isHeader" :default-expand-all="false" :row-class-name="getRowClassName"  style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="prop" v-if="prop.row.children">
          <MenuList :list="prop.row.children" :isHeader="false" @editMenu="editMenuItem"/>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称" prop="meta.title"> </el-table-column>
      <el-table-column label="name" prop="name"> </el-table-column>
      <el-table-column label="component" prop="component"> </el-table-column>
      <el-table-column label="path" prop="path"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button type="primary" @click="editMenu(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="deleteList(scope.row.id)"
              size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteMenu} from '@/api/menu'

export default {
  name: "MenuList",
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
    deleteList(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteMenu({ id: id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$emit('deleteList')
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
 .row-expand-cover .el-table__expand-icon{visibility:hidden;}
</style>
