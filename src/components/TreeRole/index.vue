<template>
  <div>
      <el-dialog
        title="权限设置"
        :visible.sync="isShow"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <el-tree
                :data="menuList"
                ref="tree"
                node-key="id"
                :default-checked-keys="menuIds"
                :default-expand-all="true"
                :props="treeProps"
                show-checkbox>
                </el-tree>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AddRole">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {setMenu,getMenuListByRoleId} from '@/api/roles'
export default {
  name: 'TreeRole',
  components: {},
   props: {
      isShow:{
        type: Boolean,
        default: false
      },
      roleId:{
         type:Number 
      },
      menuList:{
          type:Array
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
        menuIds:[]
    }
  },
  created() {
  },
  mounted() {
      
  },
  methods: {
    handleClose() {
        this.$emit('closeTree',{isShow:false,isSuccess:false})
    },
    empty(){
        this.menuIds=[]
    },
    AddRole(){
        let that = this
        let menuIds = []
        that.menuIds = []
        console.log('data',that.$refs.tree.getCheckedNodes())

        
        that.$refs.tree.getCheckedNodes().forEach((el,index)=>{
            if(el.parentId){
                menuIds.push(el.parentId)     
            }
          menuIds.push(el.id)
        })
        menuIds.map(el=>{
            that.menuIds.push(el)
        })
        that.menuIds = [...new Set(that.menuIds)];
        let data={
            menuIds:that.menuIds,
            roleId:that.roleId
        }
        console.log('data',data)
        // return
        setMenu(data).then(res=>{
            that.$message({
                message: '权限设置成功',
                type: 'success'
            });
            that.empty()
        })
        that.$emit('closeTree',{isShow:false,isSuccess:true})
    },
    deep(list){
        let that = this
        list.forEach(el=>{
            if(el.parentId){
                that.menuIds.push(el.id)
            }
            if(el.children && el.children.length >0){
                that.deep(el.children)
            }
        })
        
    }
  },
  watch:{
    isShow(){
        let that = this
        that.menuIds = []
        getMenuListByRoleId({roleId:that.roleId}).then(res=>{
            let list = res.data
            that.deep(list)
            this.$nextTick(() => {
                console.log(that.menuIds)
                this.$refs.tree.setCheckedKeys(that.menuIds);
            });
        })
    }
  }
}
</script>
<style scoped>

</style>

