<template>
  <div>
    <el-dialog
        title="新增地址"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">地址信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>点位名称</th>
                        <td style="width:750px"></td>
                    </tr>
                    <tr>
                        <th>视频播放地址</th>
                        <td style="width:750px"></td>
                    </tr>
                    <tr>
                        <th>点位地址</th>
                        <td style="width:750px"></td>
                    </tr>
                </table>
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
  name: 'AddMonitor',
  components: {},
  data() {
    return {
        dialogVisible:true,
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

</style>
