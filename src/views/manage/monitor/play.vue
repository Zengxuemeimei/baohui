<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">实时监控-视频播放页面</p>
    </header>
    <main class="content-main">
        <div class="flex-start mb20">
          <div>
            <label class="filter-label">播放地址：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="video-box">

        </div>
    </main>
  </div>
</template>

<script>

export default {
  name: '',
  components: {},
  data() {
    return {

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
.video-box{
    width: 100%;
    height: 750px;
    background: #000000;
}
</style>
