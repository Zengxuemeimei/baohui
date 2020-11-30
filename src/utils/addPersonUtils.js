const Tools = require("./tools");
import moment from "moment";
import { saveOrUpdate } from "@/api/staff/index";
// const AddPersonUtils={}

export function addPersonUtils(that){
    // if (!Tools.isPhone(that.personInfo.emergencyContactMobile)) {
    //     that.$message({
    //       message: "紧急联系人电话号码格式不正确",
    //       type: "warning",
    //     });
    //     return;
    //   }
      if (!Tools.isPhone(that.personInfo.mobileNumber)) {
        that.$message({
          message: "电话号码格式不正确",
          type: "warning",
        });
        return;
      }
      if (Tools.isEmpty(that.personInfo.name)) {
          that.$message({
            message: "姓名不能为空",
            type: "warning",
          });
        return;
      }
      if (Tools.isEmpty(that.personInfo.age)) {
          that.$message({
            message: "年龄不能为空",
            type: "warning",
          });
        return;
      }
      if (Tools.isEmpty(that.personInfo.departmentId)) {
        that.$message({
          message: "部门不能为空",
          type: "warning",
        });
      return;
    }
      if (that.personInfo.entryTime) {
        that.personInfo.entryTime = moment(that.personInfo.entryTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }else{
        that.personInfo.entryTime = ""
      }
      if (that.personInfo.expireTime) {
        that.personInfo.expireTime = moment(that.personInfo.expireTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }else{
        that.personInfo.expireTime = ""
      }

      if (that.personInfo.quitTime) {
        that.personInfo.quitTime = moment(that.personInfo.quitTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }else{
        that.personInfo.quitTime = ""
      }
      if (that.personInfo.formalTime) {
        that.personInfo.formalTime = moment(that.personInfo.formalTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }else{
        that.personInfo.formalTime = ""
      }
      let fd = new FormData();
      let data = that.personInfo;
      if(that.isEdit){
         fd.append("id", data.id);
      }
      fd.append("contractScanning", data.contractScanning);
      fd.append("departmentId", data.departmentId);
      fd.append("education", data.education);
      fd.append("email", data.email);
      fd.append("emergencyContact", data.emergencyContact);
      fd.append("emergencyContactMobile", data.emergencyContactMobile);
      fd.append("entryTime", data.entryTime);
      fd.append("expireTime", data.expireTime);
      fd.append("quitTime", data.quitTime);
      fd.append("formalTime", data.formalTime);
      fd.append("homeAddress", data.homeAddress);
      fd.append("idNumberScanning", data.idNumberScanning);
      fd.append("major", data.major);
      fd.append("mobileNumber", data.mobileNumber);
      fd.append("name", data.name);
      fd.append("age", data.age);
      if(that.fileUrl.length > 0){
        let flag = false
        that.fileUrl.forEach((el, index) => {
          if(Tools.beforeAvatarUpload(el.raw)){
            fd.append(`fileUrlFile`,el.raw);
          }else{
            flag = true
          }
        });
        if(flag){
          that.$message({
            message: '上传图片格式不支持,请检查',
            type: 'warning'
          });
          return
        }
      }
      fd.append("position", data.position);
      fd.append("sex", data.sex);
      if(that.isEdit){
        data.staffCarInfoList.forEach(el=>{
            delete el.creatTime
            delete el.staffId
        })
      }
      fd.append("staffCarInfos", JSON.stringify(data.staffCarInfoList));
      if(data.faceImageFile){
        fd.append("faceImageFile", data.faceImageFile);
      }
      if(that.carList.length > 0){
        let isPic = false
          that.carList.forEach((el, index) => {
            if(el.file){
              if(Tools.beforeAvatarUpload(el.file)){
                fd.append('staffCar', el.file);
              }else{
                isPic = true
              }
            }  
          });
          if(isPic){
            that.$message({
              message: '上传图片格式不支持,请检查',
              type: 'warning'
            });
            return
          }
      }
      that.loading = true;
      saveOrUpdate(fd)
        .then((res) => {
          that.loading = false;
          if (that.isEdit) {
            that.$message({
              message: "编辑人员成功",
              type: "success",
            });
          } else {
            that.$message({
              message: "添加人员成功",
              type: "success",
            });
          }
          that.$emit("close", { isShow: false, isSuccess: true });
          that.empty()
        })
        .catch((error) => {
          that.loading = false;
        });
}
export function emptyUtils(that){

  that.fileUrl = [];
  that.carIndex = 0;
  that.fileEditUrl = []
  that.carList = [
    {
      carNumber: null,
      carImage: null,
      file: null,
    },
  ];
  that.imgSrc = ""
  that.personInfo = {
    contractScanning: '', //合同
    departmentId: '',
    education: '',
    email: '',
    emergencyContact: '', //紧急联系人
    emergencyContactMobile: "",
    entryTime: '',
    expireTime: '', //过期
    quitTime: '',
    faceImage: '',
    formalTime: '', //转正
    homeAddress: '', //住址
    idNumberScanning: '',
    major: '', //专业
    mobileNumber: '',
    name: '',
    age: '',
    fileUrl: [],
    position: '',
    sex: true,
    staffCarInfoList: [
      {
        carNumber: '',
        carType: '',
      },
    ],
  };
}