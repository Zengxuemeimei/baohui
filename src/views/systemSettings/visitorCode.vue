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
      url:"http://192.168.1.120:9528/#/mobileVisitor",
      imgUrl:require("@/assets/yg.png")
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
.code-box{
  width: 100%;
  height: 70vh;
}
</style>
