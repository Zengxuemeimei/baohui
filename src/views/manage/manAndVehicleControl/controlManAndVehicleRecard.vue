<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">布控人车出入记录</p>
    </header>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="人员出入记录" name="person">
            <TemporaryAccessList />
        </el-tab-pane>
        <el-tab-pane label="车辆出入记录" name="car">
            <TemporaryAccessList />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import TemporaryAccessList from '@/components/TemporaryAccessList/index'
export default {
  name: 'ControlManRecard',
  components: {
      TemporaryAccessList
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
