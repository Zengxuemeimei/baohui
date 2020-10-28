<template>
  <div>
      <main class="content-main">
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
          <el-table-column prop="headPortrait" label="人员图片" width="120">
            <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <!-- <img :src="scope.row.image"  @error="defaultBackImg"> -->
                    <el-image 
                    fit="scale-down"
                    lazy
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
          <el-table-column prop="address" label="出入方向"> </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging v-if="total > 0" :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
  </div>
</template>

<script>
import Paging from '@/components/Paging/index'
import { getAccessPersonList,getAccessCarList } from '@/api/accessRecords'
export default {
  name: 'TemporaryAccessList',
  components: {
    Paging
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
      },
      loading:false
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
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    getPersonList(){
      let that = this
      let data = that.pageData
      data.temporary = true
      that.loading = true
      getAccessPersonList(data).then(res=>{
          that.list = res.data.dataList
          that.total = res.data.total
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
          that.list = res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
         that.loading = false
      })
    },
  },
  watch:{
    temporary(newVal){
      console.log('切换',newVal)
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
