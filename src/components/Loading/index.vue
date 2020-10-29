<template>
  <div class="loading-mask" v-show="loading">
      <!-- <i class="el-icon-loading loading-icon position-center" /> -->
      <!-- <i class="el-icon-refresh loading-icon position-center" /> -->
      <!-- <i class="el-icon-refresh-right loading-icon position-center" /> -->
      <img src="@/assets/loading.png" class="position-center loading-icon" alt="">
  </div>
</template>

<script>

export default {
  name: 'Loading',
  components: {},
  props:{
    loading:{
      type:Boolean
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
.loading-mask{
    width: 100%;
    height: 100%;
    /* background: rgba(255, 255, 255, 0.87); */
    position: absolute;
    left: 0;
    top: 0;
}
.loading-icon{
    display: block;
    font-size: 100px;
    color: rgb(0, 183, 255);
    animation: refresh .5s linear infinite;
}
@keyframes refresh {
    from{
        transform:translateX(-50%) translateY(-50%) rotate(0deg);
    }
    to{
        transform:translateX(-50%) translateY(-50%) rotate(360deg);
    }
}
</style>
