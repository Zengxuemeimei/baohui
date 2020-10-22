<template>
  <div>
      <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-form :model="deviceInfo" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="企业" prop="enterpriseId">
                    <!-- <el-input v-model="deviceInfo.enterpriseId" placeholder="请选择企业"></el-input> -->
                    <el-select v-model="deviceInfo.enterpriseId" placeholder="请选择">
                        <el-option
                        v-for="item in enterpriseInfolist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="设备类型" prop="deviceType">
                    <!-- <el-input v-model="deviceInfo.deviceType" placeholder="请选择类型"></el-input> -->
                    
                     <el-select v-model="deviceInfo.deviceType" placeholder="请选择">
                        <!-- <el-option
                        v-for="item in equipmentList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.name">
                        </el-option> -->
                        <DictionarySelect :list="equipmentList"/>
                    </el-select>
                </el-form-item>
                 <el-form-item label="设备序列号" prop="serialNumber">
                    <el-input v-model="deviceInfo.serialNumber" placeholder="请输入序列号"></el-input>
                </el-form-item>
                 <el-form-item label="设备名称" prop="name">
                    <el-input v-model="deviceInfo.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                 <el-form-item label="设备IP" prop="ipAddress">
                    <el-input v-model="deviceInfo.ipAddress" placeholder="请输入IP"></el-input>
                </el-form-item>
                 <el-form-item label="设备地址" prop="deviceLocation">
                    <el-input v-model="deviceInfo.deviceLocation" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-radio-group v-model="deviceInfo.activeStatus" style="margin-left:100px;">
                    <el-radio-button value="启用" label="启用"></el-radio-button>
                    <el-radio-button value="停用" label="停用"></el-radio-button>
                </el-radio-group>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addEquipment('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdate} from '@/api/equipment'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
export default {
  name: 'AddEquipment',
  components: {DictionarySelect},
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      },
      enterpriseInfolist:{
          type:Array
      },
      equipmentList:{
          type:Array
      },
      editDetail:{
          type:Object
      }
  },
  data() {
    return {
        title:"新增设备",
        deviceInfo:{
            activeStatus: '启用',
            deviceLocation: null,
            deviceType: null,
            enterpriseId:null,
            ipAddress: null,
            name: null,
            serialNumber: null
        },
        rules:{
            deviceLocation:[
                {required: true, message: '请输入设备地址', trigger: 'blur'}
            ],
            deviceType:[
                {required: true, message: '请选择设备类型', trigger: 'change'}
            ],
            enterpriseId:[
                {required: true, message: '请选择企业', trigger: 'change'}
            ],
            ipAddress:[
                {required: true, message: '请输入IP地址', trigger: 'blur'}
            ],
            name:[
                {required: true, message: '请输入设备名称', trigger: 'blur'}
            ],
            serialNumber:[
                {required: true, message: '请输入设备序列号', trigger: 'blur'}
            ],
        }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose(){
          this.empty()
          this.$emit("close", { isShow: false, isSuccess: false });
      },
      empty(){
        this.title="新增设备"
        this.deviceInfo={
            activeStatus: '启用',
            deviceLocation: null,
            deviceType: null,
            enterpriseId:null,
            ipAddress: null,
            name: null,
            serialNumber: null
        }
        this.$refs.ruleForm.resetFields();
      },
      addEquipment(formName){
          let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
              console.log('设备',that.deviceInfo)
            saveOrUpdate(that.deviceInfo).then(res=>{
                this.empty()
                this.$emit("close", { isShow: false, isSuccess: true });
            })
          }
        })
          
      }
  },
  watch:{
      isEdit(newVal){
          if(newVal){
              this.title = '编辑设备'
          }else{
              this.title = '新增设备'
          }
      },
      editDetail(newVal){
           this.deviceInfo={
            activeStatus: newVal.activeStatus,
            deviceLocation: newVal.deviceLocation,
            deviceType: newVal.deviceType,
            enterpriseId:newVal.enterpriseId,
            ipAddress: newVal.ipAddress,
            name: newVal.name,
            serialNumber: newVal.serialNumber,
            id:newVal.id
        }
      }
  }
}
</script>
<style scoped>

</style>
