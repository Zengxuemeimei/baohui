<template>
  <div>
    <el-dialog
      title="新增客户"
      :visible.sync="isShow"
      width="1284px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="person-content">
        <el-scrollbar style="height:100%">
        <span class="person-info-title">基本信息</span>
        <table class="person-table mb40 ml50" border="1">
          <tr>
            <th>姓名</th>
            <td>
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="customerInfo.name"
              />
            </td>
            <th>身份证号</th>
            <td style="width: 300px">
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="customerInfo.idNumber"
              />
            </td>
            <th>常用电话</th>
            <td>
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="customerInfo.mobile"
              />
            </td>
          </tr>
          <tr>
            <th>所属公司名称</th>
            <td colspan="5">
              <input
                type="text"
                class="input-form"
                :disabled="isDetail"
                v-model="customerInfo.customerEnterpriseName"
              />
            </td>
          </tr>
        </table>
        <div class="camera_outer mb40 ml50 flex-start flex-end">
          <div class="upload-img-box mr20 " v-show="isEdit || isDetail ">
              <el-image
                style="width: 148px; height: 148px"
                  :src="customerInfo.photoUrl"
                  fit="cover">
                  <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                      <i class="el-icon-picture-outline f30"></i>
                      <span class="mt10">加载失败</span>
                    </div>
                </el-image>
          </div>
          <el-upload
          v-if="!isDetail"
            action="http://192.168.1.103:9092/file/upload/customer"
            list-type="picture-card"
            accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
            :headers="token"
            ref="uploadImg"
            :on-success="uploadCustomer">
            <span>上传资料</span>
          </el-upload>
          <!-- <video id="videoCamera" class="mr20" :width="videoWidth" :height="videoHeight" autoplay></video>
                <canvas style="display:none;" ref="canvas" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                <i class="el-icon-camera take-photo" @click="setImage"/>
                <div class="img_bg_camera flex-start flex-end ml20">
                    <img :src="customerInfo.photoUrl" alt class="tx_img" />
                </div> -->
        </div>
        <span class="person-info-title">车辆信息</span>
        <div class="ml50">
          <el-button type="text" @click="addCar"
            ><i class="el-icon-circle-plus-outline" /><span
              style="display: inline-block; margin-left: 10px"
              >新增车辆</span
            >
          </el-button>
        </div>
        <table class="person-table person-car-table ml50" border="1">
          <tr
            v-for="(item,index) in customerInfo.customerCarInfos"
            :key="item.carNumber">
            <th>车牌号</th>
            <td class="relative">
              <input type="text" disabled class="input-form" v-model="item.carNumber" />
              <LicenseKeyboard v-if="!isDetail" v-model="item.carNumber" title="软键盘" />
            </td>
            <th>车辆类型</th>
            <td>
              <!-- <input type="text" class="input-form" v-model="item.carType"> -->
              <el-select clearable v-model="item.carType" :disabled="isDetail" placeholder="请选择">
                <DictionarySelect :list="carTypeList" />
              </el-select>
            </td>
            <th v-if="customerInfo.customerCarInfos.length >1 && !isDetail">操作</th>
            <td v-if="customerInfo.customerCarInfos.length >1 && !isDetail">
              <el-button type="danger" size="small"  @click="deleteCar(index)">删除</el-button>
            </td>
          </tr>
        </table>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!isDetail">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdate } from "@/api/customer";
import DictionarySelect from "@/components/Recursion/dictionarySelect";
import moment from "moment";
import store from '@/store'
import Tools from '@/utils/tools';

export default {
  name: "AddCustomer",
  components: { DictionarySelect },
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
    carTypeList: {
      type: Array,
    },
  },
  data() {
    return {
      token:{
            Authorization:store.getters.token
      },
      videoWidth: 350,
      videoHeight: 250,
      imgSrc: null,
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      customerInfo: {
        customerCarInfos: [
          {
            carColour: null,
            carNumber: null,
            carType: null,
          },
        ],
        mobile: null,
        idNumber: null,
        name: null,
        photoUrl: null,
      },
      photoUrl:[],
    };
  },
  created() {},
  mounted() {},
  methods: {
    deleteCar(index){
          this.customerInfo.customerCarInfos.splice(index,1)
      },
    defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
    handleClose(done) {
      this.empty()
      if(!this.isDetail){
      this.$refs.uploadImg.clearFiles()

      }
      this.$emit("close", { isShow: false, isSuccess: false });
    },
    addCar(){
        this.customerInfo.customerCarInfos.push({
            carColour: null,
            carNumber: null,
            carType: null,
        })
    },
    empty(){
      this.customerInfo= {
        customerCarInfos: [
          {
            carColour: null,
            carNumber: null,
            carType: null,
          },
        ],
        mobile: null,
        idNumber: null,
        name: null,
        photoUrl: null,
      }
      this.photoUrl=[]
    },
    addCustomer() {
      let that = this;
      let data = that.customerInfo;
      if(!Tools.isPhone(data.mobile)){
        that.$message({
              message: "电话格式不正确",
              type: "warning",
            });
        return
      }
      if(!Tools.verifyID(data.idNumber)){
        that.$message({
              message: "身份证格式不正确",
              type: "warning",
            });
        return
      }
      if (that.isEdit) {
        data.updateTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      } else {
        data.creatTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      }
      this.customerInfo.photoUrl = this.photoUrl.toString()
      that.loading = true;
      saveOrUpdate(data)
        .then((res) => {
          that.loading = false;
          if (that.isEdit) {
            that.$message({
              message: "编辑客户成功",
              type: "success",
            });
          } else {
            that.$message({
              message: "添加客户成功",
              type: "success",
            });
          }
          
          that.$emit("close", { isShow: false, isSuccess: true });
          that.empty()
        })
        .catch((error) => {
          that.loading = false;
        });
    },
    uploadCustomer(file){
      this.photoUrl.push(file[0]) ;
    },
    getCompetence() {
      //打开摄像头
      console.log("调用摄像头", navigator.mediaDevices);
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      // console.log('_this.thisCancas',_this.thisCancas)
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
        .then((stream) => {
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
      _this.customerInfo.photoUrl = image;
      console.log("image", image);
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
  },
  watch: {
    editDetail(newVal){
      if(newVal){
        this.customerInfo = newVal
      }
    }
    // isShow(newVal) {
    //   if (newVal) {
    //     let that = this;
    //     that.$nextTick(() => {
    //       that.getCompetence();
    //     });
    //   } else {
    //     this.stopNavigator();
    //   }
    // },
  },
};
</script>
<style scoped>
#videoCamera {
  background: #c1e9fc;
}
.tx_img {
  width: 350px;
  height: 250px;
  background: #c1e9fc;
  border: none;
}
.take-photo {
  font-size: 60px;
  cursor: pointer;
}
</style>
