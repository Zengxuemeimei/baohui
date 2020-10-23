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
      <ul class="person-menu mt20 mb20" v-if="total > 0">
        <li v-for="item in list" :key="item.id" class="">
          <div class="img-box relative">
            <!-- <img :src="item.accessImage" alt="" /> -->
            <el-image 
              style="width:100%;height:100%"
                fit="cover"
                :src="item.accessImage">
                <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                    <i class="el-icon-picture-outline f30"></i>
                    <span class="mt10">加载失败</span>
                </div>
            </el-image>
            <p class="car-num" v-if="item.carNumber">{{item.carNumber}}</p>
          </div>
          <el-button type="primary"  @click="setControl(item)">{{item.control?'撤控':'布控'}}</el-button>
        </li>
      </ul>
      <div v-if="total == 0" class="flex-center" style="width:100%">
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

export default {
  name: "TemporaryList",
  components: {
      Paging
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
        pageSize:16
      },
      total:0,
      loading:false,
      list:[]
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
          that.list = res.data.dataList
          that.total = res.data.total
          that.loading = false
      }).catch(error=>{
         that.loading = false
      })
    },
    setControl(item){
      let data = {
        // control :null,
        id:item.id
      }
      if(item.control){
        data.control = false
      }else{
         data.control = true
      }
      setControl(data).ten(res=>{
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
/* .person-menu li{
    width: 120px;
    margin-bottom: 75px;
} */
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
.el-button--primary{
    width: 120px;
    height: 30px;
    line-height: 30px;
    padding: 0;
}
</style>
