<template>
  <div>
    <el-dialog
        title="新增菜单"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
            </el-scrollbar>
        </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddMenu',
  components: {},
  props: {
      isShow:{
        type: Boolean,
        default: false
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
    handleClose() {
        // this.isShow = false
        this.$emit('close',false)
    },
  }
}
</script>
<style scoped>

</style>
