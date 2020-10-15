<template>
  <div>
    <div class="menu-list" v-for="item in list" :key="item.id">
      <el-option :value="item.id" :label="item.name"> </el-option>
      <template v-if="item.children">
          <div class="ml20">
            <DepartmentSelect :list="item.children"/>
          </div>
      </template>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentSelect",
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
