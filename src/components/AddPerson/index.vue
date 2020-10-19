<template>
  <div>
      <el-dialog
        title="新增人员"
        :visible.sync="isShow"
        width="1280px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">人员基本信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>姓名</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.name">
                        </td>
                        <th>性别</th>
                        <td>
                            <el-radio-group v-model="personInfo.sex">
                                <el-radio :label="true">女</el-radio>
                                <el-radio :label="false">男</el-radio>
                            </el-radio-group>
                        </td>
                        <th>年龄</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.age">
                        </td>
                        <th>联系电话</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.mobileNumber">
                        </td>
                    </tr>
                    <tr>
                        <th>学历</th>
                        <td colspan="3">
                            <input type="text" class="input-form" v-model="personInfo.education">
                        </td>
                        <th>专业</th>
                        <td colspan="3">
                            <input type="text" class="input-form" v-model="personInfo.major">
                        </td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td>
                            <el-select v-model="personInfo.departmentId" placeholder="请选择">
                                <DepartmentSelect :list="listDepartment"/>
                            </el-select>
                        </td>
                        <th>岗位</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.position">
                        </td>
                        <th>紧急联系人</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.emergencyContact">
                        </td>
                        <th>联系电话</th>
                        <td>
                            <input type="text" class="input-form" v-model="personInfo.emergencyContactMobile">
                        </td>
                    </tr>
                    <tr>
                        <th>入职时间</th>
                        <td colspan="3">
                            <el-date-picker
                                v-model="personInfo.entryTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>转正时间</th>
                        <td colspan="3">
                            <el-date-picker
                                v-model="personInfo.formalTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <th>合同到期时间</th>
                        <td colspan="3">
                            <el-date-picker
                                v-model="personInfo.expireTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>离职时间</th>
                        <td colspan="3">
                            <el-date-picker
                            :disabled="!isEdit"
                                v-model="personInfo.quitTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">文档资料</span>
                <div class="ml50 mb40">
                    <div class="flex-start flex-wrap">
                        <div class="upload-img-box mr20 relative"  v-for="item in fileUrl" :key="item">
                            <img class="upload-img"  :src="item" alt="" @error="defaultBackImg">
                            <!-- <img class="upload-img" src="blob:http://localhost:9528/62acebfa-ccb3-4bd0-9df7-ef7b0f209be2" alt=""> -->
                        </div>
                        <el-upload
                            action="http://192.168.1.103:9092/file/upload/staff"
                            list-type="picture-card"
                            accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
                            :headers="token"
                            :on-success="uploadStaff"
                            :on-remove="handleRemove">
                            <span>上传资料</span>
                        </el-upload>
                    </div>
                    
                </div>
                <span class="person-info-title">车辆信息</span>
                <div class="person-car-info ml50 mb40 ">
                    <div class="flex-start flex-wrap">
                        <div v-for="item in carList" :key="item.carNumber">
                            <div class="upload-img-box mr20 relative mb20" v-show="item.carImage">
                                <img class="upload-img"  :src="item.carImage" @error="defaultBackImg">
                                <p class="car-num">{{item.carNumber}}</p>
                                <!-- <img class="upload-img" src="blob:http://localhost:9528/62acebfa-ccb3-4bd0-9df7-ef7b0f209be2" alt=""> -->
                            </div>
                        </div>
                    </div>
                    <el-button type="text" @click="addCar"><i class="el-icon-circle-plus-outline" /><span style="display:inline-block;margin-left:10px">新增车辆</span> </el-button>
                    <table class="person-table" border="1">
                        <tr v-for="(item,index) in personInfo.staffCarInfoList" :key="item.carNumber">
                            <th>车牌号</th>
                            <td class="relative">
                                <input type="text" disabled class="input-form" v-model="item.carNumber">
                                <LicenseKeyboard v-model="item.carNumber" title="软键盘" />
                            </td>
                            <th>车辆类型</th>
                            <td>
                                 <!-- <input type="text" class="input-form" v-model="item.carType"> -->
                                 <el-select v-model="item.carType" placeholder="请选择">
                                    <!-- <el-option :value="null" label="无父级"></el-option> -->
                                    <DepartmentSelect :list="carTypeList" />
                                </el-select>
                            </td>
                            <th>上传车辆图片</th>
                            <td >
                                 <el-upload
                                        action="http://192.168.1.103:9092/file/upload/cars"
                                        :headers="token"
                                        :on-preview="handlePreview"
                                        :on-success="uploadCar"
                                        :show-file-list="false"
                                        >
                                        <el-button size="small" type="primary" @click="uploadCarParent(index,item.carNumber)">点击上传</el-button>
                                    </el-upload>
                            </td>

                        </tr>
                    </table>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addPerson" :loading="loading">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import moment from 'moment'
import store from '@/store'
import {saveOrUpdate} from '@/api/staff/index'
import {uploadFile} from '@/api/upload'
import DictionaryList from '@/components/Recursion/dictionaryList'
import Tools from '@/utils/tools'

export default {
  name: 'AddPerson',
  components: {DepartmentSelect},
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      },
      listDepartment:{
          type:Array
      },
      editDetail:{
          type:Object
      },
      carTypeList:{
          type:Array
      }
  },
  data() {
    return {
        licenseNumber:null,
        token:{
            Authorization:store.getters.token
        },
        fileUrl:[],
        carList:[
            {
                carNumber:null,
                carImage:null
            }
        ],
        carIndex:0,
        personInfo:{
            contractScanning: null,//合同
            departmentId: null,
            education: null,
            email: null,
            emergencyContact: null,//紧急联系人
            emergencyContactMobile:null,
            entryTime: null,
            expireTime: null,//过期
            quitTime: null,
            faceImage: null,
            formalTime: null,//转正
            homeAddress: null,//住址
            idNumberScanning: null,
            major: null,//专业
            mobileNumber: null,
            name: null,
            age:null,
            fileUrl:null,
            position: null,
            sex: true,
            staffCarInfoList: [
                {
                    carImage:null,
                    carNumber: null,
                    carType: null,
                }
            ],
        },
        loading:false,
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      addPerson(){
          let that = this
          if(!Tools.isPhone(that.personInfo.emergencyContactMobile)){
              that.$message({
                    message: '紧急联系人电话号码格式不正确',
                    type: 'warning'
                });
                return
          }
          if(!Tools.isPhone(that.personInfo.mobileNumber)){
              that.$message({
                    message: '电话号码格式不正确',
                    type: 'warning'
                });
                return
          }
          that.personInfo.entryTime = moment(that.personInfo.entryTime).format('YYYY-MM-DD hh:mm:ss')
          that.personInfo.expireTime = moment(that.personInfo.expireTime).format('YYYY-MM-DD hh:mm:ss')
          if(that.personInfo.quitTime){
            that.personInfo.quitTime = moment(that.personInfo.quitTime).format('YYYY-MM-DD hh:mm:ss')
          }
          that.personInfo.formalTime = moment(that.personInfo.formalTime).format('YYYY-MM-DD hh:mm:ss')
          this.personInfo.fileUrl = this.fileUrl.toString()
          if(this.isEdit){
              this.personInfo.updateTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
          }else{
               this.personInfo.creatTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
          }
          console.log('personInfo',that.personInfo)
          that.loading = true
          saveOrUpdate(this.personInfo).then(res=>{
            that.loading = false
            if(that.isEdit){
                that.$message({
                    message: '添加人员成功',
                    type: 'success'
                });
            }else{
                that.$message({
                    message: '编辑人员成功',
                    type: 'success'
                });
            }
            that.$emit('close',{isShow:false,isSuccess:true})
          }).catch(error=>{
            that.loading = false
          })
      },
      defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
      addCar(){
        this.personInfo.staffCarInfoList.push({
            carImage:null,
            carNumber: null,
            carType: null,
        })
        this.carList.push({
             carNumber: null,
             carImage:null
        })
        console.log( this.personInfo.staffCarInfoList)
      },
      empty(){
          this.fileUrl=[]
          this.carIndex=0
          this.carList=[
                {
                    carNumber:null,
                    carImage:null
                }
            ]
          this.personInfo={
            contractScanning: null,//合同
            departmentId: null,
            education: null,
            email: null,
            emergencyContact: null,//紧急联系人
            entryTime: null,
            expireTime: null,//过期
            quitTime: null,
            faceImage: null,
            formalTime: null,//转正
            homeAddress: null,//住址
            idNumberScanning: null,
            major: null,//专业
            mobileNumber: null,
            name: null,
            age:null,
            fileUrl:null,
            position: null,
            sex: true,
            staffCarInfoList: [
                {
                    carImage:null,
                    carNumber: null,
                    carType: null,
                }
            ],
        }
      },
      handleClose() {
        this.empty()
        this.$emit('close',{isShow:false,isSuccess:false})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file){
          console.log('上传',file)
      },
      uploadStaff(file) {
        this.fileUrl.push(file[0]) ;
      },
      uploadCarParent(index,carNumber){
        this.carIndex = index
        this.carList[index].carNumber = carNumber
        // //   this.carList[index] = ''
         console.log('btton',carNumber)
      },
      uploadCar(res,file){
        this.personInfo.staffCarInfoList[this.carIndex].carImage = res[0]
        this.carList[this.carIndex].carImage = URL.createObjectURL(file.raw)
        console.log('this.carList',this.carList)
        // console.log('file',URL.createObjectURL(file.raw))
      }
  },
  watch:{
      editDetail(newVal){
          if(newVal){
            delete newVal.creatTime
            delete newVal.status
            delete newVal.updateTime
            delete newVal.userId
            this.personInfo=newVal
            this.fileUrl = newVal.fileUrl.split(',')
            let list = []
            newVal.staffCarInfoList.forEach(el=>{
                list.push({
                    carNumber:el.carNumber,
                    carImage:el.carImage
                })
            })
            this.carList = list
          }
      }
  }
}
</script>
<style scoped>
.line{
    text-align: center;
}
.person-info-title{
    line-height: 32px;
    padding: 0 16px;
    text-align: center;
    background: #90afda;
    display: inline-block;
    color: #333333;
    margin-bottom: 20px;
}
.person-table{
    border-collapse: collapse;
    /* margin: 0 auto; */
}
.person-table th,.person-table td{
    width: 128px;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.person-car-table{
    margin-left: 38px;
}
.person-table .el-button--primary{
    background: #409EFF;
    border: none;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
    border: none;
}
.car-num{
    width: 100%;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    color: #fff;
}
</style>

