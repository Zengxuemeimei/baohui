<template>
  <div>
    <el-dialog
        title="新增地址"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">地址信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>点位名称</th>
                        <td style="width:750px">
                           <input type="text"  class="input-form" v-model="videoInfo.name" />
                        </td>
                    </tr>
                    <tr>
                        <th>视频播放地址</th>
                        <td style="width:750px">
                          <input type="text"  class="input-form" v-model="videoInfo.videoUrl" />
                        </td>
                    </tr>
                    <tr>
                        <th>点位地址</th>
                        <td style="width:750px">
                          <input type="text"  class="input-form" v-model="videoInfo.address" />
                        </td>
                    </tr>
                </table>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addMonitor">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/monitor/index'
export default {
  name: 'AddMonitor',
  components: {},
  props:{
    isShow:{
      type:Boolean
    },
    isEdit:{
      type:Boolean
    },
  },
  data() {
    return {
        videoInfo:{
          address: null,
          name:null,
          videoUrl: null
        }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose() {
        this.empty()
        this.$emit("close", { isShow: false, isSuccess: false });
      },
      empty(){
         this.videoInfo={
          address: null,
          name:null,
          videoUrl: null
        }
      },
      addMonitor(){
        let data = this.videoInfo
        saveOrUpdate(data).then(res=>{
          this.empty()
          this.$emit("close", { isShow: false, isSuccess: true });
        })
      }
  }
}
</script>
<style scoped>

</style>
