<template>
  <div>
    <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">上报信息</span>
                <table class="person-table mb40 ml50" border="1">
                     <tr>
                        <th>上报人</th>
                        <td>
                            <el-select
                                :disabled="isDetail"
                                v-model="hiddenDangerInfo.reportStaffId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入关键词"
                                :remote-method="changeReport"
                                :loading="loading">
                                <el-option
                                v-for="item in staffList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </td>
                        <th>上报时间</th>
                        <td>
                            <el-date-picker
                                :disabled="isDetail"
                                v-model="hiddenDangerInfo.reportTime"
                                type="datetime"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>隐患级别</th>
                        <td style="width:300px">
                            <el-select clearable :disabled="isDetail" v-model="hiddenDangerInfo.level"  placeholder="请选择">
                                <DictionarySelect :list="hiddenDangerLevelList"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <th>标题</th>
                        <td colspan="5">
                            <input
                                :disabled="isDetail"
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.title"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>事件描述</th>
                        <td colspan="5">
                            <input
                                :disabled="isDetail"
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.eventDescribe"
                            />
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40 flex-start">
                    <div class="upload-img-box mr20 relative"  v-for="item in reportImgList" :key="item">
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
                        v-if="!isDetail"
                        action=""
                        multiple
                        ref="reportPic"
                        list-type="picture-card"
                        :on-change="changeReportPic"
                        :auto-upload="false">
                        <span>上传资料</span>
                    </el-upload>
                </div>
                <span class="person-info-title">处理信息</span>
                <table class="person-table mb40 ml50" border="1">
                     <tr>
                        <th>处理人</th>
                        <td>
                            <el-select
                                :disabled="isDetail"
                                v-model="hiddenDangerInfo.manageStaffId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入关键词"
                                :remote-method="changeReport"
                                :loading="loading">
                                <el-option
                                v-for="item in staffList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </td>
                        <th>处理时间</th>
                        <td>
                            <el-date-picker
                                :disabled="isDetail"
                                v-model="hiddenDangerInfo.manageTime"
                                type="datetime"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>处理状态</th>
                        <td style="width:300px">
                             <el-select clearable :disabled="isDetail" v-model="hiddenDangerInfo.manageStatus"  placeholder="请选择">
                                <DictionarySelect :list="hiddenDangerStatusList"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <th>处理描述</th>
                        <td colspan="5">
                            <input
                                :disabled="isDetail"
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.manageDescribe"
                            />
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40 flex-start">
                   <div class="upload-img-box mr20 relative"  v-for="item in manageImgList" :key="item">
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
                        v-if="!isDetail"
                        action=""
                        multiple
                        ref="managePic"
                        list-type="picture-card"
                        :on-change="changeManagePic"
                        :auto-upload="false">
                        <span>上传资料</span>
                    </el-upload>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer" v-if="!isDetail">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addHiddenDanger">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {getStaffList} from '@/api/staff/index'
import {saveOrUpdate} from '@/api/hiddenDanger'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import moment from 'moment'

export default {
  name: 'AddHiddenDanger',
  components: {DictionarySelect},
  props:{
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
    hiddenDangerLevelList:{
        type:Array
    },
    hiddenDangerStatusList:{
        type:Array
    }
  },
  data() {
    return {
        pageData:{
            keyword:null,
            pageIndex:1
        },
        manager:null,
        reportor:null,
        staffList:[],
        loading:false,
        hiddenDangerInfo:{
            eventDescribe: '',
            level: '',
            manageDescribe: '',
            manageStatus: '',
            manageTime: '',
            reportTime: '',
            manageStaffId:'',
            reportStaffId:'',
            title: ''
        },
        reportImgList:[],
        manageImgList:[],
        reportFile:[],
        manageFile:[],
        title:"新增隐患登记"
    }
  },
  created() {
  },
  mounted() {
      this.getStaffList()
  },
  methods: {
    handleClose(done) {
        this.$emit("close", { isShow: false, isSuccess: false });
        this.empty()
    },
    changeReport(val){
        this.pageData.keyword = val
        this.getStaffList()
    },
    changeReportPic(file,fileList){
        this.reportFile = fileList
        console.log('change',fileList)
    },
    changeManagePic(file,fileList){
        this.manageFile = fileList
    },
    empty(){
        if(!this.isDetail){
            this.$refs.managePic.clearFiles()
            this.$refs.reportPic.clearFiles()
        }
        this.hiddenDangerInfo={
            eventDescribe: '',
            level: '',
            manageDescribe: '',
            manageStatus: '',
            manageTime: '',
            reportTime: '',
            manageStaffId:'',
            reportStaffId:'',
            title: ''
        }
        this.reportImgList = []
        this.manageImgList = []
        this.title="新增隐患登记"
    },
    addHiddenDanger(){
        let data = this.hiddenDangerInfo
        if(data.reportTime){
            data.reportTime = moment(data.reportTime).format('YYYY-MM-DD HH:mm:ss')
        }
        if(data.manageTime){
            data.manageTime = moment(data.manageTime).format('YYYY-MM-DD HH:mm:ss')
        }
        let fd = new FormData()
        fd.append('eventDescribe',data.eventDescribe)
        fd.append('level',data.level)
        fd.append('manageDescribe',data.manageDescribe)
        fd.append('manageTime',data.manageTime)
        fd.append('reportTime',data.reportTime)
        fd.append('manageStaffId',data.manageStaffId)
        fd.append('reportStaffId',data.reportStaffId)
        fd.append('title',data.title)
        fd.append('manageStatus',data.manageStatus)
        this.reportFile.forEach(el=>{
            fd.append('dangerReportFile ',el.raw) 
        })
        this.manageFile.forEach(el=>{
            fd.append('dangerManageFile ',el.raw) 
        })
        if(this.isEdit){
            fd.append('id',data.id) 
        }
        console.log('数据',fd)
        saveOrUpdate(fd).then(res=>{
            this.$emit("close", { isShow: false, isSuccess: true });
            this.empty()
        })
    },
    getStaffList(){
        let that = this
        let data = this.pageData
        getStaffList(data).then(res=>{
            let {dataList} =res.data
            dataList.forEach((el,index)=>{
                dataList[index].value = el.name
            })
            that.staffList = dataList
        })
    }
  },
  watch:{
    editDetail(newVal){
        if(newVal){
            delete newVal.creatTime
            let report_list = [],manage_list = []
            newVal.hiddenDangerImageVideoInfos.forEach(el=>{
                if(el.type == '上报'){
                    report_list.push(el.image)
                }else{
                    manage_list.push(el.image)
                }
                
            })
            this.reportImgList = report_list
            this.manageImgList = manage_list
            delete newVal.hiddenDangerImageVideoInfos
            this.hiddenDangerInfo = newVal

        }
    },
    isDetail(newVal){
         if(newVal){
            this.title="隐患登记详情"
         }    
    },
    isEdit(newVal){
         if(newVal){
            this.title="编辑隐患登记" 
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
.el-select{
    width: 100%;
}
</style>
