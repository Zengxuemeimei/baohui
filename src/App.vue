<template>
  <div id="app">
    <router-view v-if="isRouterAlice"/>
  </div>
</template>

<script>
import '@/styles/base.scss'
import '@/styles/common.scss'
import Tools from './utils/tools'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
       isRouterAlice: true,
       staffSelect:[],
    }
  },
  mounted() {
    console.log('判断手机端',)
    if(Tools.isMobileUserAgent()){
      //手机端
      var html = document.querySelector("html");
        var body = document.querySelector("body");
        html.style.fontSize = html.offsetWidth / 750 * 100 + "px";
        html.style.background = '#ededed'
    }
  },
  methods: {
    reload() {
      this.isRouterAlice = false
      this.$nextTick(function() {
        this.isRouterAlice = true
      })
    },
  }
}
</script>
