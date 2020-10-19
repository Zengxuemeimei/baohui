<template>
  <div>
    <el-dialog
        title="新增隐患登记"
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
                            <el-autocomplete
                                v-model="reportor"
                                :fetch-suggestions="querySearchAsync"
                                @select="reportSelect"
                                placeholder="请输入内容">
                            </el-autocomplete>
                        </td>
                        <th>上报时间</th>
                        <td>
                            <el-date-picker
                                v-model="hiddenDangerInfo.reportTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>隐患级别</th>
                        <td style="width:300px">
                            <input
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.level"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>标题</th>
                        <td colspan="5">
                            <input
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
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.eventDescribe"
                            />
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40">
                    <img src="" alt="">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传资料</span>
                    </el-upload>
                </div>
                <span class="person-info-title">处理信息</span>
                <table class="person-table mb40 ml50" border="1">
                     <tr>
                        <th>处理人</th>
                        <td>
                            <el-autocomplete
                                v-model="manager"
                                :fetch-suggestions="querySearchAsync"
                                @select="manageSelect"
                                placeholder="请输入内容">
                            </el-autocomplete>
                        </td>
                        <th>处理时间</th>
                        <td>
                            <el-date-picker
                                v-model="hiddenDangerInfo.manageTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </td>
                        <th>处理状态</th>
                        <td style="width:300px">
                            <input
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.manageStatus"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>处理描述</th>
                        <td colspan="5">
                            <input
                                type="text"
                                class="input-form"
                                v-model="hiddenDangerInfo.manageDescribe"
                            />
                        </td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40">
                    <img src="" alt="">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传资料</span>
                    </el-upload>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addHiddenDanger">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {getStaffList} from '@/api/staff/index'
import {saveOrUpdate} from '@/api/hiddenDanger'
import moment from 'moment'

export default {
  name: 'AddHiddenDanger',
  components: {},
  props:{
    isShow: {
      type: Boolean,
    },
    isEdit: {
      type: Boolean,
    },
    editDetail: {
      type: Object,
    }
  },
  data() {
    return {
        pageData:{
            keyword:null,
            pageIndex:0
        },
        manager:null,
        reportor:null,
        staffList:[],
        hiddenDangerInfo:{
            eventDescribe: null,
            hiddenDangerImageVideoInfos: [
                {
                image: null,
                type: null,
                video: null
                }
            ],
            level: null,
            manageDescribe: null,
            manageStatus: null,
            manageTime: null,
            reportTime: null,
            manageStaffId:null,
            reportStaffId:null,
            title: null
        }
          
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
    },
    reportSelect(val){
        this.hiddenDangerInfo.reportStaffId = val.id
    },
    manageSelect(val){
        this.hiddenDangerInfo.manageStaffId = val.id
    },
    addHiddenDanger(){
        let data = this.hiddenDangerInfo
        data.reportTime = moment(data.reportTime).format('YYYY-MM-DD hh:mm:ss')
        data.manageTime = moment(data.manageTime).format('YYYY-MM-DD hh:mm:ss')
        console.log(data)
        saveOrUpdate(data).then(res=>{
            this.$emit("close", { isShow: false, isSuccess: true });
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
  },
  watch:{

  }
}
</script>
<style scoped>
.person-content{
    height: 60vh;
    overflow: hidden;
}
</style>
