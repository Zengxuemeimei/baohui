<template>
  <div>
      <el-dialog
        title="告警信息"
        :visible.sync="isEdit"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content" v-if="alarmInfo">
            <el-scrollbar style="height:100%">
            <span class="person-info-title">基本信息</span>
            <table class="person-table mb40 ml50" border="1" >
                <tr>
                    <th>事件名称</th>
                    <td>
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.name"
                        />
                    </td>
                    <th>事件描述</th>
                    <td colspan="3">
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.comment"
                        />
                    </td>
                </tr>
                <tr>
                    <th>告警类型</th>
                    <td>
                        <!-- <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.riskType"
                        /> -->
                        <el-select v-model="alarmInfo.riskType" placeholder="请选择">
                            <el-option
                                v-for="item in alarmTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                        </el-select>
                    </td>
                    <th>告警时间</th>
                    <td>
                        <el-date-picker
                            type="date"
                            v-model="alarmInfo.riskTime"
                            placeholder="选择日期">
                        </el-date-picker>
                    </td>
                    <th>处置状态</th>
                    <td colspan="1">
                        <!-- <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.manageStatus"
                        /> -->
                        <el-select v-model="alarmInfo.manageStatus" placeholder="请选择">
                            <el-option
                                v-for="item in alarmStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <th>处理人</th>
                    <td>
                        <!-- <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.manageStaffId"
                        /> -->
                        <el-autocomplete
                                v-model="alarmInfo.manageStaffName"
                                :fetch-suggestions="querySearchAsync"
                                @select="manageSelect"
                                placeholder="请输入内容">
                        </el-autocomplete>
                    </td>
                    <th>处理结果描述</th>
                    <td colspan="3">
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.resultDescribe"
                        />
                    </td>
                </tr>
            </table>
            <div class="flex-start flex-end ml50">
                <div class="alarm-img-box flex-center flex-column">
                    <!-- <img :src="alarmInfo.imageUrl" alt=""> -->
                    <el-image 
                    fit="scale-down"
                    lazy
                    :src="alarmInfo.imageUrl">
                    <div slot="error" class="image-slot flex-center flex-column " style="height:100%">
                      <i class="el-icon-picture-outline f30"></i>
                      <span class="mt10">加载失败</span>
                    </div>
                  </el-image>
                </div>
                <div class="alarm-video-box ml20 relative">
                    <video style="width:100%;height:250px"  src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video>
                    <!-- <div class="play-box position-center flex-center">
                        <i class="el-icon-caret-right" />
                    </div> -->
                </div>
            </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="editAlarm">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/alarmCenter'
import {getStaffList} from '@/api/staff/index'

export default {
  name: 'AlarmEdit',
  components: {},
  props:{
      isEdit:{
          type:Boolean
      },
      alarmInfo:{
          type:Object
      },
      alarmTypeList:{
          type:Array
      },
      alarmStatusList:{
          type:Array
      },
      staffList:{
          type:Array
      }
  },
  data() {
    return {
        pageData:{
            keyword:null,
            pageIndex:1
        },
        manageStaffId:null
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose() {
        this.$emit("close", { isShow: false, isSuccess: false });
    },
    manageSelect(val){
        this.manageStaffId = val.id
    },
    querySearchAsync(queryString, callback) {
        // let  staffList = that.staffList;
        this.pageData.keyword = queryString
        this.getStaffList()
        // var results = queryString ? staffList.filter(this.createStateFilter(queryString)) : staffList;
        callback(this.staffList);
        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
          
        // }, 3000 * Math.random());
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
    },
    editAlarm(){
        let data = {}
        data.name = this.alarmInfo.name
        data.comment = this.alarmInfo.comment
        data.riskType = this.alarmInfo.riskType
        data.riskTime = this.alarmInfo.riskTime
        data.manageStatus = this.alarmInfo.manageStatus
        data.manageStaffId = this.manageStaffId
        data.resultDescribe = this.alarmInfo.resultDescribe
        data.imageUrl = this.alarmInfo.imageUrl
        data.videoUrl = this.alarmInfo.videoUrl
        data.id = this.alarmInfo.id
        saveOrUpdate(data).then(res=>{
            this.$emit("close", { isShow: false, isSuccess: true });
        })
    }
  }
}
</script>
<style scoped>
.alarm-img-box{
    width: 350px;
    height: 250px;
    background:  rgb(225, 225, 226);
}
.alarm-video-box{
    width: 350px;
    height: 250px;
    /* background: rgb(27, 27, 27); */
}
.play-box{
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, .6);
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
}
</style>
