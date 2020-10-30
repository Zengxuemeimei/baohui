<template>
  <div>
    <el-dialog
        title="新增菜单"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-scrollbar style="height:100%">
                <el-form :model="menuForm" :rules="rules"  ref="ruleForm" label-width="100px">
                    <el-form-item label="所属菜单" prop="parentId">
                        <el-select v-model="parentId" placeholder="请选择">
                            <el-option :value="null" label="无父级"></el-option>
                            <Recursion :list="menuList" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="title">
                        <el-input v-model="menuForm.title" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="name" prop="name">
                        <el-input v-model="menuForm.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="组件路径" prop="component">
                        <el-input v-model="menuForm.component" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="重定向" prop="redirect">
                        <el-input v-model="menuForm.redirect" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="redirect">
                        <el-input v-model="menuForm.orderNum" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addMenu('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdateMenu} from "@/api/menu"
import Recursion from '@/components/Recursion'
import moment from 'moment'
export default {
  name: 'AddMenu',
  components: {Recursion},
  props: {
      isShow:{
        type: Boolean,
        default: false
      },
      menuList:{
        type: Array
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
         title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ],
          component: [
            { required: true, message: '请输入组件路径', trigger: 'blur' }
          ]
      },
        treeProps:{
            label:(data)=>{
                return data.meta.title
            },
            children:'children'
        },
        parentId:null,
        selectProps: {
          label: 'name',
          children: 'children'
        },
        menuForm:{
            alwaysShow: false,
            children: null,
            component: null,
            hidden: false,
            meta: {title: null},
            name: null,
            notDelete: true,
            orderNum: null,
            parentId: null,
            path: null,
            redirect: null,
            type: '菜单',
            title:null
        }
    }
  },
  created() {
  },
  mounted() {
    console.log('editDetail',this.editDetail)
  },
  methods: {
    handleCheckChange(data){
      this.parentId = data.meta.title
      console.log('1',data)
    },
    handleClose() {
        // this.isShow = false
        this.empty()
        this.$emit('close',{isShow:false,isSuccess:false})
    },
    empty(){
        this.parentId=null
        this.menuForm={
            alwaysShow: false,
            children: null,
            component: null,
            hidden: false,
            meta: {title: null},
            name: null,
            notDelete: true,
            orderNum: null,
            parentId: null,
            path: null,
            redirect: null,
            type: '菜单',
            title:null
        }
        this.$refs.ruleForm.resetFields();
    },
    addMenu(formName){
        let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            that.menuForm.parentId = that.parentId
            that.menuForm.meta.title = that.menuForm.title 
            // that.menuForm.meta.affix = false
            // that.menuForm.meta.noCache = true
            // that.menuForm.meta.icon = "el-icon-date"
            // delete that.menuForm.meta.affix
            that.menuForm.meta = JSON.stringify(that.menuForm.meta)
            if(that.parentId){
              that.menuForm.path = that.menuForm.name.replace(that.menuForm.name[0],that.menuForm.name[0].toLowerCase());
            }else{
              that.menuForm.path = '/' + that.menuForm.name.replace(that.menuForm.name[0],that.menuForm.name[0].toLowerCase());
            }
            delete this.menuForm.title
            saveOrUpdateMenu(that.menuForm).then(res=>{
                that.empty()
                that.$emit('close',{isShow:false,isSuccess:true})
            })
          }
        })
        
    }
  },
  watch:{
    isShow(newVal){
      if(this.isEdit){
          this.parentId = this.editDetail.parentId
          this.menuForm.name = this.editDetail.name
          this.menuForm.meta = this.editDetail.meta
          this.menuForm.title = this.editDetail.meta.title
          this.menuForm.path = this.editDetail.path
          this.menuForm.id = this.editDetail.id
          this.menuForm.component = this.editDetail.component
      }

      
    }
  }
}
</script>
<style scoped>
.el-tree-node__expand-icon{
  color: transparent !important;
}
</style>
