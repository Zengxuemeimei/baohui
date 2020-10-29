<template>
  <div>
     <div class="btn-box flex-start">
            <add-button @addShow="addShow" />
        </div>
      <div class="all-table relative">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            width="270">
          </el-table-column>
          <el-table-column
          v-if="recordType == '请假'"
            prop="entryTime"
            label="请假时间">
            <template slot-scope="scope">
              {{scope.row.startTime}}&nbsp;至&nbsp;{{scope.row.endTime}}
            </template>
          </el-table-column>
           <el-table-column
           v-if="recordType == '加班'"
            prop="entryTime"
            label="加班时间">
            <template slot-scope="scope">
              {{scope.row.startTime}}&nbsp;至&nbsp;{{scope.row.endTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <div class="flex-start">
                  <el-button type="primary" @click="editItem(scope.row)" size="mini">编辑</el-button>
                  <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button>
                </div>
            </template>
          </el-table-column>
          
        </el-table>
        <div class="flex-between mt20">
            <p></p>
            <paging :total="total" @getCurrentPage="getPage"/>
        </div>
        <Loading :loading="loading" />
      </div>
      <el-dialog
        :title="title"
        :visible.sync="isAdd"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <el-form :model="staffRecordInfo" :rules="rules"  ref="ruleForm" label-width="100px">
            <el-form-item label="姓名" prop="staffName">
                <!-- <el-autocomplete
                    v-model="staffName"
                    :fetch-suggestions="querySearchAsync"
                    @select="changeStaff"
                    placeholder="请输入内容">
                </el-autocomplete> -->
                <el-select
                    v-model="staffRecordInfo.staffId"
                    filterable
                    remote
                    @change="getStaffInfo"
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="changeStaff"
                    :loading="loading">
                        <el-option
                            v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                  v-model="staffRecordInfo.startTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                  v-model="staffRecordInfo.endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
             <el-form-item  prop="recordType">
               <el-radio-group v-model="staffRecordInfo.recordType">
                    <el-radio-button value="请假" label="请假"></el-radio-button>
                    <el-radio-button value="加班" label="加班"></el-radio-button>
                </el-radio-group>
             </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addEvent('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffRecordInfoList, staffSaveOrUpdate,deleteLeaveRecord } from '@/api/calendar'
import Paging from '@/components/Paging/index'
import Loading from '@/components/Loading/index'
import AddButton from '@/components/AddButton/index'
import {getStaffList} from '@/api/staff/index'

export default {
  name: 'WorkList',
  components: {Paging,Loading,AddButton},
  props:{
    recordType:{
      type:String
    }
  },
  data() {
    return {
      list:[],
      total:0,
      loading:false,
      title:'登记',
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10,
        recordType:this.recordType
      },
      isAdd:false,
      isEdit:false,
      staffRecordInfo:{
          staffId:null,
          startTime:null,
          endTime:null,
          recordType:this.recordType
      },
      staffList:[],
      rules:{
        staffId:[
          {required: true, message: '请输入姓名', trigger: 'change' }
        ],
        startTime:[
          {required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endTime:[
          {required: true, message: '请输入结束时间', trigger: 'change' }
        ],
        recordType:[
          {required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      staffInfo:null,
      staffName:null
    }
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getStaffList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    handleClose(){
      this.isAdd = false
      this.isEdit = false
      this.empty()
    },
    changeStaff(val){
      this.pageData.keyword = val
      this.getStaffList()
    },
    getStaffInfo(id){
        this.staffList.forEach(el=>{
          if(id == el.id){
            this.staffInfo = el
          }
        })
    },
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    deleteItem(id){
       this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLeaveRecord({id:id}).then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
    },
    empty(){
      this.staffRecordInfo={
          staffId:null,
          startTime:null,
          endTime:null,
          recordType:this.recordType
      },
      this.$refs.ruleForm.resetFields();
      this.staffInfo=null
      this.title = '登记'
    },
    editItem(item){
      this.isAdd =true
      this.isEdit = true
      this.staffRecordInfo={
          staffId:item.staffId,
          startTime:item.startTime,
          endTime:item.endTime,
          recordType:this.recordType,
          id:item.id,
          name:item.name,
          departmentId:item.departmentId
      }
      this.title = '编辑'
      // this.staffInfo.staffId = item.staffId

    },
    addEvent(formName){
      let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            let data = {}
            if(that.isEdit){
              console.log('1')
              data = that.staffRecordInfo
            }else{
              console.log('2',that.staffInfo)
              data = that.staffRecordInfo
              // data.staffId = that.staffInfo.id
              data.name = that.staffInfo.name
              data.departmentId = that.staffInfo.departmentId
          
            }
              data.idNumber = null
            staffSaveOrUpdate(data).then(res=>{
                that.isAdd = false
                delete this.pageData.keyword
                this.getList()
                // console.log('page',this.pageData)
                that.empty()

            })
          }
        })
    },
    getList(){
      this.loading= true
      getStaffRecordInfoList(this.pageData).then(res=>{
        this.list = res.data.dataList
        this.total = res.data.total
        this.loading= false
      }).catch(error=>{
        this.loading= false
      })
    },
    getStaffList(){
        let that = this
        let data = {
          keyword:this.pageData.keyword,
          pageIndex:this.pageData.pageIndex
        } 
        getStaffList(data).then(res=>{
            let {dataList} =res.data
            dataList.forEach((el,index)=>{
                dataList[index].value = el.name
            })
            that.staffList = dataList
        })
    }
  }
}
</script>
<style scoped>

</style>
