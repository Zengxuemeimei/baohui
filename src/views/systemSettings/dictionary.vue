<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">数据字典</p>
    </header>
    <main class="content-main">
        <el-tabs type="border-card" class="mt10" @tab-click="tabList">
            <el-tab-pane label="车辆类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="车辆类型" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="告警类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="告警类型" :list="dictionaryList"   @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="告警状态">
                <div class="all-table">
                    <DictionaryList dictionaryType="告警状态" :list="dictionaryList"   @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐患级别">
                <div class="all-table">
                    <DictionaryList dictionaryType="隐患级别" :list="dictionaryList"   @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="企业类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="企业类型" :list="dictionaryList" @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐患处理状态">
                <div class="all-table">
                    <DictionaryList dictionaryType="隐患处理状态" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
             <el-tab-pane label="点位类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="点位类型" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="方案类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="方案类型" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
             <el-tab-pane label="设备类型">
                <div class="all-table">
                    <DictionaryList dictionaryType="设备类型" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="重复计划">
                <div class="all-table">
                    <DictionaryList dictionaryType="重复计划" :list="dictionaryList"  @close="closeAdd"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </main>
    
  </div>
</template>

<script>

import DepartmentSelect from '@/components/Recursion/departmentSelect'
import {saveOrUpdate,getDictionaryList} from '@/api/dictionary'
import DictionaryList from '@/components/Recursion/dictionaryList'

export default {
  name: 'Dictionary',
  components: {DepartmentSelect,DictionaryList},
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
            pageIndex:1,
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
    closeAdd(){
        this.getList()
    },
    tabList(tab){
        console.log(tab)
        this.dictionaryType = tab.label
        this.pageData.pageIndex = 1
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
   
   
     deleteList(){
        this.getList()
    }
}
   
}
</script>
<style scoped>

</style>

