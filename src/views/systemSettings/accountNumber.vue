<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">账号管理</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key />
        <div class="btn-box flex-start">
            <add-button />
            <edit-button />
            <del-button />
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
         :row-class-name="tableRowClassName"
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="120">
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="账号"
            width="270">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="270">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="部门"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="权限"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <AddAccountNumber />
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddAccountNumber from '@/components/AddAccountNumber/index'
import {getList} from '@/api/user'
export default {
  name: 'AccountNumber',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddAccountNumber
  },
  data() {
    return {
      list: [],
      multipleSelection: [],
      value3:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
      let data = {
        enterpriseId:0,
        keyword:null,
        pageIndex:0,
        pageSize:10
      }
      getList(data).then(res=>{
          that.list=res.data.dataList
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
