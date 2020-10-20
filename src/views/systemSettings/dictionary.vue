<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">数据字典</p>
    </header>
    <main class="content-main">
        <AddButton @addShow="addShow"/>
        <el-tabs type="border-card" class="mt10" @tab-click="tabList">
            <el-tab-pane label="车辆类型">
                <div class="all-table">
                    <DictionaryList :list="dictionaryList" @editMenu="editMenu" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="告警类型">
                <div class="all-table">
                    <DictionaryList :list="dictionaryList" @editMenu="editMenu" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="告警状态">
                <div class="all-table">
                    <DictionaryList :list="dictionaryList" @editMenu="editMenu" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐患级别">
                <div class="all-table">
                    <DictionaryList :list="dictionaryList" @editMenu="editMenu" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐患处理状态">
                <div class="all-table">
                    <DictionaryList :list="dictionaryList" @editMenu="editMenu" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </main>
    <el-dialog
        title="新增字典"
        :visible.sync="isAdd"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="">
            <el-scrollbar style="height:100%">
                <el-form :model="dictionaryForm" :rules="rules"  ref="ruleForm" label-width="100px">
                    <el-form-item label="所属上级" prop="parentId">
                        <el-select v-model="dictionaryForm.parentId" placeholder="请选择">
                            <el-option :value="null" label="无父级"></el-option>
                            <DepartmentSelect :list="dictionaryList" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据名称" prop="name">
                        <el-input v-model="dictionaryForm.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addDictionary('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import {saveOrUpdate,getDictionaryList} from '@/api/dictionary'
import DictionaryList from '@/components/Recursion/dictionaryList'

export default {
  name: 'Dictionary',
  components: {AddButton,DepartmentSelect,DictionaryList},
  data() {
    return {
        isAdd:false,
        isEdit:false,
        loading:false,
        dictionaryForm:{
            parentId:null,
            name:null,
            children:null,
            status:'启用'
        },
        dictionaryType:"车辆类型",
        pageData:{
            keyword:null,
            pageIndex:0,
        },
        rules:{
            name:[
                {required: true, message: '请输入数据名称', trigger: 'blur'}
            ]
        },
        dictionaryList:[]
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    addShow(val){
        this.isAdd = val
    },
    handleClose(){
        this.isAdd = false
        this.empty()
    },
    tabList(tab){
        console.log(tab)
        this.dictionaryType = tab.label
        this.pageData.pageIndex = 0
        this.getList()
    },
    empty(){
        this.dictionaryForm={
            parentId:null,
            name:null,
            children:null,
            status:'启用'
        }
    },
    getList(){
        let that = this
        let data = that.pageData
        data.type = that.dictionaryType
        getDictionaryList(data).then(res=>{
            this.dictionaryList = res.data
        })
    },
    addDictionary(formName){
        let that = this
        that.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
                that.loading = true
                let data = that.dictionaryForm
                data.type = that.dictionaryType
                console.log('data',data)
                saveOrUpdate(data).then(res=>{
                    that.loading = false
                    that.empty()
                    that.handleClose()
                    that.getList()
                }).catch(error=>{
                    that.loading = false
                })
          }
        })
    },
    editMenu(item){
        let that = this
        that.isAdd = item.isAdd
        that.isEdit = item.isEdit
        that.dictionaryForm.parentId = item.editDetail.parentId
        that.dictionaryForm.name = item.editDetail.name
        that.dictionaryForm.id = item.editDetail.id
    },
     deleteList(){
        this.getList()
    }
}
   
}
</script>
<style scoped>

</style>

