<template>
  <div>
      <el-dialog
        title="访客审核"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <span class="person-info-title">访客基本信息</span>
            <table class="person-table mb40 ml50" border="1">
                <tr>
                    <th>姓名</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.name"
                        />
                    </td>
                    <th>身份证号</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.idNumber"
                        />
                    </td>
                    <th>常用电话</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.mobile"
                        />
                    </td>
                </tr>
                <tr>
                    <th>访问时间</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.visitTime"
                        />
                    </td>
                    <th>离开时间</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.leaveTime"
                        />
                    </td>
                    <th>访问对象</th>
                    <td>
                        <input
                            disabled
                            type="text"
                            class="input-form"
                            v-model="editDetail.intervieweeName"
                        />
                    </td>
                </tr>
                <tr>
                    <th v-show="!isDetail">审核情况</th>
                    <td v-show="!isDetail">
                        <el-radio-group v-model="result">
                            <el-radio label="PASS">通过</el-radio>
                            <el-radio label="UNPASS">未通过</el-radio>
                        </el-radio-group>
                    </td>
                    <th>未通过原因</th>
                    <td colspan="5">
                        <input
                            :disabled="isDetail || result=='PASS'"
                            type="text"
                            class="input-form"
                            v-model="failComment"
                        />
                    </td>
                </tr>
            </table>
            <span class="person-info-title">采集照片</span>
            <div class="visitor-img-box flex-start ml50">
                <div class="img-box">
                    <!-- <img :src="editDetail.image" alt="" @error="defaultBackImg"> -->
                    <el-image 
                        style="width:350px;height:250px"
                        fit="cover"
                        :src="editDetail.image">
                        <div slot="error" class="image-slot flex-center flex-column" style="height:100%">
                        <i class="el-icon-picture-outline f30"></i>
                        <span class="mt10" >{{editDetail.image?'加载失败':'暂无照片'}}</span>
                        <!-- <span class="mt10" v-show="!imgSrc">拍摄照片</span> -->
                        </div>
                    </el-image>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="auditVisitor">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {auditVisitor} from '@/api/visitor/index'

export default {
  name: 'AuditVisitor',
  components: {},
  props:{
      isShow:{
          type:Boolean
      },
      isDetail:{
          type:Boolean
      },
      editDetail:{
          type:Object
      }
  },
  data() {
    return {
        result:'PASS',
        failComment:null
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClose() {
        this.$emit("close", { isShow: false, isSuccess: false });
    },
    defaultBackImg(event){
          if(event.type == "error") {
          event.target.src= require("@/assets/default_pic.png")
        }
      },
    auditVisitor(){
        let data = {
            result:this.result,
            failComment:this.failComment,
            visitorId:this.editDetail.id
        }
        auditVisitor(data).then(res=>{
            this.$message({
                message: '审核成功',
                type: 'success'
            });
            this.$emit("close", { isShow: false, isSuccess: true });
        })
    }
  },
  watch:{
      editDetail(newVal){
          if(newVal){
              this.failComment = newVal.failComment
          }
      }
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
    width: 350px;
    height: 250px;
    overflow: hidden;
    background: #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-box img{
    width: auto;
    height: 100%;
}
</style>
