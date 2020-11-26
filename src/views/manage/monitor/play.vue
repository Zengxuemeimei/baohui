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
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="video-box">
        <video id="test_video" controls autoplay>
        </video>
        <div class="progressV">
          <input type="range" class="timeLine" min="0" max="100" value="100" style="width:100%;">
          <div class="timeFloat">{{progressTime}}</div>
        </div>
        <!-- <div class="videoContent"></div> -->
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
      progressTime:null,
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
      // if(this.playerRTSP){
      //   Tools.destroyRTSP(this)
      // }
      this.list.forEach(el=>{
        if(el.id == val){
          // let url = 'rtsp://admin:zzxy2009@jtht.tpddns.cn:9683/Streaming/Channels/102'
            Tools.streamedian("test_video",el.videoUrl,this)
            // Tools.streamedian("test_video",url,this)
        }
      }) 
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getMonitorList(data).then(res=>{
          that.list = res.data.dataList
          Tools.streamedian("test_video",url,this)
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
  position: relative;
}
.video-box video {
  width: 100%;
  height: 100%;
}
video::-webkit-media-controls-timeline {
    /*display: none;*/
    visibility: hidden !important;
}
.progressV{
  display: none;
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 100%;
}
.video-box:hover .progressV{
  display: block;
}
.timeFloat{
  line-height: 30px;
  padding: 0 5px;
  border-radius: 2px;
  white-space: nowrap;
  background: #fff;
  position: absolute;
  left: 30px;
  top: -30px;
}
</style>
