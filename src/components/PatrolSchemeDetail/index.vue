<template>
  <div>
    <el-dialog
        title="巡更记录详情"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">详情信息</span>
                <table class="person-table mb20 ml50" border="1">
                    <tr>
                        <th>方案名称</th>
                        <td></td>
                        <th>巡更时间</th>
                        <td></td>
                        <th>方案类型</th>
                        <td style="width:300px"></td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td colspan="1"></td>
                        <th>完成进度</th>
                        <td colspan="1"></td>
                        <th>巡检人员</th>
                        <td colspan="1"></td>
                    </tr>
                    <tr>
                        <th>巡检记录描述</th>
                        <td colspan="4"></td>
                    </tr>
                </table>
                <div class="ml50">
                    <div class="flex-start">
                        <p>巡更点位检查结果</p>
                    </div>
                    <table class="person-table mt10" border="1">
                        <tr>
                            <th style="width:80px">序号</th>
                            <th style="width:220px">点位名称</th>
                            <th style="width:210px">打卡时间</th>
                            <th style="width:220px">巡更人员</th>
                            <th style="width:210px">是否异常</th>
                        </tr>
                        <tr>
                            <td style="width:80px">1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="flex-start mt10">
                        <p>未打卡人员消息推送</p>
                        <i class="el-icon-message f20 ml5"  style="color:#90AFDA"/>
                    </div>
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
  name: 'PatrolSchemeDetail',
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
