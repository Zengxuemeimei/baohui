<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="1280px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="person-content">
        <el-scrollbar style="height: 100%">
          <span class="person-info-title">人员基本信息</span>
          <table class="person-table mb40 ml50" border="1">
            <tr>
              <th> <span class="red">*</span> 姓名</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.name"
                />
              </td>
              <th><span class="red">*</span> 性别</th>
              <td>
                <el-radio-group :disabled="isDetail" v-model="personInfo.sex">
                  <el-radio :label="true">女</el-radio>
                  <el-radio :label="false">男</el-radio>
                </el-radio-group>
              </td>
              <th><span class="red">*</span> 年龄</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.age"
                />
              </td>
              <th><span class="red">*</span> 联系电话</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.mobileNumber"
                />
              </td>
            </tr>
            <tr>
              <th>学历</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.education"
                />
              </td>
              <th>专业</th>
              <td colspan="3">
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.major"
                />
              </td>
            </tr>
            <tr>
              <th> <span class="red">*</span> 所属部门</th>
              <td>
                <el-select
                  v-model="personInfo.departmentId"
                  :disabled="isDetail"
                  placeholder="请选择">
                  <DepartmentSelect :list="listDepartment" />
                </el-select>
              </td>
              <th>岗位</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.position"
                />
              </td>
              <th>紧急联系人</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.emergencyContact"
                />
              </td>
              <th>联系电话</th>
              <td>
                <input
                  type="text"
                  class="input-form"
                  :disabled="isDetail"
                  v-model="personInfo.emergencyContactMobile"
                />
              </td>
            </tr>
            <tr>
              <th>入职时间</th>
              <td colspan="3">
                <el-date-picker
                  v-model="personInfo.entryTime"
                  :disabled="isDetail"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </td>
              <th>转正时间</th>
              <td colspan="3">
                <el-date-picker
                  v-model="personInfo.formalTime"
                  :disabled="isDetail"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <th>合同到期时间</th>
              <td colspan="3">
                <el-date-picker
                  v-model="personInfo.expireTime"
                  :disabled="isDetail"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </td>
              <th>离职时间</th>
              <td colspan="3">
                <el-date-picker
                  :disabled="!isEdit || isDetail"
                  v-model="personInfo.quitTime"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </td>
            </tr>
          </table>
          <div class="camera_outer ml50 flex-start flex-end mb20">
            <video
                id="videoStaff"
                class="mr20"
                :width="videoWidth"
                :height="videoHeight"
                autoplay
            ></video>
            <canvas
                style="display: none"
                id="canvasStaff"
                :width="videoWidth"
                :height="videoHeight"
            ></canvas>
            <i class="el-icon-camera take-photo" v-show="!isDetail" @click="setImage"/>
            <div class="img_bg_camera flex-start flex-end ml20">
                <el-image 
                    style="width:350px;height:250px"
                        fit="cover"
                        :src="imgSrc">
                        <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                        <i class="el-icon-picture-outline f30"></i>
                        <span class="mt10" >{{imgSrc?'加载失败':'拍摄照片'}}</span>
                        </div>
                    </el-image>
            </div>
            </div>
          <span class="person-info-title">文档资料</span>
          <p class="mb20 ml20 red" v-show="!isDetail">*上传图片支持jpg,png,jpeg格式</p>
          <div class="ml50 mb40">
            <div class="flex-start flex-wrap">
              <div class="upload-img-box mr20 relative"  v-for="item in fileEditUrl" :key="item">
                <el-image 
                    class="upload-img-box "
                        fit="cover"
                        :src="item">
                        <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                        <i class="el-icon-picture-outline f30"></i>
                        <span class="mt10" >{{item?'加载失败':''}}</span>
                        </div>
                </el-image>
              </div>
              <el-upload
                action=""
                multiple
                v-if="!isDetail"
                list-type="picture-card"
                accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
                :headers="token"
                :auto-upload="false"
                :on-change="uploadStaff"
                ref="staff"
                :on-remove="removeStaff">
                <span>上传资料</span>
              </el-upload>
            </div>
          </div>
          <span class="person-info-title">车辆信息</span>
          <p class="mb20 ml20 red" v-show="!isDetail">*上传图片支持jpg,png,jpeg格式 </p> 
          <div class="person-car-info ml50 mb40">
            <div class="flex-start flex-wrap">
              <div v-for="item in carList" :key="item.carNumber">
                <div
                  class="upload-img-box mr20 relative mb20"
                  v-show="item.carImage">
                    <el-image 
                      class="upload-img-box "
                          fit="cover"
                          :src="item.carImage">
                          <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                          <i class="el-icon-picture-outline f30"></i>
                          <span class="mt10" >{{item?'加载失败':''}}</span>
                          </div>
                   </el-image>
                  <p class="car-num">{{ item.carNumber }}</p>
                </div>
              </div>
            </div>
            <el-button v-show="!isDetail" type="text" @click="addCar"
              ><i class="el-icon-circle-plus-outline" /><span
                style="display: inline-block; margin-left: 10px"
                >新增车辆</span
              >
            </el-button>
            <table class="person-table" border="1">
              <tr
                v-for="(item, index) in personInfo.staffCarInfoList"
                :key="item.carNumber"
              >
                <th>车牌号</th>
                <td class="relative">
                  <input
                    type="text"
                    disabled
                    class="input-form"
                    v-model="item.carNumber"
                  />
                  <LicenseKeyboard v-show="!isDetail" v-model="item.carNumber" title="软键盘" />
                </td>
                <th>车辆类型</th>
                <td>
                  <el-select v-model="item.carType" :disabled="isDetail" placeholder="请选择">
                    <DictionarySelect :list="carTypeList" />
                  </el-select>
                </td>
                <th v-show="!isDetail">上传车辆图片</th>
                <td v-show="!isDetail">
                  <el-upload
                    action=""
                    accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
                    :headers="token"
                    :on-change="uploadCar"
                    :show-file-list="false"
                    :auto-upload="false">
                    <el-button
                      size="small"
                      type="primary"
                      @click="uploadCarParent(index, item.carNumber)">点击上传</el-button>
                  </el-upload>
                </td>
                <th v-if="personInfo.staffCarInfoList.length > 1 && !isDetail">操作</th>
                <td v-if="personInfo.staffCarInfoList.length > 1 && !isDetail ">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteCar(index)"
                    >删除</el-button
                  >
                </td>
              </tr>
            </table>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer" v-show="!isDetail">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addPerson" :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DictionarySelect from "@/components/Recursion/dictionarySelect";
import DepartmentSelect from "@/components/Recursion/departmentSelect";
import moment from "moment";
import store from "@/store";
import { uploadFile } from "@/api/upload";
import DictionaryList from "@/components/Recursion/dictionaryList";
import Tools from "@/utils/tools";
import {addPersonUtils,emptyUtils} from "@/utils/addPersonUtils";

export default {
  name: "AddPerson",
  components: { DictionarySelect,DepartmentSelect },
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
    listDepartment: {
      type: Array,
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
      videoWidth: 350,
      videoHeight: 250,
      imgSrc: null,
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      licenseNumber: null,
      token: {
        Authorization: store.getters.token,
      },
      fileUrl: [],
      fileEditUrl:[],
      carList: [
        {
          carNumber: null,
          carImage: null,
          file: null,
        },
      ],
      carIndex: 0,
      personInfo: {
        contractScanning: "", //合同
        departmentId: "",
        education: "",
        email: "",
        emergencyContact: "", //紧急联系人
        emergencyContactMobile: "",
        entryTime: "",
        expireTime: "", //过期
        quitTime: "",
        faceImage: "",
        formalTime: "", //转正
        homeAddress: "", //住址
        idNumberScanning: "",
        major: "", //专业
        mobileNumber: "",
        name: "",
        age: "",
        fileUrl: [],
        position: "",
        sex: true,
        staffCarInfoList: [
          {
            carNumber: "",
            carType: "",
          },
        ],
      },
      loading: false,
      title:'新增人员'
    };
  },
  created() {},
  mounted() {
     
  },
  methods: {
    deleteCar(index) {
      this.personInfo.staffCarInfoList.splice(index, 1);
      this.carList.splice(index,1)
    },
    setImage() {
        this.personInfo.faceImageFile = Tools.takePhoto(this) 
    },
    addPerson() {
      let that = this;
      addPersonUtils(that)
    },
    addCar() {
      this.personInfo.staffCarInfoList.push({
        carImage: null,
        carNumber: null,
        carType: null,
      });
      this.carList.push({
        carNumber: null,
        carImage: null,
        file: null,
      });
    },
    empty() {
      if(this.fileUrl.length > 0){
        this.$refs.staff.clearFiles()
      }
      this.title = '新增人员'
      emptyUtils(this)
    },
    handleClose() {
      this.$emit("close", { isShow: false, isSuccess: false });
      this.empty();

    },
    uploadStaff(file,fileList) {
      this.fileUrl = fileList
    },
    removeStaff(file,fileList){
      this.fileUrl = fileList
      
    },
    uploadCarParent(index, carNumber) {
      this.carIndex = index;
      this.carList[index].carNumber = carNumber;
    },
    uploadCar(file) {
      this.carList[this.carIndex].carImage = URL.createObjectURL(file.raw);
      this.carList[this.carIndex].file = file.raw;
    },
  },
  watch: {
    editDetail(newVal) {
      if (newVal) {
        delete newVal.creatTime;
        delete newVal.status;
        delete newVal.updateTime;
        delete newVal.userId;
        this.personInfo = newVal;
        this.imgSrc = newVal.faceImage
        if(newVal.fileUrl){
          this.fileEditUrl = newVal.fileUrl.split(",");
        }
        let list = [];
        newVal.staffCarInfoList.forEach((el) => {
          list.push({
            carNumber: el.carNumber,
            carImage: el.carImage,
          });
        });
        this.carList = list;
      }
    },
    isEdit(newVal){
      if(newVal){
        this.title = '编辑人员'
      }
    },
    isDetail(newVal){
       if(newVal){
         this.title = '人员详情'
      }
    },
    isShow(newVal){
      if(newVal){
          this.$nextTick(() => {
            Tools.getCompetence(this,'videoStaff','canvasStaff')
          });
      }
        
    }
  },
};
</script>
<style scoped>
.line {
  text-align: center;
}
.person-info-title {
  line-height: 32px;
  padding: 0 16px;
  text-align: center;
  background: #90afda;
  display: inline-block;
  color: #333333;
  margin-bottom: 20px;
}
.person-table {
  border-collapse: collapse;
  /* margin: 0 auto; */
}
.person-table th,
.person-table td {
  width: 128px;
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.person-car-table {
  margin-left: 38px;
}
.person-table .el-button--primary {
  background: #409eff;
  border: none;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  border: none;
}
.car-num {
  width: 100%;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}
#videoStaff{
  background: #efefef;
}
</style>

