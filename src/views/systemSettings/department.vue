<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">部门管理</p>
    </header>
    <main class="content-main relative">
      <div class="filter-box flex-between">
        <!-- <search-key @query="keyWordsQuery" /> -->
        <div class="btn-box flex-start">
          <add-button @addShow="addShow" />
        </div>
      </div>
      <div class="all-table">
        <DepartmentList
          :list="list"
          @editMenu="editMenuItem"
          @stopDepartment="stopDepartment"
        />
      </div>
      <!-- <div class="flex-between mt20">
        <p></p>
        <paging />
      </div> -->
      <Loading :loading="loading" />
    </main>
    <AddDepartment
      :isShow="isAdd"
      :isEdit="isEdit"
      :editDetail="editDetail"
      :list="list"
      @close="closeAdd"
    />
  </div>
</template>

<script>
import SearchKey from "@/components/searchKey/index";
import AddButton from "@/components/AddButton/index";
import Paging from "@/components/Paging/index";
import DepartmentList from "@/components/Recursion/departmentList";
import AddDepartment from "@/components/AddDepartment/index";
import Loading from '@/components/Loading/index'
import {
  getDepartmentList,
  saveOrUpdate,
  getDepartmentListPaging,
} from "@/api/department";
export default {
  name: "Department",
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddDepartment,
    DepartmentList,
    Loading
  },
  data() {
    return {
      list: [],
      listPaging: [],
      pageData: {
        keyword: null,
        pageIndex: 1,
      },
      isAdd: false,
      isEdit: false,
      editDetail: {},
      loading:false
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    keyWordsQuery(val) {
      this.pageData.keyword = val;
      this.pageData.pageIndex = 1;
      this.getList();
    },
    addShow(value) {
      let that = this;
      that.isAdd = value;
    },
    closeAdd(item) {
      let that = this;
      if (item.isSuccess) {
        that.getList();
      }
      that.isAdd = item.isShow;
      that.isEdit = item.isShow;
    },
    editMenuItem(item) {
      let that = this;
      that.isAdd = item.isAdd;
      that.isEdit = item.isEdit;
      that.editDetail = item.editDetail;
    },
    stopDepartment(item) {
      let that = this;
      let data = {
        parentId: item.parentId,
        name: item.name,
        status: item.status,
        id: item.id,
      };
      saveOrUpdate(data)
        .then((res) => {
          that.$message({
            message: "修改状态成功",
            type: "success",
          });
          that.getList();
        })
        .catch((error) => {
          that.loading = false;
        });
    },
    getList() {
      let that = this;
      that.loading = true
      getDepartmentList().then((res) => {
        that.loading = false
        that.list = res.data;
      }).catch(error=>{
        that.loading = false
      })
    },
  },
};
</script>
<style scoped>
/* .filter-label{
  font-weight: 500;
} */
.filter-time {
  margin-left: 34px;
}
</style>
