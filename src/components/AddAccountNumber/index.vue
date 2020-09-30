<template>
  <div>
      <el-dialog
        title="新增账号"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="角色" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="部门" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="权限" prop="password">
                    <div class="input-box">
                        <el-input v-model="ruleForm.name"></el-input>
                    </div>
                </el-form-item>
            </el-form>
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
  name: 'AddAccountNumber',
  components: {},
  data() {
    return {
        dialogVisible:true,
        ruleForm:{},
        rules: {
          name: [
              { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
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
.input-box{
    width: 300px;
}
.demo-ruleForm{
    width: 50%;
    margin: 0 auto;
}
</style>
