<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">告警中心</p>
    </header>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <alarm-list />
        </el-tab-pane>
        <el-tab-pane label="未处理" name="untreated">
           <alarm-list />
        </el-tab-pane>
        <el-tab-pane label="已处理" name="processed">
           <alarm-list />
        </el-tab-pane>
        <el-tab-pane label="处理中" name="processing">
           <alarm-list />
        </el-tab-pane>
    </el-tabs>
    <alarm-edit />
  </div>
</template>

<script>
import AlarmList from '@/components/AlarmList/index'
import AlarmEdit from '@/components/AlarmEdit/index'

export default {
  name: 'AlarmCenter',
  components: {
    AlarmList,
    AlarmEdit
  },
  data() {
    return {
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
