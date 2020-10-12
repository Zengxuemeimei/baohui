<template>
  <div>
    <el-dialog
        title="新增菜单"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <el-form :model="menuForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属菜单" prop="parentName">
                        <el-select v-model="parentId" placeholder="请选择">
                            <el-option :value="null" label="无父级"></el-option>
                            <el-option >
                                <el-tree
                                :data="menuList"
                                ref="tree"
                                node-key="id"
                                :default-expand-all="true"
                                :props="treeProps">
                                </el-tree>
                            </el-option>
                            <!-- <el-option v-for="item in parentList" :key="item.id" :value="item.id" :label="item.name"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="name">
                        <el-input v-model="menuForm.meta.title" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="menuForm.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="路径" prop="name">
                        <el-input v-model="menuForm.component" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addMenu">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveOrUpdateMenu} from "@/api/menu"
import moment from 'moment'
export default {
  name: 'AddMenu',
  components: {},
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
        treeProps:{
            label:(data)=>{
                return data.meta.title
            },
            children:'children'
        },
        parentId:null,
        parentList:[
            {
                id:1,
                name:'系统管理'
            }
        ],
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
            parentId: 1,
            path: null,
            redirect: null,
            type: '菜单',
        }
    }
  },
  created() {
  },
  mounted() {
    console.log('editDetail',this.editDetail)
  },
  methods: {
    handleNodeClick(){

    },
    handleClose() {
        // this.isShow = false
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
            parentId: 1,
            path: null,
            redirect: null,
            type: '菜单',
        }
    },
    addMenu(){
        let that = this
        let date = new Date()
        if(that.isEdit){
            this.menuForm.updateTime = moment(date).format('YYYY-MM-DD hh:mm:ss')
        }else{
            this.menuForm.creatTime = moment(date).format('YYYY-MM-DD hh:mm:ss')
        }
        this.menuForm.meta = JSON.stringify(this.menuForm.meta)
        this.menuForm.path = this.menuForm.name.replace(this.menuForm.name[0],this.menuForm.name[0].toLowerCase());
        saveOrUpdateMenu(this.menuForm).then(res=>{
            that.empty()
            this.$emit('close',{isShow:false,isSuccess:true})
        })
    }

  },
  watch:{
    editDetail(newVal){
        if(this.isEdit){
            this.parentId = newVal.parentId
            this.menuForm.name = newVal.name
            this.menuForm.meta = newVal.meta
            this.menuForm.path = newVal.path
            this.menuForm.id = newVal.id
            this.menuForm.component = newVal.component
        }
        // console.log('isEdit',this.isEdit)
        console.log('newVal',newVal)
    } 
  }
}
</script>
<style scoped>

</style>
