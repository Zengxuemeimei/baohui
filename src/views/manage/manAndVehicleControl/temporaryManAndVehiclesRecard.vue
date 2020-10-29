<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">临时人车出入记录</p>
    </header>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员出入记录" name="person">
            <TemporaryAccessList  :temporary="activeName2"/>
        </el-tab-pane>
        <el-tab-pane label="车辆出入记录" name="car">
            <TemporaryAccessList  :temporary="activeName2"/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import TemporaryAccessList from '@/components/TemporaryAccessList/index'
export default {
  name: 'TemporaryManRecard',
  components: {
      TemporaryAccessList
  },
  data() {
    return {
        activeName2:"person",
        temporary:false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClick(){

    }
  }
}
</script>
<style scoped>

</style>
