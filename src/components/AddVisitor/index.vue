<template>
  <div>
      <el-dialog
        title="新增访客"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">访客基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>姓名</th>
                    <td></td>
                    <th>身份证号</th>
                    <td></td>
                    <th>常用电话</th>
                    <td></td>
                </tr>
                <tr>
                    <th>访问时间</th>
                    <td></td>
                    <th>离开时间</th>
                    <td></td>
                    <th>访问对象</th>
                    <td></td>
                </tr>
            </table>
            <div class="camera_outer ml50 flex-start flex-end">
                <video id="videoCamera" class="mr20" :width="videoWidth" :height="videoHeight" autoplay></video>
                <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                <i class="el-icon-camera take-photo" @click="setImage"/>
                <div class="img_bg_camera flex-start flex-end ml20">
                    <img :src="imgSrc" alt class="tx_img" />
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddVisitor',
  data() {
    return {
        videoWidth:350,
        videoHeight:250,
        imgSrc:null,
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo:false,
        dialogVisible:false
    }
  },
  created() {
      
  },
  mounted() {
    let that = this
    that.$nextTick(function(){     
        that.getCompetence()
    });
      
  },
  methods: {
      handleClose(done) {
        this.dialogVisible = false
      },
      getCompetence() {
      //打开摄像头
      console.log('调用摄像头')
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      console.log('_this.thisCancas',_this.thisCancas)
      _this.thisContext = _this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
      setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;//赋值并预览图片
      },
  }
}
</script>
<style scoped>
#videoCamera{
    background: #C1E9FC;
}
.tx_img{
    width:350px;
    height: 250px;
    background: #C1E9FC;
    border: none;
}
.take-photo{
    font-size: 60px;
    cursor: pointer;
}
</style>
