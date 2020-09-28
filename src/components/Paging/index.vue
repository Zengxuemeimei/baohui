<template>
  <div>
    <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next"
        :total="100000">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Paging',
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
  }
}
</script>
<style scoped>

</style>
