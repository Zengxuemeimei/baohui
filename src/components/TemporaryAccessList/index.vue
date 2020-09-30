<template>
  <div>
      <main class="content-main">
      <div class="key-box flex-start">
        <div class="key-input-box">
          <el-input placeholder="请选择图片" v-model="input22">
            <i slot="suffix" class="el-input__icon el-icon-picture-outline" />
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="ml20">
          <el-button type="danger">以图搜图</el-button>
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
          <el-table-column prop="headPortrait" label="人员图片" width="270">
            <div class="headPortrait-box">
              <img src="" alt="" />
            </div>
          </el-table-column>
          <el-table-column prop="address" label="出入时间" width="270">
          </el-table-column>
          <el-table-column prop="address" label="出入方向"> </el-table-column>
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
import Paging from '@/components/Paging/index'
export default {
  name: 'TemporaryAccessList',
  components: {
    Paging
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
