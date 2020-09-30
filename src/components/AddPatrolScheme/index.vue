<template>
  <div>
    <el-dialog
        title="新增方案"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">方案信息</span>
                <table class="person-table mb20 ml50" border="1">
                    <tr>
                        <th>方案名称</th>
                        <td></td>
                        <th>方案状态</th>
                        <td></td>
                        <th>方案类型</th>
                        <td style="width:300px"></td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td colspan="2"></td>
                        <th>重复计划</th>
                        <td colspan="2"></td>
                    </tr>
                </table>
                <div class="ml50">
                    <div class="flex-start">
                        <p>巡更点位设置</p>
                        <div class="ml5">
                            <el-button class="el-icon-circle-plus-outline" type="text"> 新增</el-button>
                        </div>
                        <!-- <i class="el-icon-circle-plus-outline" /> -->
                    </div>
                    <table class="person-table mt10" border="1">
                        <tr>
                            <th style="width:80px">序号</th>
                            <th style="width:200px">点位名称</th>
                            <th>时间</th>
                            <th style="width:532px">巡更人员</th>
                        </tr>
                        <tr>
                            <td style="width:80px">1</td>
                            <td style="width:200px"></td>
                            <td></td>
                            <td style="width:532px"></td>
                        </tr>
                    </table>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddPatrolScheme',
  components: {},
  data() {
    return {
        dialogVisible:true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose(done) {
        this.dialogVisible = false
      },
  }
}
</script>
<style scoped>
.person-content{
    max-height: 60vh;
    overflow: hidden;
}
</style>
