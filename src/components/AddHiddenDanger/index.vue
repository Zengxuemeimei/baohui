<template>
  <div>
    <el-dialog
        title="新增隐患登记"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">上报信息</span>
                <table class="person-table mb40 ml50" border="1">
                     <tr>
                        <th>上报人</th>
                        <td>zengxuemei</td>
                        <th>上报时间</th>
                        <td></td>
                        <th>隐患级别</th>
                        <td style="width:300px">12</td>
                    </tr>
                    <tr>
                        <th>标题</th>
                        <td colspan="5">zengxuemei</td>
                    </tr>
                    <tr>
                        <th>事件描述</th>
                        <td colspan="5">zengxuemei</td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40">
                    <img src="" alt="">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传资料</span>
                    </el-upload>
                </div>
                <span class="person-info-title">处理信息</span>
                <table class="person-table mb40 ml50" border="1">
                     <tr>
                        <th>处理人</th>
                        <td>zengxuemei</td>
                        <th>处理时间</th>
                        <td></td>
                        <th>处理状态</th>
                        <td style="width:300px">12</td>
                    </tr>
                    <tr>
                        <th>处理描述</th>
                        <td colspan="5">zengxuemei</td>
                    </tr>
                </table>
                <span class="person-info-title">图片资料</span>
                <div class="ml50 mb40">
                    <img src="" alt="">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传资料</span>
                    </el-upload>
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
  name: 'AddHiddenDanger',
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
.person-content{
    height: 60vh;
    overflow: hidden;
}
</style>
