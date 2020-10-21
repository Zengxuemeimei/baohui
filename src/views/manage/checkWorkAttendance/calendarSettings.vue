<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">考勤管理-工作日历设置</p>
    </header>
    <main class="content-main">
      <div class="flex-start">
          <div>
            <label class="filter-label">部门：</label>
            <el-select clearable v-model="departmentId" placeholder="请选择">
              <DepartmentSelect :list="listDepartment"/>
            </el-select>
          </div>
          <div class="ml20">
            <label class="filter-label">选择时间：</label>
            <el-date-picker
              v-model="month"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <add-button @addShow="addShow" />
      </div>
      <div class="mt20 flex-center" style="100%">
        <div class="calendar-box">
            <div class="calendar-detail flex-center">
              <p>上班时间：09：00</p>
              <p class="ml20">下班时间：18：00</p>
            </div>
            <el-calendar v-model="value">
              <template
              slot="dateCell"
                 slot-scope="{data}">
                <!-- <p class="calendar-date" :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                </p> -->
                <div class="flex-center flex-column" style="width:100%;height:100%" @dblclick="editWork(data.day)">
                    <p class="calendar-date">{{data.day.split('-').slice(2).join('-')}}</p>
                    <p :class="item.workType == '休假'?'is-vacation':''" v-for="item in workDayList" :key="item.id">{{item.date == data.day ? item.workType:''}}</p>
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
                        <el-select clearable v-model="ruleForm.departmentId" placeholder="请选择">
                          <DepartmentSelect :list="listDepartment"/>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="上班时间" prop="workStartTime">
                    <div class="input-box">
                        <el-time-picker
                            v-model="ruleForm.workStartTime"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </div>
                </el-form-item>
                <el-form-item label="下班时间" prop="wordEndTime">
                    <div class="input-box">
                        <el-time-picker
                            v-model="ruleForm.wordEndTime"
                            value-format="HH:mm:ss"
                            placeholder="选择时间">
                        </el-time-picker>
                    </div>
                </el-form-item>
                <el-form-item label="上班日期" prop="workDay">
                    <div class="input-box">
                        <el-date-picker
                          type="dates"
                          v-model="ruleForm.workDay"
                          placeholder="选择一个或多个日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="workDay">
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
      value:null,
      listDepartment:[],
      month:null,
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
          { required: true, message: '请选择上班日期', trigger: 'change' }
        ],
      },
      workDayList:[]
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
    editWork(date){
      let that = this
      that.isEdit = true
      that.isAdd = true
      that.title = '编辑'
      that.workDayList.forEach(el=>{
        if(el.date == date){
              that.ruleForm = {
              departmentId:el.departmentId,
              wordEndTime:el.wordEndTime,
              workStartTime:el.workStartTime,
              workDay:[date],
              workType:el.workType,
              id:el.id
          }
          return
        }else{
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
      })
      console.log('编辑',date)
    },
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    getDepartmentList(){
        let that = this
        getDepartmentList().then(res=>{
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
      this.$refs.ruleForm.resetFields();
    },
    handleClose(){
        this.isAdd = false
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
          let month = el.workDay[1] < 10? '0'+ el.workDay[1] :el.workDay[1]
          let day = el.workDay[2] < 10? '0'+ el.workDay[2] :el.workDay[2]
          //  el.workDay[3] < 10 ? '0'+ el.workDay[3] : el.workDay[3]
          res.data.dataList[index].date = el.workDay[0] + '-' + month + '-' +day
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
}

</style>
