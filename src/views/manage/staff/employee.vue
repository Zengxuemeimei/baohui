<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">员工管理-在职员工</p>
    </header>
    <main class="content-main relative">
      <div class="key-words-box flex-start">
        <search-key @query="keyWordsQuery" :isClear="isClearKey" />
        <div class="btn-box flex-start ml20">
          <add-button @addShow="addShow" />
        </div>
      </div>
      <div class="filter-box flex-between flex-wrap">
        <div class="flex-start flex-wrap">
          <div class="flex-start mr20">
            <label class="filter-label">部门：</label>
            <el-select
              clearable
              v-model="pageData.departmentId"
              @change="
                pageData.pageIndex = 1;
                pageData.keyword = null;
                isClearKey = true;
                getList();
              "
              placeholder="请选择"
            >
              <DepartmentSelect :list="listDepartment" />
            </el-select>
          </div>
          <div class="flex-start">
            <label class="filter-label">入职时间：</label>
            <el-date-picker
              @change="changeTimeList"
              v-model="entryTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="all-table">
        <el-table
          border
          header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="departmentName" label="部门">
          </el-table-column>
          <el-table-column prop="position" label="岗位"> </el-table-column>
          <el-table-column prop="entryTime" label="入职时间"> </el-table-column>
          <el-table-column fixed="right" width="200px" label="操作">
            <template slot-scope="scope">
              <div class="flex-start">
                <el-button
                  type="primary"
                  @click="editItem(scope.row.id)"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  type="success"
                  @click="detailItem(scope.row.id)"
                  size="mini"
                  >详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage" />
      </div>
      <AddPerson
        :isShow="isAdd"
        :isEdit="isEdit"
        :isDetail="isDetail"
        :listDepartment="listDepartment"
        :carTypeList="carTypeList"
        :editDetail="editDetail"
        @close="closeAdd"
      />
      <Loading :loading="loading" />
    </main>
  </div>
</template>

<script>
import SearchKey from "@/components/searchKey/index";
import AddButton from "@/components/AddButton/index";
import DepartmentSelect from "@/components/Recursion/departmentSelect";
import moment from "moment";
import Paging from "@/components/Paging/index";
import AddPerson from "@/components/AddPerson/index";
import Loading from "@/components/Loading/index";
import { getStaffList, getStaffDetail } from "@/api/staff/index";
import { getDepartmentList } from "@/api/department";
import { getDictionaryList } from "@/api/dictionary";

export default {
  name: "Employee",
  components: {
    SearchKey,
    AddButton,
    Paging,
    AddPerson,
    Loading,
    DepartmentSelect,
  },
  data() {
    return {
      isClearKey: false,
      pageData: {
        keyword: null,
        pageIndex: 1,
        pageSize: 10,
        departmentId: null,
        entryTimeStartTime: null,
        entryTimeEndTime: null,
      },
      isAdd: false,
      isEdit: false,
      isDetail: false,
      editDetail: {},
      list: [],
      listDepartment: [],
      loading: false,
      entryTime: null,
      carTypeList: [],
      total: 0,
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getDepartmentList();
    this.getCarTypeList();
  },
  methods: {
    getPage(val) {
      this.pageData.pageIndex = val;
      this.getList();
    },
    keyWordsQuery(val) {
      this.pageData.keyword = val;
      this.pageData.pageIndex = 1;
      this.isClearKey = false;
      this.getList();
    },
    changeTimeList(val) {
      this.pageData.pageIndex = 1;
      this.isClearKey = true;
      if (val) {
        this.pageData.entryTimeStartTime = moment(val[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.pageData.entryTimeEndTime = moment(val[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.pageData.entryTimeStartTime = null;
        this.pageData.entryTimeEndTime = null;
      }
      this.getList();
    },
    editItem(id) {
      let that = this;
      that.isAdd = true;
      that.isEdit = true;
      getStaffDetail({ staffId: id }).then((res) => {
        that.editDetail = res.data;
      });
    },
    detailItem(id) {
      let that = this;
      that.isAdd = true;
      that.isDetail = true;
      getStaffDetail({ staffId: id }).then((res) => {
        that.editDetail = res.data;
      });
    },
    addShow(value) {
      this.isAdd = value;
    },
    closeAdd(item) {
      let that = this;
      if (item.isSuccess) {
        that.getList();
      }
      that.isAdd = item.isShow;
      that.isEdit = item.isShow;
      that.isDetail = item.isShow;
      that.editDetail = null;
    },
    getDepartmentList() {
      let that = this;
      getDepartmentList({ status: "启用" }).then((res) => {
        that.listDepartment = res.data;
      });
    },
    getList() {
      let data = this.pageData;
      let that = this;
      that.loading = true;
      data.quit = false;
      getStaffList(data)
        .then((res) => {
          that.list = res.data.dataList;
          that.loading = false;
          that.total = res.data.total;
        })
        .catch((error) => {
          that.loading = false;
        });
    },
    getCarTypeList() {
      let data = {};
      data.type = "车辆类型";
      getDictionaryList(data).then((res) => {
        this.carTypeList = res.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      //修改table行的颜色
      if (rowIndex % 2 != 1) {
        return "odd-row";
      }
    },
  },
};
</script>
<style scoped>
</style>
