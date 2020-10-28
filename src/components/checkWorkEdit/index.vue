<template>
  <div>
      <el-dialog
        title="编辑考勤信息"
        :visible.sync="isEdit"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">基本信息</span>
                <table class="person-table mb40 ml50" border="1" >
                    <tr>
                        <th>姓名</th>
                        <td>
                            <input
                                disabled
                                type="text"
                                class="input-form"
                                v-model="staffInfo.name"
                            />
                        </td>
                        <th>应出勤天数</th>
                        <td>
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.totalCountAttendance"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>实际出勤天数</th>
                        <td>
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.actualAttendanceCount"
                            />
                        </td>
                        <th>请假时长</th>
                        <td>
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.leaveDuration"
                            />
                        </td>
                    </tr>
                     <tr>
                        <th>迟到时长</th>
                        <td>
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.lateDuration"
                            />
                        </td>
                        <th>旷工时长</th>
                        <td>
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.absenteeismDuration"
                            />
                        </td>
                    </tr>
                     <tr>
                        <th>加班时长</th>
                        <td colspan="3">
                            <input
                                type="text"
                                class="input-form"
                                v-model="staffInfo.extendDuration"
                            />
                        </td>
                    </tr>
                </table>
            </el-scrollbar>
        </div>
         <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="editCheckWork">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {updateCheckWork} from '@/api/calendar/index'
export default {
  name: 'CheckWorkEdit',
  components: {},
  props:{
    isEdit:{
        type:Boolean
    },
    editDetail:{
      type:Object
    }
  },
  data() {
    return {
      staffInfo:{
        absenteeismDuration: null,
        actualAttendanceCount: null,
        extendDuration: null,
        lateDuration: null,
        leaveDuration: null,
        name: null,
        totalCountAttendance: null
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose(){
        this.$emit("close", { isShow: false, isSuccess: false });
      },
      editCheckWork(){
        updateCheckWork(this.staffInfo).then(res=>{
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });
            this.$emit("close", { isShow: false, isSuccess: true });
        })
      }
  },
  watch:{
    editDetail(newVal){
      if(newVal){
        this.staffInfo={
        absenteeismDuration: newVal.absenteeismDuration,
        actualAttendanceCount: newVal.actualAttendanceCount,
        extendDuration: newVal.extendDuration,
        lateDuration: newVal.lateDuration,
        leaveDuration: newVal.leaveDuration,
        name: newVal.name,
        totalCountAttendance: newVal.totalCountAttendance,
        id:newVal.id
      }
      }
    }
  }
}
</script>
<style scoped>

</style>
