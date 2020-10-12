<template>
  <div id="app">
    <router-view v-if="isRouterAlice"/>
  </div>
</template>

<script>
import '@/styles/base.scss'
import '@/styles/common.scss'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
       isRouterAlice: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlice = false
      this.$nextTick(function() {
        this.isRouterAlice = true
      })
    }
  }
}
</script>
