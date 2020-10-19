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
                    <td>
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.mobile"
                        />
                    </td>
                    <th>事件描述</th>
                    <td colspan="3">
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.describe"
                        />
                    </td>
                </tr>
                <tr>
                    <th>告警类型</th>
                    <td>
                        <!-- <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.mobile"
                        /> -->
                    </td>
                    <th>告警时间</th>
                    <td>
                        <el-date-picker
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </td>
                    <th>处置状态</th>
                    <td colspan="1"></td>
                </tr>
                <tr>
                    <th>处理人</th>
                    <td>
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.name"
                        />
                    </td>
                    <th>处理结果描述</th>
                    <td colspan="3">
                        <input
                            type="text"
                            class="input-form"
                            v-model="alarmInfo.resultDescribe"
                        />
                    </td>
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
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/alarmCenter'

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
        alarmInfo:{
            describe:null,
            imageUrl:null,
            manageResult:null,
            manageStatus:null,
            name:null,
            resultDescribe:null,
            riskType:null,
            videoUrl:null
        },
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
