<template>
  <div>
     <div class="mb20">
        <AddButton @addShow="addShow"/>
     </div>
    <el-table :data="list" :show-header="isHeader" header-cell-class-name="all-table-th" :default-expand-all="false" :row-class-name="getRowClassName"  style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="prop" v-if="prop.row.children">
          <DictionaryList :list="prop.row.children" :isHeader="false" @editMenu="editMenuItem"/>
        </template>
      </el-table-column>
      <el-table-column label="数据名称" prop="name"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button type="primary" @click="editMenu(scope.row)" size="mini"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
    </div> -->
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
                            <DepartmentSelect :list="list" />
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
import {updateStatus} from '@/api/dictionary'
import AddButton from '@/components/AddButton/index'
import Paging from '@/components/Paging/index'
import {saveOrUpdate} from '@/api/dictionary'
import DepartmentSelect from '@/components/Recursion/departmentSelect'

export default {
  name: "DictionaryList",
  components: {AddButton,Paging,DepartmentSelect},
  props: {
    list: {
      type: Array,
    },
    isHeader:{
        type:Boolean,
        default:true
    },
    dictionaryType:{
      type:String
    }
  },
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
        pageData:{
            keyword:null,
            pageIndex:0,
        },
        rules:{
            name:[
                {required: true, message: '请输入数据名称', trigger: 'blur'}
            ]
        },
    }
  },
  created() {},
  mounted() {},
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
    editMenuItem(item){
      this.$emit('editMenu',{
        isAdd:item.isAdd,
        isEdit:item.isEdit,
        editDetail:item.editDetail
      })
    },
    addShow(val){
        this.isAdd = val
    },
    handleClose(){
        this.isAdd = false
        this.empty()
    },
    empty(){
        this.dictionaryForm={
            parentId:null,
            name:null,
            children:null,
            status:'启用'
        }
    },
    getRowClassName({row, rowIndex}){
      if(row.children.length <= 0){
         return 'row-expand-cover';
      }
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
                    this.$emit("close", { isShow: false, isSuccess: true });
                }).catch(error=>{
                    that.loading = false
                })
          }
        })
    },
    editMenu(item) {
      this.$emit('editMenu',{
        isAdd:true,
        isEdit:true,
        editDetail:item
      })
    }
  },
};
</script>
<style>
 .row-expand-cover .el-table__expand-icon{visibility:hidden;}
 .el-table__expanded-cell[class*=cell]{
    padding:0;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #a1d1f142;
}
</style>
