<template>
  <div class="mobile-visitor">
      <img src="@/assets/bg_index.png" class="bj"/>
      <div class="take-box">
          <!--<span class="url"></span>-->
          <header id="header-visit">访客登记</header>
          <img v-if="!isImgSrc" class="take-img" src="@/assets/take.png" @click="takePhoto" alt=""/>
          <p v-if="!isImgSrc" class="test">添加人脸照片</p>
          <!--<canvas id="canvas" style="opacity: 0;"></canvas>-->
          <input id="inputFile" type="file" ref="inputFile" capture="camera" @change="changePhoto"  accept="image/*"/>
          <!-- <img :src="imgSrc" v-if="isImgSrc"> -->
          <el-image
            @click="takePhoto"
            v-if="isImgSrc"
            style="width: 2rem; height: 3rem;margin-top:.05rem"
            :src="imgSrc"
            fit="cover">
            </el-image>
      </div>
      <div class="add-box">
          <p class="ss"></p>
          <p>添加身份信息</p>
          <div class="add-info">
              <div class="input-box">
                  <label for="">姓名:</label>
                  <input type="text" id="name" class="name" v-model="visitorInfo.name">
              </div>
              <div class="input-box">
                  <label for="">身份证号:</label>
                  <input type="text"  id="idCard" class="idCard name" v-model="visitorInfo.idNumber">
              </div>
              <div class="input-box">
                  <label for="">手机号:</label>
                  <input type="text" id="mobile" class="mobile name" v-model="visitorInfo.mobile">
              </div>
              <div class="input-box">
                  <label for="">访问对象:</label>
                  <input type="text" id="intervieweeName" class="mobile name" v-model="visitorInfo.intervieweeName">
              </div>
              <div class="input-box">
                  <label for="">访问时间:</label>
                  <div @click="openVisit">
                    <input type="text" id="visitTime" placeholder="请选择访问时间" disabled v-model="visitorInfo.visitTime" class="mobile name">
                  </div>
                  <mt-datetime-picker
                    :start-date="startVisitDate"
                    @confirm="changeVisitTime"
                    ref="visit"
                    year-format="{value}年" 
                    month-format="{value}月" 
                    date-format="{value}日" 
                    hour-format="{value}时"
                    minute-format="{value}分"
                    type="datetime">
                  </mt-datetime-picker>
              </div>
              <div class="input-box">
                  <label for="">离开时间:</label>
                  <div @click="openLeave">
                    <input type="text" id="leaveTime" placeholder="请选择离开时间" disabled v-model="visitorInfo.leaveTime" class="mobile name">
                  </div>
                  <mt-datetime-picker
                    :start-date="startVisitDate"
                    @confirm="changeleaveTime"
                    ref="leave"
                    year-format="{value}年" 
                    month-format="{value}月" 
                    date-format="{value}日" 
                    hour-format="{value}时"
                    minute-format="{value}分"
                    type="datetime">
                  </mt-datetime-picker>
              </div>
          </div>
      </div>
      <p class="btn" id="sure" @click="addVisitor">完成</p>
      <div class="mask" v-show="loading">
          <div class="loading-img-box">
              <div style="height: 100%;" class="column-center">
                  <img class="loading-img" src="images/Loading.png" alt="">
                  <p class="loading-test">正在上传</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from "moment";
import { saveOrUpdate } from "@/api/visitor/index";
import Tools from '@/utils/tools';
import '@/utils/exif'

export default {
  name: 'MobileVisitor',
  components: {},
  data() {
    return {
      startVisitDate:new Date(),
      visitorInfo: {
        idNumber: '',
        image: '',
        intervieweeName: '',
        leaveTime: '',
        mobile: '',
        name: '',
        visitTime: '',
      },
      loading:false,
      isImgSrc:false,
      imgSrc:null
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    openVisit() {
      this.$refs.visit.open();
    },
    openLeave(){
      this.$refs.leave.open();
    },
    changeVisitTime(val){
      this.visitorInfo.visitTime = moment(val).format('YYYY-MM-DD HH:mm:ss') 
    },
    changeleaveTime(val){
      this.visitorInfo.leaveTime = moment(val).format('YYYY-MM-DD HH:mm:ss') 
    },
    takePhoto(){
      this.$refs.inputFile.click()
    },
    changePhoto(e){
      let that = this
      let file=e.target.files[0]; 
        var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                let imgUrl = e.target.result
                EXIF.getData(file, function () {
                    let exifTags = EXIF.getAllTags(this);
                    Tools.getImgData(imgUrl, exifTags,(data)=>{
                       that.visitorInfo.image = Tools.dataURLtoFile(data,'file')
                       that.imgSrc = data
                       that.isImgSrc = true
                    })
                })
            }
    },
    addVisitor() {
      let that = this;
      let data = that.visitorInfo;
      let fd = new FormData()
      if(!Tools.isPhone(data.mobile)){
        that.$message({
            message: '电话号码格式不正确',
            type: 'warning'
        });
        return
      }
      if(!Tools.verifyID(data.idNumber)){
        that.$message({
            message: '身份证号码格式不正确',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.leaveTime)){
        that.$message({
            message: '请选择离开时间',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.visitTime)){
        that.$message({
            message: '请选择访问时间',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.name)){
        that.$message({
            message: '请输入访客姓名',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.intervieweeName)){
        that.$message({
            message: '请输入访问对象',
            type: 'warning'
        });
        return
      }
      if(Tools.isEmpty(data.image)){
          that.$message({
              message: '请拍摄头像',
              type: 'warning'
          });
          return
        }
      // data.leaveTime = moment(data.leaveTime).format('YYYY-MM-DD HH:mm:ss')
      // data.visitTime = moment(data.visitTime).format('YYYY-MM-DD HH:mm:ss')
      fd.append('idNumber',data.idNumber)
      fd.append('intervieweeName',data.intervieweeName)
      fd.append('leaveTime',data.leaveTime)
      fd.append('imgFile',data.image)
      fd.append('mobile',data.mobile)
      fd.append('name',data.name)
      fd.append('visitTime',data.visitTime)
      that.loading = true
      saveOrUpdate(fd).then((res) => {
        that.$message({
            message: '新增访客成功，请到审核页面查看',
            type: 'success'
        });
        that.loading = false
         this.$emit("close", { isShow: false, isSuccess: true });
         this.empty()
      }).catch(error=>{
        that.loading = false
      })
    },
  }
}
</script>
<style scoped>
input:disabled {
  background: transparent;
}
.bj{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}
.take-box{
    width:88.8vw;
    /* height: 30.68vh; */
    height: 4.1rem;
    border-radius: .07rem;
    background: #fff;
    margin: 0 auto;
    margin-top: .78rem;
}
header{
    width: 100%;
    height: .83rem;
    line-height: .83rem;
    background: #32b16c;
    color: #fff;
    font-size: .24rem;
    text-align: center;
    border-top-left-radius: .07rem;
    border-top-right-radius: .07rem;
}
.take-img{
    width: 20.09vw;
    display: inline-block;
    margin: .38rem auto;
    /* margin-top: 2.92vh; */
}
.take-box{
    font-size: .24rem;
    text-align: center;
}
.add-box{
    width: 88.8vw;
    margin: 0 auto;
    margin-top: .59rem;
}
.add-box p{
    font-size: .24rem;
}
.add-info{
    width: 100%;
    /* height: 16.93vh; */
    background: #fff;
    border-radius: .07rem;
    padding: .28rem 3.98vw;
    margin-top: .19rem;
}
.input-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .17rem;
    font-size: .24rem;
}
.name{
    width: 57.96vw;
    height: .6rem;
    border-radius: .04rem;
    border: 1px solid #666;
    padding-left: .05rem;
}
.input-box label{
    width: 21vw;
    text-align: right;
    margin-right: 1vw;
    font-size: .24rem;
}
.btn{
    width: 88.8vw;
    height: .81rem;
    line-height: .81rem;
    border-radius: .07rem;
    background: #32b16c;
    color: #fff;
    font-size: .24rem;
    margin: 0 auto;
    margin-top: .81rem;
    text-align: center;
}
#inputFile{
    width: 100%;
    height: 3rem;
    position: absolute;
    left: 50%;
    top: 1.6rem;
    transform: translateX(-50%);
    opacity: 0;
}
.mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    position: fixed;
    left: 0;
    top: 0;
    display: none;
}
.loading-img {
    width: .48rem;
    animation: rote 1s linear infinite;
    display: block;
    margin-bottom: .1rem;
}
.loading-img-box{
    width: 2rem;
    height: 1.5rem;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
}
.column-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.loading-test{
    font-size: .18rem;
}
@keyframes rote {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}

</style>
