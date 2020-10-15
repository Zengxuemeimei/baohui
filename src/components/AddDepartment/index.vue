<template>
  <div>
      <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="所属父级" prop="parentId">
                    <div class="input-box">
                        <el-select v-model="ruleForm.parentId" placeholder="请选择">
                            <el-option label="无父级"
                            :value="null"></el-option>
                            <DepartmentSelect :list="list"/>
                        </el-select>
                    </div>
                </el-form-item>
                 <el-form-item label="部门名称" prop="name">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <div class="input-box">
                         <el-radio-group v-model="ruleForm.status">
                            <el-radio-button label="启用"></el-radio-button>
                            <el-radio-button label="停用"></el-radio-button>
                         </el-radio-group>
                    </div>
                </el-form-item>
                
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="AddDepartment('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/department'
import moment from 'moment'
import DepartmentSelect from '@/components/Recursion/departmentSelect'

export default {
  name: 'AddDepartment',
  components: {DepartmentSelect},
  props:{
    isShow:{
        type:Boolean
    },
    isEdit:{
        type:Boolean
    },
    editDetail:{
        type:Object
    },
    list:{
        type:Array
    }
  },
  data() {
    return {
        title:'新增部门',
        // parentId:null,
        ruleForm:{
            parentId:null,
            name:null,
            status:'启用'
        },
        rules: {
          name:[
              { required: true, message: '请输入部门名称', trigger: 'blur' },
          ],
          status:[
              { required: true, message: '请选择状态', trigger: 'change' },
          ]
        },
        loading:false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClose() {
        this.empty()
        this.$emit('close',{isShow:false,isSuccess:false})
    },
    empty(){
        this.ruleForm={
            parentId:null,
            name:null,
            status:'启用'
        }
        this.title='新增部门'
    },
    AddDepartment(formName){
        let that = this
        
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            that.loading = true
            let date = new Date()
            if(that.isEdit){
                that.ruleForm.updateTime = moment(date).format('YYYY-MM-DD hh:mm:ss')
            }else{
                that.ruleForm.creatTime = moment(date).format('YYYY-MM-DD hh:mm:ss')
            } 
            saveOrUpdate(that.ruleForm).then(res=>{
                that.loading = false
                    if(that.isEdit){
                        that.$message({
                            message: '编辑部门成功',
                            type: 'success'
                        });
                    }else{
                        that.$message({
                            message: '添加部门成功',
                            type: 'success'
                        });
                    }
                    that.empty()
                    that.$emit('close',{isShow:false,isSuccess:true})
                }).catch(error=>{
                    that.loading = false
                })
          }
        })
    }
  },
  watch:{
      isEdit(newVal){
          if(newVal){
            this.ruleForm={
                parentId:this.editDetail.parentId,
                name:this.editDetail.name,
                status:this.editDetail.status,
                id:this.editDetail.id
            }
            this.title='编辑部门'
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
.el-select{
    width: 100%;
}
</style>
