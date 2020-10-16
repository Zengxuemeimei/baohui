<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">告警中心</p>
    </header>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <AlarmList :riskType="riskType" />
        </el-tab-pane>
        <el-tab-pane label="未处理" name="untreated">
           <AlarmList riskType="untreated"/>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="processed">
           <AlarmList :riskType="riskType"/>
        </el-tab-pane>
        <el-tab-pane label="处理中" name="processing">
           <AlarmList :riskType="riskType"/>
        </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import AlarmList from '@/components/AlarmList/index'


export default {
  name: 'AlarmCenter',
  components: {
    AlarmList
  },
  data() {
    return {
      riskType:null,
      activeName2:"all"
      } 
  },
  created() {
  },
  mounted() {
  },
  methods: {
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
