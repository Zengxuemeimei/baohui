<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">访客二维码</p>
    </header>
    <main class="content-main">
      <div class="code-box flex-center">
          <vue-qr :logoSrc="imgUrl" :text="url" :size="400"></vue-qr>
      </div>
    </main>
  </div>
</template>

<script>
import vueQr from 'vue-qr'

export default {
  name: 'VisitorCode',
  components: {vueQr},
  data() {
    return {
      url:"",
      imgUrl:require("@/assets/yg.png")
    }
  },
  created() {
  },
  mounted() {
    this.url = window.location.protocol + "//" + window.location.host + '/#/mobileVisitor'
    console.log(window.location.protocol)
  },
  methods: {
  }
}
</script>
<style scoped>
.code-box{
  width: 100%;
  height: 70vh;
}
</style>
