<template>
  <div>
      <el-button icon="el-icon-circle-plus-outline" @click="addEvent">新增</el-button>
  </div>
</template>

<script>

export default {
  name: 'AddButton',
  components: {},
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addEvent(){
        this.$emit('addShow',true)
    }
  }
}
</script>
<style scoped>
.el-button{
    color:#3e639f;
    margin-left: 6px;
}
</style>
