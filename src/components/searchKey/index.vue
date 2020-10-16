<template>
  <div class="flex-start">
    <div class="key-input-box">
      <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        size="medium"
        clearable
        @keyup.enter.native="query"
        v-model="keyWords">
      </el-input>
    </div>
    <div class="key-btn">
      <el-button @click="query">查询</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchKey',
  data(){
    return{
      keyWords:null
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    query(){
      if(this.keyWords){
        this.$emit('query',this.keyWords.trim())
      }else{
        this.$emit('query',null)
      }

    }
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
