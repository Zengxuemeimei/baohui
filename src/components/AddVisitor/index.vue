<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="1284px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="person-content" style="height:auto;">
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
        <el-button type="primary" @click="AddVisitor" :loading="loading">确 定</el-button>
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
      loading:false,
      title:'新增访客',
      visitorInfo: {
        idNumber: '',
        image: '',
        intervieweeName: '',
        leaveTime: '',
        mobile: '',
        name: '',
        visitTime: '',
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
    empty(){
      this.visitorInfo={
        idNumber: '',
        image: '',
        intervieweeName: '',
        leaveTime: '',
        mobile: '',
        name: '',
        visitTime: '',
      }
      this.imgSrc=null
       this.title = "新增访客"
    },
    AddVisitor() {
      let that = this;
      let data = that.visitorInfo;
      let fd = new FormData()
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
      if(Tools.isEmpty(data.leaveTime)){
        that.$message({
            message: '请选择离开时间',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.visitTime)){
        that.$message({
            message: '请选择访问时间',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.name)){
        that.$message({
            message: '请输入访客姓名',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.intervieweeName)){
        that.$message({
            message: '请输入访问对象',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.image)){
          that.$message({
              message: '请拍摄头像',
              type: 'warning'
          });
          return
        }
      data.leaveTime = moment(data.leaveTime).format('YYYY-MM-DD HH:mm:ss')
      data.visitTime = moment(data.visitTime).format('YYYY-MM-DD HH:mm:ss')
      fd.append('idNumber',data.idNumber)
      fd.append('intervieweeName',data.intervieweeName)
      fd.append('leaveTime',data.leaveTime)
      fd.append('imgFile',data.image)
      fd.append('mobile',data.mobile)
      fd.append('name',data.name)
      fd.append('visitTime',data.visitTime)
      that.loading = true
      saveOrUpdate(fd).then((res) => {
        that.$message({
            message: '新增访客成功，请到审核页面查看',
            type: 'success'
        });
        that.loading = false
         this.$emit("close", { isShow: false, isSuccess: true });
         this.empty()
      }).catch(error=>{
        that.loading = false
      })
    }, 
    setImage() {
      this.visitorInfo.image = Tools.takePhoto(this)
    }, 
  },
  watch: {
    isShow(newVal) {
      if (newVal) {
        let that = this;
        if(!this.isDetail){
            that.$nextTick(() => {
              Tools.getCompetence(this,'videoCamera','canvasCamera')
            });
        } 
      }
    },
    isDetail(newVal){
        if(newVal){
          this.title = "访客信息"
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

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  border: none;
}
</style>
