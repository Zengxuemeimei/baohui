<template>
  <div>
    <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-scrollbar style="height:100%">
                <el-form :model="roleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="角色名称" prop="remark">
                        <el-input v-model="roleForm.remark" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="角色标识" prop="roleCode">
                        <el-input  v-model="roleForm.roleCode" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                         <el-radio-group v-model="roleForm.status">
                            <el-radio-button label="启用">启用</el-radio-button>
                            <el-radio-button label="禁用">禁用</el-radio-button>
                         </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AddRole('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/roles'
import moment from 'moment'
export default {
  name: 'AddRole',
  components: {},
   props: {
      isShow:{
        type: Boolean,
        default: false
      },
      isEdit:{
        type: Boolean,
        default: false 
      },
      editDetail:{
        type: Object
      }
   },
  data() {
    return {
      rules:{
        remark:[
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        roleCode:[
          {required: true, message: '请输入角色标识', trigger: 'blur'}
        ],
        status:[
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
      },
      roleForm:{
          remark:null,
          roleCode:null,
          status:"启用"
      },
      title:'新增角色'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      empty(){
         this.roleForm = {
            remark:null,
            roleCode:null,
            status:"启用"
        }
        this.$refs.ruleForm.resetFields();
        this.title = "新增角色"
      },
      AddRole(formName){
          let that = this
          that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
              let date = new Date()
            if(that.isEdit){
              that.roleForm.updateTime = moment(date).format('YYYY-MM-DD HH:mm:ss')
            }else{
              that.roleForm.creatTime = moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
            saveOrUpdate(that.roleForm).then(res=>{
              if(that.isEdit){
                that.$message({
                    message: '修改角色信息成功',
                    type: 'success'
                });
              }else{
                that.$message({
                    message: '添加角色成功',
                    type: 'success'
                });
              }
              that.empty()
              that.$emit('close',{isShow:false,isSuccess:true})
            })
            }
          })
          
      },
      handleClose() {
        let that = this
        that.empty() 
        that.$emit('close',{isShow:false,isSuccess:false})
    },
  },
  watch:{
    isShow(){
       if(this.isEdit){
            this.title = '编辑角色'
            this.roleForm.id = this.editDetail.id
            this.roleForm.remark = this.editDetail.remark
            this.roleForm.roleCode = this.editDetail.roleCode
            this.roleForm.status = this.editDetail.status
          }
    }
  }
}
</script>
<style scoped>

</style>
