<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">出入记录-车辆管理</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key />
      </div>
      <div class="filter-box flex-between relative">
        <div class="flex-start">
          <div>
            <label class="filter-label">进/出：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-time ml20">
            <label class="filter-label">进出时间：</label>
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="person-total flex-center flex-column">
            <div class="flex-start">
                <p class="f30">
                    <count-to
                    ref="example"
                    :start-val="0"
                    :end-val="520"
                    :duration="4000"
                    :autoplay="true"
                    class="example"
                    />
                </p>
                <p class="f14 ml5 mt5">辆</p>
            </div>
            <p class="mt5 f14">今日车辆进出数量</p>
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
            label="车牌号"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="车主姓名"
            width="146">
          </el-table-column>
           <el-table-column
            prop="department"
            label="车主身份证号"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="图片"
            width="146">
            <div class="headPortrait-box flex-center">
            </div>
          </el-table-column>
          <el-table-column
            prop="address"
            label="视频"
            width="146">
            <div class="headPortrait-box flex-center">
              <i class="el-icon-video-camera" />
            </div>
          </el-table-column>
          <el-table-column
            prop="address"
            label="出入地点"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="出入时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="出入方向"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <!-- <access-person /> -->
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import Paging from '@/components/Paging/index'
import SearchKey from '@/components/searchKey/index'
// import AccessPerson from '@/components/AccessDetail/person'
export default {
  name: 'CarRecords',
  components: {
      SearchKey,
      countTo,
      Paging,
    //   AccessPerson
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
.person-total{
    width: 215px;
    height: 80px;
    background: #F35D4D;
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ffffff;
}
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #000000;
  margin: 0 auto;
  color: #ffffff;
}
</style>
