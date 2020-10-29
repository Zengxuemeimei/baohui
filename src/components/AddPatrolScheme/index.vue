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
                <span class="person-info-title">方案信息</span>
                <table class="person-table mb20 ml50" border="1">
                    <tr>
                        <th>方案名称</th>
                        <td>
                            <input
                                :disabled="isDetail"
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlanInfo.name"
                            />
                        </td>
                        
                        <th>方案类型</th>
                        <td>
                            <el-select clearable :disabled="isDetail" v-model="keepWatchPlanInfo.type" placeholder="请选择">
                                <DictionarySelect :list="caseTypeList"/>
                            </el-select>
                        </td>
                        <th>方案状态</th>
                        <td style="width:300px">
                            <el-radio-group :disabled="isDetail" v-model="keepWatchPlanInfo.status">
                                <el-radio label="启用">启用</el-radio>
                                <el-radio label="停用">停用</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td colspan="2">
                            <el-select :disabled="isDetail" v-model="keepWatchPlanInfo.departmentId" placeholder="请选择">
                                <DepartmentSelect :list="listDepartment"/>
                            </el-select>
                        </td>
                        <th>重复计划</th>
                        <td colspan="2" >
                            <div class="flex-start">
                                <div style="width:50%">
                                <el-radio-group :disabled="isDetail" v-model="keepWatchPlanInfo.repetition">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </div>
                           <div style="width:50%;border-left:1px solid #666;">
                               <el-select clearable :disabled="!keepWatchPlanInfo.repetition || isDetail" v-model="keepWatchPlanInfo.repetitionType" placeholder="请选择">
                                    <DictionarySelect :list="repetitionTypeList"/>
                                </el-select>
                           </div>
                            </div>
                            
                        </td>
                    </tr>
                </table>
                <div class="ml50">
                    <div class="flex-start">
                        <p>巡更点位设置</p>
                        <div class="ml5" v-if="!isDetail">
                            <el-button class="el-icon-circle-plus-outline" @click="addPlace" type="text"> 新增</el-button>
                        </div>
                    </div>
                    <table class="person-table mt10" border="1">
                        <tr>
                            <th style="width:80px">序号</th>
                            <th style="width:200px">点位名称</th>
                            <th>时间</th>
                            <th style="width:532px">巡更人员</th>
                        </tr>
                        <tr v-for="(item,index) in keepWatchPlanInfo.keepWatchPlanPlaces" :key="index">
                            <td style="width:80px">{{index+1}}</td>
                            <td style="width:200px">
                                <el-select :disabled="isDetail" v-model="item.placeId" placeholder="请选择">
                                        <el-option
                                        v-for="item in placeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                </el-select>
                            </td>
                            <td>
                                <el-time-picker
                                    is-range
                                    :disabled="isDetail"
                                    v-model="timePicker[index].time"
                                    value-format="HH:mm:ss'"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="选择时间范围">
                                </el-time-picker>
                            </td>
                            <td style="width:532px">
                                    <el-select
                                        :disabled="isDetail"
                                        v-model="item.keepWatchPlaceStaffs"
                                        @change="handlChange"
                                        multiple
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入关键词"
                                        :remote-method="checkedStaffs"
                                        :loading="loading">
                                        <el-option
                                        v-for="item in staffList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </td>
                        </tr>
                    </table>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer" v-if="!isDetail">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addPatrolScheme">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdatePlan,getKeepWatchPlaceList} from '@/api/keepWatch/index'
import {getStaffList} from '@/api/staff/index'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import moment from 'moment'

export default {
  name: 'AddPatrolScheme',
  components: {DepartmentSelect,DictionarySelect},
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      },
      isDetail:{
          type:Boolean
      },
      listDepartment:{
          type:Array
      },
      editDetail:{
          type:Object
      },
      caseTypeList:{
          type:Array
      },
      repetitionTypeList:{
          type:Array
      }
  },
  data() {
    return {
        timePicker:[
            {
                time:null
            }
        ],
        keepWatchPlanInfo:{
          departmentId: null,
          keepWatchPlanPlaces: [
                {
                endTime: null,
                keepWatchPlaceStaffs: [],
                placeId: null,
                startTime: null
                }
            ],
            name: null,
            repetition: false,
            repetitionType: null,
            status: '启用',
            type: null   
        },
        loading:false,
        staffList:[],
        placeList:[],
        title:'新增方案'
    }
  },
  created() {
  },
  mounted() {
      this.getStaffList({
        keyword:null,
        pageIndex:1,
        pageSize:100
      })
      this.getPlaceList()
  },
  methods: {
      addPlace(){
          this.keepWatchPlanInfo.keepWatchPlanPlaces.push({
                endTime: null,
                keepWatchPlaceStaffs: [],
                placeId: null,
                startTime: null
          })
          this.timePicker.push({
                time:null
          })
      },
      handlChange(val){
          console.log('人员',val)
      },
      checkedStaffs(val){
          this.getStaffList({
                keyword:val,
                pageIndex:1,
                pageSize:100
            })
      },
      getStaffList(data){
        let that = this
        getStaffList(data).then(res=>{
            let {dataList} =res.data
            dataList.forEach((el,index)=>{
                dataList[index].value = el.name
            })
            that.staffList = dataList
        })
    },
    getPlaceList(){
        let data = {
            keyword:null,
            pageIndex:1
        }
        getKeepWatchPlaceList(data).then(res=>{
                this.placeList = res.data.dataList
        })
    },
      handleClose() {
        this.$emit('close',{isShow:false,isSuccess:false})
        this.empty()
      },
      empty(){
        this.timePicker=[
            {
                time:null
            }
        ],
        this.keepWatchPlanInfo={
          departmentId: null,
          keepWatchPlanPlaces: [
                {
                endTime: null,
                keepWatchPlaceStaffs: [],
                placeId: null,
                startTime: null
                }
            ],
            name: null,
            repetition: false,
            repetitionType: null,
            status: '启用',
            type: null   
        }
        this.title = '新增方案'
      },
      addPatrolScheme(){
          let list = []
          this.timePicker.forEach((el,index)=>{
            this.keepWatchPlanInfo.keepWatchPlanPlaces[index].startTime = el.time[0].slice(0,el.time[0].length-1)
            this.keepWatchPlanInfo.keepWatchPlanPlaces[index].endTime = el.time[1].slice(0,el.time[1].length-1)
            this.keepWatchPlanInfo.keepWatchPlanPlaces[index].keepWatchPlaceStaffs.forEach((item,num)=>{
            this.keepWatchPlanInfo.keepWatchPlanPlaces[index].keepWatchPlaceStaffs[num] = {
                        staffId:item
                }
            })
          })
          let data = this.keepWatchPlanInfo
          saveOrUpdatePlan(data).then(res=>{
              this.empty()
              this.$emit('close',{isShow:false,isSuccess:true})
          })
      }
  },
  watch:{
      editDetail(newVal){
        //   delete newVal.updateTime
        //   this.keepWatchPlanInfo = newVal
        if(newVal){
            console.log('newVal',newVal)
             this.keepWatchPlanInfo={
                    departmentId: newVal.departmentId,
                    keepWatchPlanPlaces: newVal.keepWatchPlanPlaces,
                    name: newVal.name,
                    repetition: newVal.repetition,
                    repetitionType: newVal.repetitionType,
                    status: newVal.status,
                    type: newVal.type,
                    id:newVal.id 
                }
                let list = []
                let staff_list = [] 

             newVal.keepWatchPlanPlaces.forEach(el=>{
                 list.push({
                     time:[el.startTime+"'",el.endTime+"'"]
                 })
                 el.keepWatchPlaceStaffs.forEach(staff=>{
                     staff_list.push(staff.staffId)
                 })
                 el.keepWatchPlaceStaffs = staff_list
                 staff_list=[]
             }) 
            //  this.keepWatchPlanInfo.keepWatchPlanPlaces.keepWatchPlaceStaffs = staff_list
             this.timePicker = list
             console.log(this.timePicker) 
             console.log('编辑',newVal.keepWatchPlanPlaces) 
        }
      },
      isDetail(newVal){
          if(newVal){
              this.title = '方案详情'
          }
      },
      isEdit(newVal){
          if(newVal){
              this.title = '编辑方案'
          }
      }
  }
}
</script>
<style scoped>
.person-content{
    max-height: 60vh;
    overflow: hidden;
}
.el-select{
    width: 100%;
}
</style>
