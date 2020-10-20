<template>
  <div>
    <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next"
        @current-change="changePaging"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Paging',
  components: {},
  props:{
    total:{
      type:Number,
      default:0
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
    changePaging(val){
      console.log(val)
      this.$emit('getCurrentPage',val)
    }
  }
}
</script>
<style scoped>

</style>
