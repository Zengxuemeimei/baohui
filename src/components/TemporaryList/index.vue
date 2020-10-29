<template>
  <div>
    <main class="content-main">
      <div class="key-box flex-start">
        <div class="key-input-box">
          <el-input placeholder="请选择图片" >
            <i slot="suffix" class="el-input__icon el-icon-picture-outline" />
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="ml20">
          <el-button type="danger">以图搜图</el-button>
        </div>
      </div>
      <ul class="person-menu mt20 mb20 relative" v-if="total > 0">
        <li v-for="item in list" :key="item.id" class="">
          <div class="img-box relative">
            <el-image 
              style="width:100%;height:100%"
                fit="cover"
                :preview-src-list="imgList"
                :src="item.accessImage">
                <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                    <i class="el-icon-picture-outline f30"></i>
                    <span class="mt10">加载失败</span>
                </div>
            </el-image>
            <p class="car-num" v-if="item.carNumber">{{item.carNumber}}</p>
          </div>
          <el-button type="primary" v-show="item.control"  @click="setControl(item)">{{item.control?'撤控':'布控'}}</el-button>
          <el-button type="danger" v-show="!item.control"  @click="setControl(item)">{{item.control?'撤控':'布控'}}</el-button>
        </li>
        <Loading :loading="loading" />

      </ul>
      <div v-if="isNoData" class="flex-center" style="width:100%">
          <div>
              <img src="@/assets/no_data.png" alt="">
              <p style="text-align: center;">暂无数据</p>
          </div>
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
import {getTemporaryInfoList,setControl} from '@/api/temporaryInfo/index';
import Loading from "@/components/Loading/index";

export default {
  name: "TemporaryList",
  components: {
      Paging,
      Loading
  },
  props:{
    controlType:{
      type:String
    }
  },
  data() {
    return {
      isClearKey:false,
      pageData:{
        keyword:null,
        pageIndex:1,
        pageSize:10
      },
      imgList:[],
      total:0,
      loading:false,
      list:[],
      isNoData:false
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    getList(){
      let that = this
      let data = that.pageData
      data.controlType = that.controlType
      that.loading = true
      getTemporaryInfoList(data).then(res=>{
        let {dataList,total} = res.data
          that.list = dataList
          that.total = total
          let img_list = []
          dataList.forEach(el=>{
              img_list.push(el.accessImage)
          })
          that.imgList = img_list
          if(res.data.total == 0){
            this.isNoData = true
          }else{
            this.isNoData = false
          }
          that.loading = false
      }).catch(error=>{
         that.loading = false
      })
    },
    setControl(item){
      let data = {
        id:item.id
      }
      if(item.control){
        data.control = false
      }else{
         data.control = true
      }
      setControl(data).then(res=>{
        this.getList()
      })
    }
  },
  watch:{
    controlType(newVal){
        this.getList()
    }
  }
};
</script>
<style scoped>
.person-menu{
    width: 100%;
    border: 1px solid #d2d2d2;
    padding: 40px 36px;
    background: #ffffff;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-row-gap: 75px;
    grid-column-gap: 30px;
}
.person-menu:after {
    content: "";
    width: 120px;
    display: block;
}
.img-box{
    width: 120px;
    height: 120px;
    background: #e6e6e6;
    margin-bottom: 3px;
    border-radius: 5px;
}
.car-num{
  background: rgba(0, 0, 0, .6);
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  width: 100%;
  text-align: center;
  line-height: 28px;
}
.el-button--primary,.person-menu .el-button--danger{
    width: 120px;
    height: 30px;
    line-height: 30px;
    padding: 0;
}
.person-menu .el-button--danger{
  margin-left: 0;
}
</style>
