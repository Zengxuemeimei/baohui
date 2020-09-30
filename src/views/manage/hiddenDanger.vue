<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">安全隐患管理</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key />
      </div>
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div>
            <label class="filter-label">处理状态：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
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
            label="标题"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="事件描述"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="上报时间"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="上报人"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="隐患级别"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="处理时间"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="处理状态"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="处理人"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="处理描述"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <add-hiddenDanger />
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddHiddenDanger from '@/components/AddHiddenDanger/index'
export default {
  name: 'HiddenDanger',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddHiddenDanger
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
