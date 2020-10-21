<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">临时人员-车辆</p>
    </header>
    <el-tabs v-model="activeName2" type="card" >
        <el-tab-pane label="临时人员" name="person">
            <TemporaryList controlType='人员'/>
        </el-tab-pane>
        <el-tab-pane label="临时车辆" name="car">
            <TemporaryList controlType='车辆'/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import TemporaryList from '@/components/TemporaryList/index'
export default {
  name: 'TemporaryMan',
  components: {
      TemporaryList
  },
  data() {
    return {
        activeName2:"person"
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

</style>
