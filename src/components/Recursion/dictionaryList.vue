<template>
  <div>
     <div class="mb20">
        <AddButton @addShow="addShow"/>
     </div>
    <el-table :data="list" :show-header="isHeader" header-cell-class-name="all-table-th" :default-expand-all="false" :row-class-name="getRowClassName"  style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="prop" v-if="prop.row.children">
          <DictionaryList :list="prop.row.children" :isHeader="false"/>
        </template>
      </el-table-column>
      <el-table-column label="数据名称" prop="name"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button type="primary" @click="editMenu(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" @click="deleteDictionary(scope.row.id)" size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
    </div> -->
    <el-dialog
        :title="title"
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
                    <el-form-item label="排序" prop="orderNum">
                        <el-input v-model="dictionaryForm.orderNum" placeholder="请输入内容"></el-input>
                    </el-form-item>
                     <el-form-item label="状态" prop="status">
                       <el-radio-group v-model="dictionaryForm.status">
                          <el-radio-button label="启用"></el-radio-button>
                          <el-radio-button label="停用"></el-radio-button>
                      </el-radio-group>
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
import Paging from '@/components/Paging/index'
import {saveOrUpdate,updateStatus} from '@/api/dictionary'
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
            status:'启用',
            orderNum:null
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
        title:'新增字典'
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
     editMenu(item){
        let that = this
        that.title = '编辑字典'
        that.isAdd = true
        that.isEdit = true
        that.dictionaryForm.parentId = item.parentId
        that.dictionaryForm.name = item.name
        that.dictionaryForm.id = item.id
        that.dictionaryForm.orderNum = item.orderNum
        that.dictionaryForm.status = item.status
    },
    addShow(val){
        this.isAdd = val
        this.title = '新增字典'
    },
    deleteDictionary(id){
        let that = this
        that.$confirm('此操作将永久删除该字典, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus({id:id}).then(res=>{
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit("close", { isShow: false, isSuccess: true });
          })
          
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    handleClose(){
        this.isAdd = false
        this.isEdit = false

        this.empty()
    },
    empty(){
        this.dictionaryForm={
            parentId:null,
            name:null,
            children:null,
            status:'启用',
            orderNum:null
        }
        this.title = '新增字典'
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
