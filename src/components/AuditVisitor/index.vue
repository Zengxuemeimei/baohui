<template>
  <div>
      <el-dialog
        title="访客审核"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">访客基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>姓名</th>
                    <td></td>
                    <th>身份证号</th>
                    <td></td>
                    <th>常用电话</th>
                    <td></td>
                </tr>
                <tr>
                    <th>访问时间</th>
                    <td></td>
                    <th>离开时间</th>
                    <td></td>
                    <th>访问对象</th>
                    <td></td>
                </tr>
                <tr>
                    <th>审核情况</th>
                    <td>
                        <el-radio-group v-model="result">
                            <el-radio label="past">通过</el-radio>
                            <el-radio label="failed">未通过</el-radio>
                        </el-radio-group>
                    </td>
                    <th>未通过原因</th>
                    <td colspan="3"></td>
                </tr>
            </table>
            <span class="person-info-title">采集照片</span>
            <div class="visitor-img-box flex-start ml50">
                <div class="img-box">
                    <img src="" alt="">
                </div>
            </div>
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
  name: 'AuditVisitor',
  components: {},
  data() {
    return {
        dialogVisible:true,
        result:'past'
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
.el-radio{
    margin-right: 8px;
}
.person-table th,.person-table td{
    width: 152px;
}
.el-radio__label{
    padding-left: 5px;
}
.visitor-img-box .img-box{
    width: 250px;
    height: 350px;
    overflow: hidden;
    background: #e6e6e6;
}
</style>
