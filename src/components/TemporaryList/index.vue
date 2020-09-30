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
      <ul class="person-menu mt20 mb20">
        <li v-for="item in 30" :key="item" class="">
          <div class="img-box">
            <img src="" alt="" />
          </div>
          <el-button type="primary">布控</el-button>
        </li>
      </ul>
      <div class="flex-between mt20">
        <p></p>
        <paging />
      </div>
    </main>
  </div>
</template>

<script>
import Paging from '@/components/Paging/index'
export default {
  name: "TemporaryList",
  components: {
      Paging
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
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
    background: #d2d2d2;
    margin-bottom: 3px;
    border-radius: 5px;
}
.el-button--primary{
    width: 120px;
    height: 30px;
    line-height: 30px;
    padding: 0;
}
</style>
