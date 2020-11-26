<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">考勤管理-工作日历设置</p>
    </header>
    <main class="content-main">
      <div class="flex-start">
          <div>
            <label class="filter-label">部门：</label>
            <el-select clearable v-model="departmentId" @change="changeDepart" placeholder="请选择">
              <DepartmentSelect :list="listDepartment"/>
            </el-select>
          </div>
          <div class="ml20">
            <label class="filter-label">选择时间：</label>
            <el-date-picker
              v-model="month"
              type="month"
              @change="changeMonth"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <add-button @addShow="addShow" />
      </div>
      <div class="mt20 flex-center" style="100%">
        <div class="calendar-box">
            <div class="calendar-detail flex-center" >
              <div v-show="workStartTime || workEndTime" class="flex-start">
                 <p>上班时间：{{workStartTime}}</p>
                  <p class="ml20">下班时间：{{workEndTime}}</p>
              </div>
             
            </div>
            <el-calendar v-model="calendarMonth">
              <template
              slot="dateCell"
                 slot-scope="{data}">
                <div class="flex-center flex-column" style="width:100%;height:100%" @dblclick="editWork(data.day)" @click="detailDay(data.day)">
                    <p class="calendar-date">{{data.day.split('-').slice(2).join('-')}}</p>
                    <p :class="item.workType == '休假'?'is-vacation':''" class="work" v-for="item in workDayList" :key="item.id">{{item.date == data.day ? item.workType:''}}</p>
                    <!-- <p>{{workDayList[0].date}}</p> -->
                </div>
                
              </template>
            </el-calendar>
        </div>
      </div>
    </main>
    <el-dialog
        :title="title"
        :visible.sync="isAdd"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="部门" prop="departmentId">
                    <div class="input-box">
                        <el-select :disabled="isEdit" clearable v-model="ruleForm.departmentId" placeholder="请选择">
                          <DepartmentSelect :list="listDepartment"/>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="上班时间" prop="workStartTime" v-if="ruleForm.workType != '休假'">
                    <div class="input-box">
                        <el-time-picker
                            v-model="ruleForm.workStartTime"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </div>
                </el-form-item>
                <el-form-item label="下班时间" prop="wordEndTime" v-if="ruleForm.workType != '休假'">
                    <div class="input-box">
                        <el-time-picker
                            v-model="ruleForm.wordEndTime"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </div>
                </el-form-item>
                <el-form-item label="上班日期" prop="workDay" v-if="ruleForm.workType != '休假'">
                    <div class="input-box">
                        <el-date-picker
                          type="dates"
                          :disabled="isEdit"
                          v-model="ruleForm.workDay"
                          placeholder="选择一个或多个日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="休假日期" prop="workDay" v-if="ruleForm.workType == '休假'">
                    <div class="input-box">
                        <el-date-picker
                          type="dates"
                          :disabled="isEdit"
                          v-model="ruleForm.workDay"
                          placeholder="选择一个或多个日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="input-box">
                       <el-radio-group v-model="ruleForm.workType">
                          <el-radio-button value="上班" label="上班"></el-radio-button>
                          <el-radio-button value="休假" label="休假"></el-radio-button>
                       </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addWorkDay('ruleForm')" :loading="loading">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {getDepartmentList} from '@/api/department'
import {getCalendarList,workSaveOrUpdate} from '@/api/calendar/index'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import AddButton from '@/components/AddButton/index'
import moment from 'moment'

export default {
  name: 'CalendarSettings',
  components: {DepartmentSelect,AddButton},
  data() {
    return {
      // calendarValue:'2020-09',
      listDepartment:[],
      month:null,
      calendarMonth:null,
      loading:false,
      departmentId:null,
      isAdd:false,
      isEdit:false,
      title:'新增',
      ruleForm:{
          departmentId:null,
          wordEndTime:null,
          workStartTime:null,
          workDay:null,
          workType:'上班'
      },
      rules:{
        departmentId:[
          {required: true, message: '请选择上班时间', trigger: 'change'}
        ],
        workStartTime:[
          { required: true, message: '请选择上班时间', trigger: 'change' }
        ],
        wordEndTime:[
          { required: true, message: '请选择下班时间', trigger: 'change' }
        ],
        workDay:[
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
      },
      workDayList:[],
      workStartTime:null,
      workEndTime:null
    }
  },
  created() {
  },
  mounted() {
    this.getDepartmentList()
    let date = new Date()
    this.month = moment(date).format('YYYY-MM')
  },
  methods: {
    detailDay(date){
      this.workDayList.forEach(el=>{
          if(el.date == date){
            this.workStartTime = el.workStartTime
            this.workEndTime = el.wordEndTime
          }     
      })
      if(date.substring(0,7) !== this.month){
          this.month =  moment(date).format('YYYY-MM')
          this.getList()
      }
    },
    changeMonth(val){
        this.calendarMonth = new Date(val)
        // this.month = moment(val).format('YYYY-MM')
        this.getList()
    },
    changeDepart(val){
        if(!val){
          this.departmentId = null
        }
        this.getList()
    },
    editWork(date){
      let that = this
      
      that.isAdd = true
      that.title = '编辑'
      that.workDayList.forEach(el=>{
        if(el.date == date){
           console.log('1',el.wordEndTime)
           that.isEdit = true
              that.ruleForm = {
                departmentId:el.departmentId,
                wordEndTime:el.wordEndTime ,
                workStartTime:el.workStartTime ,
                workDay:[date],
                workType:el.workType,
                id:el.id
          }
        }
      })
      if(!that.isEdit){
          // console.log('2',el.wordEndTime)
          that.isEdit = false
          that.title = '新增'
          that.ruleForm = {
              departmentId:that.departmentId,
              wordEndTime:null,
              workStartTime:null,
              workDay:[date],
              workType:'上班'
        }
      }
      console.log('编辑',this.ruleForm)
    },
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    getDepartmentList(){
        let that = this
        getDepartmentList({status: "启用"}).then(res=>{
          that.listDepartment=res.data
          that.departmentId = res.data[0].id
          that.getList()
        })
    },
    empty(){
        this.ruleForm={
          departmentId:null,
          wordEndTime:null,
          workStartTime:null,
          workDay:null,
          workType:'上班'
      }
      this.title = '新增'
      this.$refs.ruleForm.resetFields();
    },
    handleClose(){
        this.isAdd = false
        this.isEdit = false
        this.empty()
    },
    addWorkDay(formName){
      let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            let data = that.ruleForm
            let list = []
            // data.workStartTime = moment(data.workStartTime).format('HH:mm:ss')
            // data.wordEndTime = moment(data.wordEndTime).format('HH:mm:ss')
            data.workDay.forEach((el,index)=>{
              if(this.isEdit){
                list.push({
                  departmentId:data.departmentId,
                  // wordEndTime:moment(data.wordEndTime).format('HH:mm:ss'),
                  // workStartTime:moment(data.workStartTime).format('HH:mm:ss'),
                   wordEndTime:data.wordEndTime,
                  workStartTime:data.workStartTime,
                  workDay:moment(el).format('YYYY-MM-DD'),
                  workType:data.workType,
                  id:data.id
              })
              }else{
                list.push({
                  departmentId:data.departmentId,
                  // wordEndTime:moment(data.wordEndTime).format('HH:mm:ss'),
                  // workStartTime:moment(data.workStartTime).format('HH:mm:ss'),
                   wordEndTime:data.wordEndTime,
                  workStartTime:data.workStartTime,
                  workDay:moment(el).format('YYYY-MM-DD'),
                  workType:data.workType
              })
              }
              
            })
            console.log('上班',list)
            that.loading = true
            workSaveOrUpdate({staffWorkCalendarInfoList:list}).then(res=>{
              that.loading = false
              that.empty()
              that.isAdd = false
              this.month = moment(this.month).format('YYYY-MM')
              that.getList()
            }).catch(error=>{
              that.loading = false
            })
          }
        })

    },
    getList(){
      let data = {
        departmentId:this.departmentId,
        month:this.month
      }
      getCalendarList(data).then(res=>{
        res.data.dataList.forEach((el,index)=>{
          // let month = el.workDay[1] < 10? '0'+ el.workDay[1] :el.workDay[1]
          // let day = el.workDay[2] < 10? '0'+ el.workDay[2] :el.workDay[2]
          //  el.workDay[3] < 10 ? '0'+ el.workDay[3] : el.workDay[3]
          // res.data.dataList[index].date = el.workDay[0] + '-' + month + '-' +day
          res.data.dataList[index].date = el.workDay
        })
          this.workDayList = res.data.dataList
          console.log(this.workDayList)
      })
    }
  }
}
</script>
<style scoped>
.calendar-box{
  width: 800px;
}
.calendar-detail{
  width: 100%;
  height: 80px;
  background: #ffffff;
}
.is-selected{
  color: #1989FA;
}
.calendar-date{
  text-align: center;
  line-height: 30px;
  width: 50%;
}

.work{
    background: #66b1ff;
    color: #fff;
    width: 50%;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    /* margin-top: 5px; */
    /* position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%); */
}
</style>
