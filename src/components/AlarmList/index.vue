<template>
  <div>
    <main class="content-main">
      <div class="key-words-box flex-between">
        <div class="flex-start">
          <search-key @query="keyWordsQuery"/>
          <div class="ml50">
            <label class="filter-label">告警类型：</label>
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
          <div class="filter-time ml50">
            <label class="filter-label">告警时间：</label>
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
          :data="tableData3"
          style="width: 100%">
          <el-table-column label="序号" width="80" type=index>
          </el-table-column>
          <el-table-column prop="department" label="事件名称" width="270">
          </el-table-column>
          <el-table-column prop="department" label="事件描述" width="270">
          </el-table-column>
          <el-table-column prop="headPortrait" label="事件图片" width="120">
            <div class="headPortrait-box">
              <img src="" alt="" />
            </div>
          </el-table-column>
          <el-table-column prop="headPortrait" label="事件视频" width="120">
            <div class="headPortrait-box flex-center">
              <i class="el-icon-video-camera" />
            </div>
          </el-table-column>
          <el-table-column prop="address" label="告警类型" width="270">
          </el-table-column>
          <el-table-column prop="address" label="告警时间" width="270">
          </el-table-column>
          <el-table-column prop="address" label="处置状态"> </el-table-column>
          <el-table-column label="操作"> 
              <template slot-scope="scope">
                <div class="flex-start">
                    <el-button type="primary" @click="editAlarm(scope.row)" size="mini">编辑</el-button>
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
    <AlarmEdit :isEdit="isEdit"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import EditButton from '@/components/EditButton/index'
import Paging from '@/components/Paging/index'
import AlarmEdit from '@/components/AlarmEdit/index'
import {getAlarmInfoList} from '@/api/alarmCenter'

export default {
  name: 'AlarmList',
  components: {
    SearchKey,
    EditButton,
    Paging,
    AlarmEdit
  },
  props:{
    riskType:{
      type:String
    }
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:0,
        riskType:this.riskType
      },
      list:[],
      isEdit:false,
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
    this.getList()
  },
  methods: {
    editAlarm(item){
        this.isEdit = true
        
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 0
      this.getList()
    },
    getList(){
      let that = this
      let data = that.pageData
      getAlarmInfoList(data).then(res=>{

      })
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  watch:{
    riskType(newVal){
      this.riskType = newVal
      // this.getList()
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
