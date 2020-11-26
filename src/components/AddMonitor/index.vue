<template>
  <div>
    <el-dialog
        :title="title"
        :visible.sync="isShow"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content" style="height:auto">
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
                        <th>部门</th>
                        <td style="width:750px">
                          <el-select clearable v-model="videoInfo.departmentId" placeholder="请选择">
                            <DepartmentSelect :list="listDepartment"/>
                          </el-select>
                          <!-- <input type="text"  class="input-form" v-model="videoInfo.videoUrl" /> -->
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
import DepartmentSelect from '@/components/Recursion/departmentSelect'

export default {
  name: 'AddMonitor',
  components: {DepartmentSelect},
  props:{
    isShow:{
      type:Boolean
    },
    isEdit:{
      type:Boolean
    },
    isDetail:{
      type:Boolean
    },
    editDetail:{
      type:Object
    },
    listDepartment:{
      type:Array
    }
  },
  data() {
    return {
        videoInfo:{
          address: null,
          name:null,
          videoUrl: null,
          departmentId:null
        },
        title:'新增地址'

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose() {
        this.$emit("close", { isShow: false, isSuccess: false });
        this.empty()
      },
      empty(){
         this.videoInfo={
          address: null,
          name:null,
          videoUrl: null,
          departmentId:null
        }
        this.title='新增地址'
      },
      addMonitor(){
        let data = this.videoInfo
        saveOrUpdate(data).then(res=>{
          this.empty()
          this.$emit("close", { isShow: false, isSuccess: true });
        })
      }
  },
  watch:{
    isEdit(newVal){
      if(newVal){
        this.title='编辑地址'
      }
    },
    isDetail(newVal){
      if(newVal){
        this.title='地址详情'
      }
    },
    editDetail(newVal){
      if(newVal){
          this.videoInfo={
          address: newVal.address,
          name:newVal.name,
          videoUrl: newVal.videoUrl,
          id:newVal.id,
          departmentId:newVal.departmentId
        }
      }
    }
  }
}
</script>
<style scoped>
.el-select{
  width: 100%;
}
</style>
