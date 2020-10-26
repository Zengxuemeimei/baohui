<template>
  <div>
    <main class="content-main">
      <div class="key-words-box flex-between">
        <div class="flex-start">
          <search-key @query="keyWordsQuery"/>
          <div class="ml50">
            <label class="filter-label">告警类型：</label>
            <el-select clearable v-model="alarmType" @change="changeAlarmType" placeholder="请选择">
              <DictionarySelect :list="alarmTypeList" />
            </el-select>
          </div>
          <div class="filter-time ml50">
            <label class="filter-label">告警时间：</label>
            <el-date-picker
              v-model="alarmTime"
              type="datetimerange"
              @change="changeTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <!-- <div class="btn-box flex-start">
          <edit-button />
        </div> -->
      </div>
      <div class="all-table">
        <el-table
          border
          header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column label="序号" width="80" type=index>
          </el-table-column>
          <el-table-column prop="name" label="事件名称">
          </el-table-column>
          <el-table-column prop="comment" label="事件描述">
          </el-table-column>
          <el-table-column prop="imageUrl" label="事件图片">
            <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <!-- <img :src="scope.row.imageUrl" /> -->
                    <el-image 
                    fit="scale-down"
                    lazy
                    :src="scope.row.imageUrl">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
            </template>
           
          </el-table-column>
          <el-table-column prop="videoUrl" label="事件视频" >
            <div class="headPortrait-box flex-center">
              <i class="el-icon-video-camera" />
            </div>
          </el-table-column>
          <el-table-column prop="riskType" label="告警类型" >
          </el-table-column>
          <el-table-column prop="riskTime" label="告警时间" >
          </el-table-column>
          <el-table-column prop="manageStatus" label="处置状态"> </el-table-column>
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
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
    <AlarmEdit :isEdit="isEdit" @close="closeEdit" :alarmInfo="detail" :staffList="staffList" :alarmStatusList="alarmStatusList" :alarmTypeList="alarmTypeList"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import EditButton from '@/components/EditButton/index'
import Paging from '@/components/Paging/index'
import AlarmEdit from '@/components/AlarmEdit/index'
import {getAlarmInfoList} from '@/api/alarmCenter'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import moment from 'moment'

export default {
  name: 'AlarmList',
  components: {
    SearchKey,
    EditButton,
    Paging,
    AlarmEdit,
    DictionarySelect
  },
  props:{
    manageStatus:{
      type:String
    },
    alarmTypeList:{
      type:Array
    },
    alarmStatusList:{
      type:Array
    },
    staffList:{
      type:Array
    }
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        manageStatus:null
      },
      list:[],
      total:0,
      isEdit:false,
      loading:false,
      alarmType:null,
      alarmTime:null,
      detail:null
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
    console.log('manageStatus',this.manageStatus)
  },
  methods: {
    changeAlarmType(value){
      this.pageData.pageIndex = 1
      if(value){
        this.pageData.riskType = value
      }else{
        this.pageData.riskType = null
      }
      
      this.getList()
    },
    changeTime(val){
      this.pageData.pageIndex = 1
      if(val){
        this.pageData.riskStartTime = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        this.pageData.riskEndTime = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      }else{
        this.pageData.riskStartTime = null
        this.pageData.riskEndTime = null
      }
      this.getList()
    },
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    closeEdit(item){
        if(item.isSuccess){
          this.getList()
        }
        this.isEdit = item.isShow
    },
    editAlarm(item){
        this.isEdit = true
        this.detail = item
        
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 1
      this.getList()
    },
    getList(){
      let that = this
      let data = that.pageData
      if(that.manageStatus){
        data.manageStatus = that.manageStatus
      }
      that.loading = true
      getAlarmInfoList(data).then(res=>{
          that.list = res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
        that.loading = false
      })
    },
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  // watch:{
  //   manageStatus(newVal){
  //     if(newVal == '全部'){
  //       this.pageData.manageStatus = null
  //     }else{
  //       this.pageData.manageStatus = newVal
  //     }
  //     this.getList()
  //   }
  // }
}
</script>
<style scoped>
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #d8d8d8;
  margin: 0 auto;
  /* color: #ffffff; */
}

</style>
