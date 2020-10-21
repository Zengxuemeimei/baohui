<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">告警中心</p>
    </header>
    <el-tabs v-model="alarmStatus" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <AlarmList :manageStatus="manageStatus" />
        </el-tab-pane>
        <el-tab-pane :label="item.name" :name="item.code" v-for="item in alarmStatusList" :key="item.code">
           <AlarmList :manageStatus="manageStatus"/>
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
       alarmStatus:'all'
      } 
  },
  created() {
  },
  mounted() {
    this.getAlarmStatusList()
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    getAlarmStatusList(){
      let data = {}
      data.type = "告警状态"
      getDictionaryList(data).then(res=>{
            this.alarmStatusList = res.data
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
