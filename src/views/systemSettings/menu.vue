<template>
  <div class="content-box relative">
    <header class="content-header">
      <p class="title">菜单管理</p>
    </header>
    <main class="content-main">
      <div class="filter-box flex-between">
        <div class="btn-box flex-start">
            <add-button @addShow="addMenu"/>
        </div>
      </div>
      <div class="all-table">
        <MenuList :list="list" @editMenu="editMenu" @deleteList="deleteList" />
      </div>
      <div class="flex-between mt20">
        <!-- <p>双击进入详情页面</p>
        <paging /> -->
      </div>
    </main>
    <AddMenu :isShow="isAdd" :isEdit="isEdit" :menuList="list" :editDetail="editDetail" @close="closeAdd"/>
    <Loading :isLoading="loading"/>
    
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/index'
import Loading from '@/components/Loading/index'
import Paging from '@/components/Paging/index'
import AddMenu from '@/components/AddMenu/index'
import MenuList from '@/components/Recursion/menuList'
import {getList,deleteMenu} from '@/api/menu'

export default {
  name: 'Menu',
  components: {
    AddButton,
    AddMenu,
    Paging,
    Loading,
    MenuList
  },
  data() {
    return {
        pageDatas:{
            keyword:null,
            pageIndex:0
        },
        list: [],
        isAdd:false,
        isEdit:false,
        editDetail:{},
        loading:true
    }
  },
  created() {
  },
  mounted() {
      this.getList()
    
  },
  methods: {
      getList(){
        let that = this
        let data = that.pageDatas
        that.loading = true
        getList().then(res=>{
            that.list = res.data
            that.loading = false
        }).catch(error=>{
          that.loading = false
        })
      },
      addMenu(value){
        let that = this
        that.isAdd = value
        console.log('isadd',value)
      },
      editMenu(item){
        let that = this
        that.isAdd = item.isAdd
        that.isEdit = item.isEdit
        that.editDetail = item.editDetail
      },
      closeAdd(item){
        let that = this
        if(item.isSuccess){
            that.getList()
        }
        that.isAdd = item.isShow
        that.isEdit = item.isShow
      },
      deleteList(){
        this.getList()
      }
  }
}
</script>
<style scoped>

</style>
<style>
.el-table__expanded-cell[class*=cell]{
    padding:0;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #a1d1f142;
}
</style>
