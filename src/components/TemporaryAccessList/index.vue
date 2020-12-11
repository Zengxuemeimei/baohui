<template>
  <div>
      <main class="content-main relative">
      <div class="key-box flex-start">
        <div class="key-input-box">
          <el-input placeholder="请选择图片" v-model="input22">
            <i slot="suffix" class="el-input__icon el-icon-picture-outline" />
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="ml20">
          <el-button type="danger">以图搜图</el-button>
        </div>
      </div>
      <div class="all-table">
        <el-table
          border
          header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column label="车牌号" prop="licensePlateNumber">
          </el-table-column>
          <el-table-column prop="headPortrait" label="人员图片" width="120">
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
          <el-table-column label="出入时间">
            <template slot-scope="scope">
              {{scope.row.accessTime | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="accessStatus" label="出入方向">
            <template slot-scope="scope">
              {{scope.row.accessStatus ? '出':'进'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging v-if="total > 0" :total="total" @getCurrentPage="getPage"/>
      </div>
      <Loading :loading="loading" />
    </main>
  </div>
</template>

<script>
import Paging from '@/components/Paging/index'
import { getAccessPersonList,getAccessCarList } from '@/api/accessRecords'
import Loading from "@/components/Loading/index";

export default {
  name: 'TemporaryAccessList',
  components: {
    Paging,
    Loading
  },
  props:{
    temporary:{
      type:String,
    }
  },
  data() {
    return {
      total:0,
      list:[],
      input22:null,
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10
      },
      loading:false,
      imgList:[]
    }
  },
  created() {
  },
  mounted() {
    if(this.temporary == 'person'){
      this.getPersonList()
    }else{
      this.getCarList()
    }
  },
  methods: {
    getPage(val){
        this.pageData.pageIndex = val
        if(this.temporary == 'person'){
          this.getPersonList()
        }else{
          this.getCarList()
        }
    },
    getPersonList(){
      let that = this
      let data = that.pageData
      data.temporary = true
      that.loading = true
      getAccessPersonList(data).then(res=>{
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
    getCarList(){
      let that = this
      let data = that.pageData
      data.temporary = true
      that.loading = true
      getAccessCarList(data).then(res=>{
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
  },
  watch:{
    temporary(newVal){
        if(newVal == 'person'){
          this.getPersonList()
        }else{
          this.getCarList()
        }
    }
  }
}
</script>
<style scoped>
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #dad8d8;
  margin: 0 auto;
  /* color: #ffffff; */
}
</style>
