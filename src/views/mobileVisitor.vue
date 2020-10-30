<template>
  <div class="mobile-visitor">
      <img src="@/assets/bg_index.png" class="bj"/>
      <div class="take-box">
          <!--<span class="url"></span>-->
          <header id="header-visit"></header>
          <img class="take-img" src="@/assets/take.png" alt=""/>
          <p class="test">添加人脸照片</p>
          <!--<canvas id="canvas" style="opacity: 0;"></canvas>-->
          <input id="inputFile" type="file"  capture="camera"   accept="image/*"/>
      </div>
      <div class="add-box">
          <p class="ss"></p>
          <p>添加身份信息</p>
          <div class="add-info">
              <div class="input-box">
                  <label for="">姓名:</label>
                  <input type="text" id="name" class="name">
              </div>
              <div class="input-box">
                  <label for="">身份证号:</label>
                  <input type="text"  id="idCard" class="idCard name">
              </div>
              <div class="input-box">
                  <label for="">手机号:</label>
                  <input type="text" id="mobile" class="mobile name">
              </div>
          </div>
      </div>
      <p class="btn" id="sure">完成</p>
      <div class="mask">
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

export default {
  name: 'MobileVisitor',
  components: {},
  data() {
    return {

    }
  },
  created() {
    // var visitor = document.querySelector("mobile-visitor");
    //     // var body = document.querySelector("body");
    //     visitor.style.fontSize = visitor.offsetWidth / 750 * 100 + "px";
  },
  mounted() {
      // var visitor = document.querySelector(".mobile-visitor");
      //   // var body = document.querySelector("body");
      //   visitor.style.fontSize = visitor.offsetWidth / 750 * 100 + "px";
  },
  methods: {
  }
}
</script>
<style scoped>
/* .mobile-visitor{
  font-size: 100px;
} */
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
}
.name{
    width: 57.96vw;
    height: .6rem;
    border-radius: .04rem;
    border: 1px solid #666;
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
