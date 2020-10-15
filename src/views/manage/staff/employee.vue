<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">员工管理-在职员工</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery"/>
      </div>
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div>
            <label class="filter-label">部门：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-time">
            <label class="filter-label">入职时间：</label>
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="btn-box flex-start">
            <add-button @addShow="addShow" />
            <!-- <edit-button />
            <del-button /> -->
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="tableData3"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="270">
          </el-table-column>
          <el-table-column
            prop="department"
            label="入职时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="车辆信息"
            width="270">
          </el-table-column>
          <el-table-column
            prop="address"
            label="岗位">
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
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
      <AddPerson :isShow="isAdd" :isEdit="isEdit" :listDepartment="listDepartment" :editDetail="editDetail" @close="closeAdd" />
      <Loading :loading="loading" />
    </main>
    <add-person />
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
// import EditButton from '@/components/EditButton/index'
// import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddPerson from '@/components/AddPerson/index'
import Loading from '@/components/Loading/index'
import {getStaffList} from '@/api/staff/index'
import {getDepartmentList} from '@/api/department'


export default {
  name: 'Employee',
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddPerson,
    Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:0
      },
      isAdd:false,
      isEdit:false,
      editDetail:{},
      list:[],
      listDepartment:[],
      loading:false,
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
      value3:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
  },
  created() {
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
  },
  methods: {
    keyWordsQuery(){

    },
    editItem(){

    },
    deleteItem(){

    },
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.isEdit = item.isShow 
    },
    getDepartmentList(){
        let that = this
        getDepartmentList().then(res=>{
          that.listDepartment=res.data
        })
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      data.quit=true
      getStaffList(data).then(res=>{
          that.list = res.data.dataList
          that.loading = false
      }).catch(error=>{
          that.loading = false
      })
    },
      tableRowClassName({row, rowIndex}){
        //修改table行的颜色
        if(rowIndex%2 != 1){
          return 'odd-row'
        }
      }
  }
}
</script>
<style scoped>
/* .filter-label{
  font-weight: 500;
} */
.filter-time{
  margin-left: 34px;
}

</style>
