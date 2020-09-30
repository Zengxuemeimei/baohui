<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">巡更管理-巡更记录</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <search-key />
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
         :row-class-name="tableRowClassName"
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="方案名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="department"
            label="巡更时间"
            width="146">
          </el-table-column>
          <el-table-column
            prop="department"
            label="类型"
            width="146">
          </el-table-column>
          <el-table-column
            prop="department"
            label="完成进度"
            width="146">
          </el-table-column>
          <el-table-column
            prop="department"
            label="巡更人员"
            width="146">
          </el-table-column>
          <el-table-column
            prop="department"
            label="检查是否正常"
            width="146">
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属部门"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <PatrolSchemeDetail />
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import PatrolSchemeDetail from '@/components/PatrolSchemeDetail/index'
export default {
  name: 'PatrolRecards',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    PatrolSchemeDetail
  },
  data() {
    return {
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
  },
  methods: {
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
