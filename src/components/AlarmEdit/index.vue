<template>
  <div>
      <el-dialog
        title="告警信息"
        :visible.sync="isEdit"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>事件名称</th>
                    <td></td>
                    <th>事件描述</th>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <th>告警类型</th>
                    <td></td>
                    <th>告警时间</th>
                    <td></td>
                    <th>处置状态</th>
                    <td colspan="1"></td>
                </tr>
                <tr>
                    <th>处理人</th>
                    <td></td>
                    <th>处理结果描述</th>
                    <td colspan="3"></td>
                </tr>
            </table>
            <div class="flex-start flex-end ml50">
                <div class="alarm-img-box">
                    <img src="" alt="">
                </div>
                <div class="alarm-video-box ml20 relative">
                    <div class="play-box position-center flex-center">
                        <i class="el-icon-caret-right" />
                    </div>
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
  name: 'AlarmEdit',
  components: {},
  props:{
      isEdit:{
          type:Boolean
      }
  },
  data() {
    return {
        dialogVisible:false
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
.alarm-img-box{
    width: 250px;
    height: 350px;
    background: cornflowerblue;
}
.alarm-video-box{
    width: 350px;
    height: 250px;
    background: cornflowerblue;
}
.play-box{
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, .6);
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
}
</style>
