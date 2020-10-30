<template>
  <div>
      <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号" prop="loginName">
                    <div class="input-box">
                        <el-input v-model="ruleForm.loginName" placeholder="请输入账号"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="!isEdit">
                    <div class="input-box">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="角色" prop="roleInfoList">
                    <div class="input-box">
                        <!-- <el-input v-model="ruleForm.roleInfoList"></el-input> -->
                        <el-select v-model="ruleForm.roleInfoList"  multiple placeholder="请选择">
                            <el-option
                            v-for="(item,index) in roleList"
                            :key="index"
                            :label="item.remark"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <!-- <el-form-item label="部门" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item> -->
                <!-- <el-form-item label="权限" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item> -->
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addAccountNumber('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/api/user'
import {getRoleList} from '@/api/roles'
import moment from 'moment'
import Tools from '@/utils/tools'
export default {
  name: 'AddAccountNumber',
  components: {},
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      },
      editDetail:{
          type:Object
      }
  },
  data() {
    return {
        title:'新增账号',
        ruleForm:{
            loginName: null,
            name: null,
            password: null,
            status: "启用",
            roleInfoList:[]
        },
        roleList:[],
        rules: {
          name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          loginName:[
              { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          roleInfoList:[
              {required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
    }
  },
  created() {
  },
  mounted() {
      this.getRoleList()
  },
  methods: {
    handleClose() {
        this.$emit('close',{isShow:false,isSuccess:false})
        this.empty()
    },
    getRoleList(){
        let that = this
        getRoleList().then(res=>{
            that.roleList = res.data.dataList
        })
    },
    empty(){
        this.ruleForm={
            loginName: null,
            name: null,
            password: null,
            status: "启用",
            roleInfoList:[]
        }
        this.title = "新增账号"
        this.$refs.ruleForm.resetFields();
    },
    addAccountNumber(formName){
        let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
                
                    // data = that.ruleForm
                let {roleInfoList,loginName,name,password,status} =that.ruleForm
                let list = []
                roleInfoList.forEach(el=>{
                    list.push({
                        roleId:el 
                    })
                })
                let data = {
                    loginName: loginName,
                    name: name,
                    password: password,
                    status: status,
                    roleInfoList:list
                }
                if(that.isEdit){
                    data.id = that.ruleForm.id
                    // delete data.password
                }
                saveOrUpdate(data).then(res=>{
                    if(that.isEdit){
                        that.$message({
                            message: '编辑账号成功',
                            type: 'success'
                        });
                    }else{
                        that.$message({
                            message: '添加账号成功',
                            type: 'success'
                        });
                    }
                    that.empty()
                    that.$emit('close',{isShow:false,isSuccess:true})
                })
          }
        })
        
    }
  },
  watch:{
      isEdit(newVal){
          if(newVal){
            this.title = "编辑账号"
            // this.ruleForm={
            //     id:this.editDetail.id,
            //     loginName: this.editDetail.loginName,
            //     name: this.editDetail.name,
            //     password:this.editDetail.password,
            //     status: this.editDetail.status,
            //     roleInfoList: this.editDetail.roleId.split(",").map(Number)
            // }
            // console.log(this.ruleForm)
          }
        
      },
      editDetail(newVal){
          if(newVal){
                this.ruleForm={
                id:newVal.id,
                loginName: newVal.loginName,
                name: newVal.name,
                password:newVal.password,
                status: newVal.status,
                roleInfoList:[]
            }
            if(!Tools.isEmpty(newVal.roleId)){
                this.ruleForm.roleInfoList = newVal.roleId.split(",").map(Number)
            }
          }
      }
  }
}
</script>
<style scoped>
.input-box{
    width: 300px;
}
.demo-ruleForm{
    width: 50%;
    margin: 0 auto;
}
</style>
