<template>
  <div>
    <el-table :data="list" :show-header="isHeader" header-cell-class-name="all-table-th" :default-expand-all="false" :row-class-name="getRowClassName"  style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="prop" v-if="prop.row.children">
          <DictionaryList :list="prop.row.children" :isHeader="false" @editMenu="editMenuItem"/>
        </template>
      </el-table-column>
      <el-table-column label="数据名称" prop="name"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button type="primary" @click="editMenu(scope.row)" size="mini"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {updateStatus} from '@/api/dictionary'

export default {
  name: "DictionaryList",
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
      if(row.children.length <= 0){
         return 'row-expand-cover';
      }
    },
    editMenu(item) {
      this.$emit('editMenu',{
        isAdd:true,
        isEdit:true,
        editDetail:item
      })
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
