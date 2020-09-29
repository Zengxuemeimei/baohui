<template>
  <div>
    <main class="content-main">
      <div class="key-words-box flex-between">
        <div class="flex-start">
          <search-key />
          <div class="ml50">
            <label class="filter-label">车辆类型：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="btn-box flex-start">
          <edit-button />
        </div>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="headPortrait" label="头像" width="120">
            <div class="headPortrait-box">
              <img src="" alt="" />
            </div>
          </el-table-column>
          <el-table-column prop="department" label="姓名" width="270">
          </el-table-column>
          <el-table-column prop="department" label="电话号码" width="270">
          </el-table-column>
          <el-table-column prop="address" label="所属公司" width="270">
          </el-table-column>
          <el-table-column prop="address" label="车辆信息" width="270">
          </el-table-column>
          <el-table-column prop="address" label="车辆类型"> </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import EditButton from '@/components/EditButton/index'
import Paging from '@/components/Paging/index'
export default {
  name: 'AlarmList',
  components: {
    SearchKey,
    EditButton,
    Paging
  },
  data() {
    return {
      activeName2:"all",
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
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    tableRowClassName({row, rowIndex}){
        //修改table行的颜色
        if(rowIndex%2 != 1){
          return 'odd-row'
        }
    },
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
<style scoped>
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #000000;
  margin: 0 auto;
  color: #ffffff;
}

</style>
