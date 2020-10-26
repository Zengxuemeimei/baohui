<template>
  <div>
    <el-dialog
      :title="title"
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
          <div class="upload-img-box mr20 " v-show="isEdit || isDetail " v-for="item in photoEditUrl" :key="item">
              <el-image
                style="width: 148px; height: 148px"
                  :src="item"
                  fit="cover">
                  <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                      <i class="el-icon-picture-outline f30"></i>
                      <span class="mt10">加载失败</span>
                    </div>
                </el-image>
          </div>
          <el-upload
            v-if="!isDetail"
            action=""
            :auto-upload="false"
            list-type="picture-card"
            accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
            ref="uploadImg"
            :limit="1"
            :on-remove="removeCustomer"
            :on-change="uploadCustomer">
            <span>上传头像</span>
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
      title:"新增客户",
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
            carColour: '',
            carNumber: '',
            carType: '',
          },
        ],
        customerEnterpriseName:'',
        mobile: '',
        idNumber: '',
        name: '',
        photoUrl: '',
      },
      photoUrl:[],
      photoEditUrl:[]
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
      this.$emit("close", { isShow: false, isSuccess: false });
    },
    addCar(){
        this.customerInfo.customerCarInfos.push({
            carColour: '',
            carNumber: '',
            carType: '',
        })
    },
    empty(){
       if(!this.isDetail){
          this.$refs.uploadImg.clearFiles()
      }
      this.customerInfo= {
        customerCarInfos: [
          {
            carColour: '',
            carNumber: '',
            carType: '',
          },
        ],
        customerEnterpriseName:'',
        mobile: '',
        idNumber: '',
        name: '',
        photoUrl: '',
      }
      this.photoUrl=[],
      this.photoEditUrl=[]
    },
    addCustomer() {
      let that = this;
      let data = that.customerInfo;
      let fd = new FormData()
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
      fd.append('mobile',data.mobile)
      fd.append('idNumber',data.idNumber)
      fd.append('name',data.name)
      fd.append('customerEnterpriseName',data.customerEnterpriseName)
      fd.append('enterpriseId',store.getters.enterpriseId)
      fd.append('customerCarInfoList',JSON.stringify(data.customerCarInfos))
      if(that.photoUrl.length>0){
         that.photoUrl.forEach(el=>{
            fd.append('customerFile',el.raw)
        })
      }
      if(that.isEdit){
          fd.append('id',data.id)
      }
      that.loading = true;
      saveOrUpdate(fd)
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
    uploadCustomer(file,fileList){
      this.photoUrl=fileList;
      console.log('wenjian',fileList)
    },
    removeCustomer(file,fileList){
      this.photoUrl=fileList;
    }
  },
  watch: {
    editDetail(newVal){
      if(newVal){
        this.customerInfo = newVal
        if(newVal.photoUrl){
          this.photoEditUrl = newVal.photoUrl.split(",");
        }
      }
    },
    isEdit(newVal){
      if(newVal){
        this.title = "编辑客户"
      }
    },
    isDetail(newVal){
       if(newVal){
        this.title = "客户详情"
      }
    }
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
