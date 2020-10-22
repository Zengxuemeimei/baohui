<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">告警中心</p>
    </header>
    <el-tabs v-model="alarmStatus" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="全部">
          <AlarmList :alarmStatusList="alarmStatusList"  :staffList="staffList" :alarmTypeList="alarmTypeList"/>
        </el-tab-pane>
        <el-tab-pane :label="item.name" :name="item.name" v-for="item in alarmStatusList" :key="item.code">
           <AlarmList :alarmStatusList="alarmStatusList" :manageStatus="item.name" :staffList="staffList" :alarmTypeList="alarmTypeList"/>
        </el-tab-pane>
        <!-- <el-tab-pane label="已处理" name="processed">
           <AlarmList :manageStatus="manageStatus"/>
        </el-tab-pane>
        <el-tab-pane label="处理中" name="processing">
           <AlarmList :manageStatus="manageStatus"/>
        </el-tab-pane> -->
    </el-tabs>
    
  </div>
</template>

<script>
import AlarmList from '@/components/AlarmList/index'
import {getDictionaryList} from '@/api/dictionary'
import {getStaffList} from '@/api/staff/index'

export default {
  name: 'AlarmCenter',
  components: {
    AlarmList
  },
  data() {
    return {
      riskType:null,
      manageStatus:null,
      alarmStatusList:[],
      alarmTypeList:[],
       alarmStatus:'全部',
       staffList:[],
       pageData:{
            keyword:null,
            pageIndex:1
        },
      } 
  },
  created() {
  },
  mounted() {
    this.getAlarmStatusList()
    this.getAlarmTypeList()
    this.getStaffList()
  },
  methods: {
    handleClick(tab) {
        console.log(tab.name);
    },
    getAlarmStatusList(){
      let data = {}
      data.type = "告警状态"
      getDictionaryList(data).then(res=>{
            this.alarmStatusList = res.data
        })
    },
    getAlarmTypeList(){
      let data = {}
      data.type = "告警类型"
      getDictionaryList(data).then(res=>{
            this.alarmTypeList = res.data
        })
    },
    getStaffList(){
        let that = this
        let data = this.pageData
        getStaffList(data).then(res=>{
            let {dataList} =res.data
            dataList.forEach((el,index)=>{
                dataList[index].value = el.name
            })
            that.staffList = dataList
        })
    },
    
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
