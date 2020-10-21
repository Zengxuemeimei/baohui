<template>
  <div>
    <div class="menu-list" v-for="item in list" :key="item.id">
      <el-option :value="item.code" :label="item.name"> </el-option>
      <template v-if="item.children">
          <div class="ml20">
            <DictionarySelect :list="item.children"/>
          </div>
      </template>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "DictionarySelect",
  components: {},
  props:{
      list:Array
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
