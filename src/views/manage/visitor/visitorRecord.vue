<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">访客管理-访客记录</p>
    </header>
    <main class="content-main relative">
      <div class="key-words-box flex-between">
        <div class="flex-start">
          <search-key @query="keyWordsQuery"/>
          <div class="btn-box flex-start ml20">
            <add-button @addShow="addShow"/>
          </div>
        </div>
      </div>
      <div class="all-table ">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type=index
            width="80">
          </el-table-column>
          <el-table-column
            prop="image"
            label="头像"
            width="120">
            <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <el-image 
                    fit="scale-down"
                    lazy
                    :preview-src-list="imgList"
                    :src="scope.row.image">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="intervieweeName"
            label="访问对象">
          </el-table-column>
          <el-table-column
            prop="visitTime"
            label="访问时间">
          </el-table-column>
          <el-table-column
            prop="leaveTime"
            label="离开时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="flex-start">
                  <el-button type="success" @click="detailItem(scope.row)" size="mini">详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
        <Loading :loading="loading" />
    </main>
    <AddVisitor :isShow="isAdd" :isEdit="isEdit" :isDetail="isDetail" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import SearchKey from '@/components/searchKey/index'
import AddButton from '@/components/AddButton/index'
import EditButton from '@/components/EditButton/index'
import DelButton from '@/components/DelButton/index'
import Paging from '@/components/Paging/index'
import AddVisitor from '@/components/AddVisitor/index'
import {getVisitorList} from '@/api/visitor/index'
import {getDictionaryList} from '@/api/dictionary'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
import Loading from '@/components/Loading/index'

export default {
  name: 'VisitorRecord',
  components: {
    SearchKey,
    AddButton,
    EditButton,
    DelButton,
    Paging,
    AddVisitor,
    DictionarySelect,
    Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10,
        status:'PASS'
      },
      list:[],
      loading:false,
      isAdd:false,
      isEdit:false,
      isDetail:false,
      editDetail:{},
      total:0,
      imgList:[]
      } 
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    keyWordsQuery(val){
      this.pageData.keyword = val
      this.pageData.pageIndex = 1
      this.getList()
    },
    addShow(value){
      console.log('addShow',value)
      this.isAdd = value
    },
    detailItem(item){
      this.isAdd = true
      this.isDetail = true
      this.editDetail = item
    },
    changeCarType(){
      this.pageData.pageIndex = 1
      this.getList()
    },
    closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.isEdit = item.isShow 
        that.isDetail = item.isShow 
        this.editDetail = {}
    },
    getList(){
      let data = this.pageData
      let that = this
      that.loading = true
      getVisitorList(data).then(res=>{
        let {dataList,total} = res.data
        let img_list = []
        dataList.forEach(el=>{
          img_list.push(el.image)
        })
          this.imgList = img_list
          that.list = dataList
          that.total = total
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
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #e6e6e6;
  margin: 0 auto;
}
.headPortrait-box img{
  height: 100%;
  width: 100%;
}
</style>
