<template>
  <div class="flex-start">
    <div class="key-input-box">
      <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        size="medium"
        v-model="keyWords">
      </el-input>
    </div>
    <div class="key-btn">
      <el-button>查询</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchKey',
  props: {
    keyWords: {
      type: String
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
.key-input-box{
  width: 252px;
}
.key-btn{
  margin-left: 8px;
  
}
.el-button{
  background: #f35d4d;
  color: #ffffff;
}
.el-button:hover{
  background: #fb8f83;
}

</style>
