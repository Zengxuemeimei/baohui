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
                                v-model="personInfo.quitTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">文档资料</span>
                <div class="ml50 mb40">
                    <div class="flex-start">
                        <img v-for="item in fileUrl" :key="item" :src="item" alt="">
                    </div>
                    <el-upload
                        action="http://192.168.1.103:9092/file/upload/staff"
                        list-type="picture-card"
                        :headers="token"
                        :on-success="uploadStaff"
                        :on-remove="handleRemove">
                        <span>上传资料</span>
                    </el-upload>
                </div>
                <span class="person-info-title">车辆信息</span>
                <div class="person-car-info ml50 mb40 ">
                    <!-- <el-upload
                        action="http://192.168.1.103:9092/file/upload/cars"
                        list-type="picture-card"
                        :headers="token"
                        :on-success="uploadCar"
                        :limit="1">
                        <span>上传车辆图片</span>
                    </el-upload> -->
                    <div class="flex-start">
                        <div class="upload-img-box" v-for="item in carList" :key="item">
                            <img class="upload-img"  :src="item" alt="">
                            <!-- <img src="blob:http://192.168.1.120:9528/df3e387a-21b3-40dd-ae6e-142d96f3c992" alt=""> -->
                        </div>
                    </div>
                    <el-button type="text" @click="addCar"><i class="el-icon-circle-plus-outline" /><span style="display:inline-block;margin-left:10px">新增车辆</span> </el-button>
                    <table class="person-table" border="1">
                        <tr v-for="(item,index) in personInfo.staffCarInfoList" :key="item.carNumber">
                            <th>车牌号</th>
                            <td>
                                 <input type="text" class="input-form" v-model="item.carNumber">
                            </td>
                            <th>车辆类型</th>
                            <td>
                                 <input type="text" class="input-form" v-model="item.carType">
                            </td>
                            <th>上传车辆图片</th>
                            <td >
                                 <el-upload
                                        action="http://192.168.1.103:9092/file/upload/cars"
                                        :headers="token"
                                        :on-preview="handlePreview"
                                        :on-success="uploadCar"
                                        :file-list="carList"
                                        :show-file-list="false"
                                        :limit="1">
                                        <el-button size="small" type="primary" @click="uploadCarParent(index)">点击上传</el-button>
                                    </el-upload>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- <span class="person-info-title mr20">人员事件</span>
                <el-button type="text" @click="showEvent"><i class="el-icon-circle-plus-outline" /><span style="display:inline-block;margin-left:10px">新增事件</span> </el-button>
                <div class="ml50">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="序号"
                        width="128">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="事件名称"
                        width="364">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="事件内容"
                        width="364">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="发生时间"
                        >
                        </el-table-column>
                    </el-table>
                </div> -->
                <!-- <el-dialog
                    width="30%"
                    title="添加事件"
                    :visible.sync="innerVisible"
                    :close-on-click-modal="false"
                    append-to-body>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="事件名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="事件内容">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="事件时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                                <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addPerson">确 定</el-button>
                    </span>
                </el-dialog> -->
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
      }
  },
  data() {
    return {
        token:{
            Authorization:store.getters.token
        },
        fileUrl:[],
        carList:[],
        carIndex:0,
        personInfo:{
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
          that.personInfo.entryTime = moment(that.personInfo.entryTime).format('YYYY-MM-DD hh:mm:ss')
          that.personInfo.expireTime = moment(that.personInfo.expireTime).format('YYYY-MM-DD hh:mm:ss')
          that.personInfo.quitTime = moment(that.personInfo.quitTime).format('YYYY-MM-DD hh:mm:ss')
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
      addCar(){
        this.personInfo.staffCarInfoList.push({
            carImage:null,
            carNumber: null,
            carType: null,
        })
        console.log(this.personInfo.staffCarInfoList)
      },
      empty(){
          this.personInfo={
            contractScanning: null,//合同
            departmentId: null,
            education: null,
            email: null,
            emergencyContact: null,//紧急联系人
            entryTime: null,
            expireTime: null,//离职
            faceImage: null,
            formalTime: null,//转正
            homeAddress: null,//住址
            idNumberScanning: null,
            major: null,//专业
            mobileNumber: null,
            name: null,
            position: null,
            sex: true
        }
      },
      handleClose(done) {
        this.$emit('close',{isShow:false,isSuccess:false})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file){
          console.log(file)
      },
      uploadStaff(file) {
        this.fileUrl.push(file[0]) ;
      },
      uploadCarParent(index){
        //   this.carIndex = index
        // //   this.carList[index] = ''
        //   console.log(index)
      },
      uploadCar(data,file){
        this.personInfo.staffCarInfoList[0].carImage = data[0]
        this.carList[0] = URL.createObjectURL(file.raw)
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
          }
      }
  }
}
</script>
<style scoped>
.person-content{
    height: 60vh;
    overflow: hidden;
}
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
</style>

