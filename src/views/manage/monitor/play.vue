<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">实时监控-视频播放页面</p>
    </header>
    <main class="content-main">
      <div class="flex-start mb20">
        <div>
          <label class="filter-label">播放地址：</label>
          <el-select
            v-model="playUrl"
            filterable
            remote
            @change="changeAddress"
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="changeMonitor"
            :loading="loading"
          >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.name"
              :value="item.videoUrl"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="video-box">
        <video id="test_video" controls autoplay></video>
      </div>
    </main>
  </div>
</template>
<script>
import {getMonitorList} from '@/api/monitor/index'
import Tools from '@/utils/tools';

export default {
  name: "",
  components: {},
  data() {
    return {
      value: null,
      // playerLists: [],
      // videoLists: [],
      playerRTSP:null,
      playUrl:null,
      loading:false,
      list:[],
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:20,
      }
    };
  },
  created() {},
  mounted() {
    // this.streamedian("test_video");
    this.getList()
  },
  destroyed(){
    console.log('销毁')
    Tools.destroyRTSP(this)
  },
  methods: {
    changeMonitor(val){
      this.pageData.keyword = val
      this.getList()
    },
    changeAddress(val){
      if(this.playerRTSP){
        Tools.destroyRTSP(this)
      }
      Tools.streamedian("test_video",val,this)
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getMonitorList(data).then(res=>{
          that.list = res.data.dataList
          that.loading = false
          // that.total = res.data.total
      }).catch(error=>{
          that.loading = false
      })
    },
    
  },
};
</script>
<style scoped>
.video-box {
  width: 100%;
  height: 750px;
  /* background: #000000; */
}
.video-box video {
  width: 100%;
  height: 100%;
}
</style>
