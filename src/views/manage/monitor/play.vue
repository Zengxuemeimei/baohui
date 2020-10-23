<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">实时监控-视频播放页面</p>
    </header>
    <main class="content-main">
      <div class="flex-start mb20">
        <div>
          <label class="filter-label">播放地址：</label>
          <!-- <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
        </div>
      </div>
      <div class="video-box">
        <video id="test_video" controls autoplay></video>
      </div>
    </main>
  </div>
</template>

<script>
// streamedian('test_video')
</script>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      value: null,
      playerLists: [],
      videoLists: [],
    };
  },
  created() {},
  mounted() {
    this.streamedian("test_video");
  },
  methods: {
    streamedian(Vid, url) {
      url =
        "rtsp://admin:abcdef00@hlstest.tpddns.cn:10554/Streaming/Channels/102";
      let errHandler = function (err) {
        console.log("errHandler", err.message);
      };

      var playerOptions = {
        socket: "ws://148.70.230.200:9640/ws/",
        redirectNativeMediaErrors: true,
        bufferDuration: 30,
        errorHandler: errHandler,
        // infoHandler: infHandler
      };

      var html5Player = document.getElementById(Vid);
      html5Player.src = url;
      var player = Streamedian.player(Vid, playerOptions);
      var nativePlayer = document.getElementById(Vid);
      nativePlayer.addEventListener("play", function () {
        //监听播放
        console.log("开始播放");
        console.log(nativePlayer.currentTime, nativePlayer.buffered.end(0));
        setTimeout(function () {
          nativePlayer.currentTime = nativePlayer.buffered.end(0);
        }, 500);
      });
      if (!!window.chrome) {
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "hidden") {
            console.log("————————————————");
            console.log(document.visibilityState);
            // console.log(me.state.playerId);
            console.log(this.videoLists);
            console.log(player);
            console.log("————————————————");
            for (i of this.videoLists) {
              i.pause();
            }
            nativePlayer.pause();
          } else {
            for (i of this.videoLists) {
              i.play();
            }
            // Automatic jump to buffer end for view live video when returning to the web page.
            setTimeout(function () {
              nativePlayer.currentTime = nativePlayer.buffered.end(0);
            }, 3000); // Delay for a few seconds is required for the player has time to update the timeline.
          }
        });
      }
      // player.destroy();
      // player = null;
      // html5Player.src = url;
      // player = Streamedian.player(me.state.playerId, playerOptions);
      this.playerLists.push(player);
      this.videoLists.push(nativePlayer);
      // console.log("————————————————");
      // console.log(me.state.playerList);
      // console.log("————————————————");
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
.video-box  video{
  width: 100%;
  height: 100%;
}
</style>
