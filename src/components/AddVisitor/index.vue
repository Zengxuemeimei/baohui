<template>
  <div>
    <el-dialog
      title="新增访客"
      :visible.sync="isShow"
      width="1284px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="person-content">
        <span class="person-info-title">访客基本信息</span>
        <table class="person-table mb40 ml50" border="1">
          <tr>
            <th>姓名</th>
            <td style="width:200px">
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="visitorInfo.name"
              />
            </td>
            <th>身份证号</th>
            <td style="width:200px">
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="visitorInfo.idNumber"
              />
            </td>
            <th>常用电话</th>
            <td>
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="visitorInfo.mobile"
              />
            </td>
          </tr>
          <tr>
            <th>访问时间</th>
            <td>
              <el-date-picker
              :disabled="isDetail"
                v-model="visitorInfo.visitTime"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </td>
            <th>离开时间</th>
            <td>
              <el-date-picker
              :disabled="isDetail"
                v-model="visitorInfo.leaveTime"
                type="datetime"
                placeholder="选择日期"
              >
              </el-date-picker>
            </td>
            <th>访问对象</th>
            <td>
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="visitorInfo.intervieweeName"
              />
            </td>
          </tr>
        </table>
        <div class="camera_outer ml50 flex-start flex-end">
          <video
            v-if="!isDetail"
            id="videoCamera"
            class="mr20"
            :width="videoWidth"
            :height="videoHeight"
            autoplay
          ></video>
          <canvas
            style="display: none"
            id="canvasCamera"
            :width="videoWidth"
            :height="videoHeight"
          ></canvas>
          <i class="el-icon-camera take-photo" @click="setImage" v-if="!isDetail"/>
          <div class="img_bg_camera flex-start flex-end ml20">
            <!-- <img :src="imgSrc" alt class="tx_img" @error="defaultBackImg"/> -->
              <el-image 
                  style="width:350px;height:250px"
                    fit="cover"
                    :src="imgSrc">
                    <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                      <i class="el-icon-picture-outline f30"></i>
                      <span class="mt10" >{{imgSrc?'加载失败':'拍摄照片'}}</span>
                      <!-- <span class="mt10" v-show="!imgSrc">拍摄照片</span> -->
                    </div>
                </el-image>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!isDetail">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="AddVisitor">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdate } from "@/api/visitor/index";
import moment from 'moment'
import Tools from '@/utils/tools';

export default {
  name: "AddVisitor",
  props: {
    isShow: {
      type: Boolean,
    },
    isEdit: {
      type: Boolean,
    },
    isDetail:{
      type:Boolean
    },
    editDetail: {
      type: Object,
    },
  },
  data() {
    return {
      videoWidth: 350,
      videoHeight: 250,
      imgSrc: null,
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      visitorInfo: {
        idNumber: null,
        image: null,
        intervieweeName: null,
        leaveTime: null,
        mobile: null,
        name: null,
        visitTime: null,
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit("close", { isShow: false, isSuccess: false });
      this.empty()
    },
     defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
    empty(){
      this.visitorInfo={
        idNumber: null,
        image: null,
        intervieweeName: null,
        leaveTime: null,
        mobile: null,
        name: null,
        visitTime: null,
      }
      this.imgSrc=null
    },
    AddVisitor() {
      let that = this;
      let data = that.visitorInfo;
      let fd = new FormData()
      data.leaveTime = moment(data.leaveTime).format('YYYY-MM-DD hh:mm:ss')
      data.visitTime = moment(data.visitTime).format('YYYY-MM-DD hh:mm:ss')
      if(!Tools.isPhone(data.mobile)){
        that.$message({
            message: '电话号码格式不正确',
            type: 'warning'
        });
        return
      }
      if(!Tools.verifyID(data.idNumber)){
        that.$message({
            message: '身份证号码格式不正确',
            type: 'warning'
        });
        return
      }
      fd.append('idNumber',data.idNumber)
      fd.append('imgFile',data.image)
      fd.append('intervieweeName',data.intervieweeName)
      fd.append('leaveTime',data.leaveTime)
      fd.append('mobile',data.mobile)
      fd.append('name',data.name)
      fd.append('visitTime',data.visitTime)
      saveOrUpdate(fd).then((res) => {
         this.$emit("close", { isShow: false, isSuccess: true });
         this.empty()
      });
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      //转换成file对象
      return new File([u8arr], filename, { type: mime });
      //转换成成blob对象
      //return new Blob([u8arr],{type:mime});
    },
    getCompetence() {
      //打开摄像头
      console.log("调用摄像头");
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      console.log("_this.thisCancas", _this.thisCancas);
      _this.thisContext = _this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
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
      _this.imgSrc = image; //赋值并预览图片
      _this.visitorInfo.image = _this.dataURLtoFile(image,'file')
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
  },
  watch: {
    isShow(newVal) {
      if (newVal) {
        let that = this;
        if(!this.isDetail){
            that.$nextTick(() => {
              that.getCompetence();
            });
        } 
      } else {
        // if(this.isDetail){
        //   this.stopNavigator();
        // }
      }
    },
    editDetail(newVal){
      if(newVal){
        this.visitorInfo={
          idNumber: newVal.idNumber,
          intervieweeName:  newVal.intervieweeName,
          leaveTime:  newVal.leaveTime,
          mobile:  newVal.mobile,
          name:  newVal.name,
          visitTime:  newVal.visitTime,
          id:newVal.id
        }
        this.imgSrc= newVal.image
      }
    }
  },
};
</script>
<style scoped>
#videoCamera {
  background: #edeeee;
}
/* .tx_img {
  width: 350px;
  height: 250px;
  background: #c1e9fc;
  border: none;
} */
.img_bg_camera{
  background: #edeeee;
}
.take-photo {
  font-size: 60px;
  cursor: pointer;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  border: none;
}
</style>
