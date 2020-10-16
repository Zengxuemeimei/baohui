<template>
  <div>
      <el-dialog
        title="新增客户"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>姓名</th>
                    <td>
                      <input type="text" class="input-form" v-model="customerInfo.name">
                    </td>
                    <th>身份证号</th>
                    <td>
                      <input type="text" class="input-form" v-model="customerInfo.idNumber">
                    </td>
                    <th>常用电话</th>
                    <td style="width:300px">
                      <input type="text" class="input-form" v-model="customerInfo.mobile">
                    </td>
                </tr>
                <tr>
                    <th>所属公司名称</th>
                    <td colspan="5">
                      <input type="text" class="input-form" v-model="customerInfo.customerEnterpriseName">
                    </td>
                </tr>
            </table>
            <div class="camera_outer mb40 ml50 flex-start flex-end">
                <video id="videoCamera" class="mr20" :width="videoWidth" :height="videoHeight" autoplay></video>
                <canvas style="display:none;" ref="canvas" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                <i class="el-icon-camera take-photo" @click="setImage"/>
                <div class="img_bg_camera flex-start flex-end ml20">
                    <img :src="customerInfo.photoUrl" alt class="tx_img" />
                </div>
            </div>
            <span class="person-info-title">车辆信息</span>
            <div class="ml50">
                <el-button type="text" ><i class="el-icon-circle-plus-outline" /><span style="display:inline-block;margin-left:10px">新增车辆</span> </el-button>
            </div>
            <table class="person-table person-car-table ml50" border="1">
                <tr v-for="item in customerInfo.customerCarInfos" :key="item.carNumber">
                    <th>车牌号</th>
                    <td>
                      <input type="text" class="input-form" v-model="item.carNumber">
                    </td>
                    <th>车辆类型</th>
                    <td>
                      <input type="text" class="input-form" v-model="item.carType">
                    </td>
                </tr>
            </table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addCustomer">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/customer'
import moment from 'moment'

export default {
  name: 'AddCustomer',
  components: {},
  props:{
    isShow:{
      type:Boolean
    },
    isEdit:{
      type:Boolean
    },
    editDetail:{
      type:Object
    },
  },
  data() {
    return {
        videoWidth:350,
        videoHeight:250,
        imgSrc:null,
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo:false,
        customerInfo:{
          customerCarInfos: [
            {
              carColour: null,
              carNumber: null,
              carType: null
            }
          ],
          mobile:null,
          idNumber: null,
          name: null,
          photoUrl: null,
        },
        dialogVisible:true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
        this.$emit('close',{isShow:false,isSuccess:false})
    },
    addCustomer(){
      let that = this
      let data = that.customerInfo
      if(that.isEdit){
        data.updateTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      }else{
         data.creatTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      }
      that.loading = true
        saveOrUpdate(data).then(res=>{
          that.loading = false
          if(that.isEdit){
                that.$message({
                    message: '添加客户成功',
                    type: 'success'
                });
            }else{
                that.$message({
                    message: '编辑客户成功',
                    type: 'success'
                });
          }
          that.$emit('close',{isShow:false,isSuccess:true})
        }).catch(error=>{
          that.loading = false
        })
    },
    getCompetence() {
      //打开摄像头
      console.log('调用摄像头',navigator.mediaDevices)
      var _this = this;
       _this.thisCancas = document.getElementById("canvasCamera");
      // console.log('_this.thisCancas',_this.thisCancas)
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
        .then((stream)=> {
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
      _this.customerInfo.photoUrl = image
      console.log('image',image)
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    }
  },
  watch:{
    isShow(newVal){
      if(newVal){
        let that = this
        that.$nextTick(()=>{
            that.getCompetence()
        });

      }else{
        this.stopNavigator()
      }
    }
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
