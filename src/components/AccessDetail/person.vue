<template>
  <div>
      <el-dialog
        title="人员信息"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>姓名</th>
                    <td></td>
                    <th>身份证号</th>
                    <td></td>
                    <th>联系电话</th>
                    <td></td>
                    <th>所属部门</th>
                    <td></td>
                </tr>
                <tr>
                    <th>出入地点</th>
                    <td></td>
                    <th>出入时间</th>
                    <td></td>
                    <th>进出方向</th>
                    <td></td>
                    <th>相似度</th>
                    <td></td>
                </tr>
            </table>
            <span class="person-info-title">抓拍信息</span>
            <div class="flex-start flex-end ml50">
                <div class="alarm-img-box alarm-video-box">
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
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AccessPerson',
  components: {},
  props:{
      isShow:{
          type:Boolean
      }
  },
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
        this.$emit("close", { isShow: false, isSuccess: false });
    },
  }
}
</script>
<style scoped>
/* .alarm-img-box{
    width: 250px;
    height: 350px;
    background: cornflowerblue;
} */
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
