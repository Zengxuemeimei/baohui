<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">安全隐患管理</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery"/>
      </div>
      <div class="filter-box flex-between">
        <div class="flex-start">
          <div>
            <label class="filter-label">处理状态：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
        </div>
      </div>
      <div class="all-table">
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
            prop="title"
            label="标题"
            width="270">
          </el-table-column>
          <el-table-column
            prop="eventDescribe"
            label="事件描述"
            width="270">
          </el-table-column>
          <el-table-column
            prop="reportTime"
            label="上报时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="address"
            label="上报人"
            width="146">
          </el-table-column>
          <el-table-column
            prop="level"
            label="隐患级别"
            width="146">
          </el-table-column>
          <el-table-column
            prop="manageTime"
            label="处理时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="manageStatus"
            label="处理状态"
            width="146">
          </el-table-column>
          <el-table-column
            prop="address"
            label="处理人"
            width="146">
          </el-table-column>
          <el-table-column
            prop="manageDescribe"
            label="处理描述">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="">
                <div class="flex-start">
                  <el-button type="primary"  size="mini">编辑</el-button>
                  <!-- <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button> -->
                </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p>双击进入详情页面</p>
        <paging />
      </div>
    </main>
    <AddHiddenDanger :isShow="isAdd" :isEdit="isEdit" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddHiddenDanger from '@/components/AddHiddenDanger/index'
import {getHiddenDangerList} from '@/api/hiddenDanger'

export default {
  name: 'HiddenDanger',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddHiddenDanger
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:0
      },
      loading:false,
      isAdd:false,
      isEdit:false,
      editDetail:{},
      list:[],
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
  },
  methods: {
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 0
      this.getList()
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
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getHiddenDangerList(data).then(res=>{
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
