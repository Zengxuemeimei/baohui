<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">出入记录-车辆管理</p>
    </header>
    <main class="content-main relative">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery"/>
      </div>
      <div class="filter-box flex-between relative">
        <div class="flex-start">
          <div>
            <label class="filter-label">进/出：</label>
            <el-select clearable v-model="pageData.directionType" @change="changeDirectionType" placeholder="请选择">
              <el-option label="进" value="进"></el-option>
              <el-option label="出" value="出"></el-option>
            </el-select>
          </div>
          <div class="filter-time ml20">
            <label class="filter-label">进出时间：</label>
            <el-date-picker
               clearable
              @change="changeTime"
              v-model="accessTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <!-- <div class="person-total flex-center flex-column">
            <div class="flex-start">
                <p class="f30">
                    <count-to
                    ref="example"
                    :start-val="0"
                    :end-val="520"
                    :duration="4000"
                    :autoplay="true"
                    class="example"
                    />
                </p>
                <p class="f14 ml5 mt5">辆</p>
            </div>
            <p class="mt5 f14">今日车辆进出数量</p>
        </div> -->
      </div>
      <div class="all-table">
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
            prop="carNumber"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="personName"
            label="车主姓名">
          </el-table-column>
           <el-table-column
            prop="idNumber"
            label="车主身份证号">
          </el-table-column>
          <el-table-column
            prop="department"
            label="图片">
            <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <el-image 
                    fit="scale-down"
                    lazy
                    :preview-src-list="imgList"
                    :src="scope.row.accessImage">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
             </template>
          </el-table-column>
          <!-- <el-table-column
            label="视频">
            <div class="headPortrait-box flex-center">
              <i class="el-icon-video-camera" />
            </div>
          </el-table-column> -->
          <el-table-column
            prop="liveAddress"
            label="出入地点">
          </el-table-column>
          <el-table-column
            prop="accessTime"
            label="出入时间">
            <template slot-scope="scope">
              {{scope.row.accessTime | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column
            prop="direction"
            label="出入方向">
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging  :total="total" @getCurrentPage="getPage"/>
      </div>
      <Loading :loading="loading" />
    </main>
    <!-- <AccessPerson :isShow="isDetail" :editDetail="editDetail" @close="closeAdd"/> -->
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import Paging from '@/components/Paging/index'
import SearchKey from '@/components/searchKey/index'
import AccessPerson from '@/components/AccessDetail/person'
import {getAccessCarList} from '@/api/accessRecords/index'
import Loading from "@/components/Loading/index";

export default {
  name: 'CarRecords',
  components: {
      SearchKey,
      countTo,
      Paging,
      AccessPerson,
      Loading
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10
      },
      list:[],
      isDetail:false,
      loading:false,
      editDetail:{},
      total:0,
      accessTime:null,
      imgList:[]
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
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
        this.isDetail = value
      },
      closeAdd(item){
          let that = this
          if(item.isSuccess){
              that.getList()
          }
          that.isDetail = item.isShow
      },
      changeTime(val){
        if(val){
          this.pageData.accessStartTime = new Date(val[0]).getTime()
          this.pageData.accessEndTime = new Date(val[1]).getTime()
        }else{
          this.pageData.accessStartTime = null
          this.pageData.accessEndTime = null 
        }
          this.getList()
      },
      changeDirectionType(val){
        if(val){
          this.pageData.directionType = val
        }else{
          this.pageData.directionType = null
        }
        this.pageData.pageIndex = 1
        this.getList()
      },
      getList(){
        let data = this.pageData
        data.temporary = false
        let that = this
        that.loading = true
        getAccessCarList(data).then(res=>{
            let {dataList,total} = res.data
          that.list = dataList
          that.total = total
          let img_list = []
          dataList.forEach(el=>{
              img_list.push(el.accessImage)
          })
          that.imgList = img_list
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
.person-total{
    width: 215px;
    height: 80px;
    background: #F35D4D;
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ffffff;
}
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #eeeded;
  margin: 0 auto;
}
</style>
