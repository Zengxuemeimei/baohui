<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">设备管理</p>
    </header>
    <main class="content-main">
      <div class="btn-box flex-start">
            <add-button @addShow="addShow"/>
        </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          ref="multipleTable"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="设备序列号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="设备IP">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="status"
            label="设备类型">
          </el-table-column>
         <el-table-column
            prop="address"
            label="操作"
            width="270">
            <template slot-scope="scope">
                <div class="flex-start">
                    <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
                    <el-button type="danger" @click="deleteList(scope.row.id)" size="mini">删除</el-button>
                </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </main>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'

export default {
  name: 'Equipment',
  components: {AddButton},
  data() {
    return {
      isAdd:false,
      list:[]

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addShow(value){
      let that = this
      that.isAdd = value
    },
  }
}
</script>
<style scoped>

</style>
