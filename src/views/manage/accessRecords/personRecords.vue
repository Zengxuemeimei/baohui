<template>
  <div class="content-box">
    <header class="content-header">
      <p class="title">出入记录-人员管理</p>
    </header>
    <main class="content-main">
      <div class="key-words-box">
        <search-key @query="keyWordsQuery"/>
      </div>
      <div class="filter-box flex-between relative">
        <div class="flex-start">
          <div>
            <label class="filter-label">所属部门：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ml20">
            <label class="filter-label">进/出：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="filter-time ml20">
            <label class="filter-label">进出时间：</label>
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="person-total flex-center flex-column" style="color:#fff;">
            <div class="flex-start">
                <p class="f30">
                    <count-to
                    ref="example"
                    :start-val="0"
                    :end-val="520"
                    :duration="4000"
                    :autoplay="true"
                    class="example"
                    />
                </p>
                <p class="f14 ml5 mt5">人</p>
            </div>
            <p class="mt5 f14">今日人员进出数量</p>
        </div>
      </div>
      <div class="all-table">
        <el-table
         border
         header-cell-class-name="all-table-th"
          :data="list"
          style="width: 100%">
          <el-table-column
            label="序号"
            type=index
            width="80">
          </el-table-column>
          <el-table-column
            prop="personName"
            label="姓名"
            width="146">
          </el-table-column>
          <el-table-column
            prop="idNumber"
            label="身份证"
            width="270">
          </el-table-column>
          <el-table-column
            label="图片"
            width="146">
             <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <el-image 
                    fit="scale-down"
                    lazy
                    :src="scope.row.accessImage">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
             </template>
            
          </el-table-column>
          <el-table-column
            label="视频"
            width="146">
            <div class="headPortrait-box flex-center" style="backgroud:#000">
              <i class="el-icon-video-camera" />
            </div>
            <!-- <template slot-scope="scope">
                <div class="headPortrait-box flex-center">
                    <el-image 
                    fit="scale-down"
                    lazy
                    :src="scope.row.accessImage">
                    <div slot="error" class="image-slot " style="height:100%">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
             </template> -->
          </el-table-column>
          <el-table-column
            prop="liveAddress"
            label="出入地点"
            width="270">
          </el-table-column>
          <el-table-column
            prop="accessTime"
            label="出入时间"
            width="270">
          </el-table-column>
          <el-table-column
            prop="similar"
            label="相似度"
            width="146">
          </el-table-column>
          <el-table-column
            prop="healthCodeStatus"
            label="健康码">
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-between mt20">
        <p></p>
        <paging :total="total" @getCurrentPage="getPage"/>
      </div>
    </main>
    <AccessPerson :isShow="isDetail" :editDetail="editDetail" @close="closeAdd"/>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import Paging from '@/components/Paging/index'
import SearchKey from '@/components/searchKey/index'
import AccessPerson from '@/components/AccessDetail/person'
import {getAccessPersonList} from '@/api/accessRecords/index'


export default {
  name: 'PersonRecords',
  components: {
      SearchKey,
      countTo,
      Paging,
      AccessPerson
  },
  data() {
    return {
      pageData:{
        keyword:null,
        pageIndex:1
      },
      list:[],
      isDetail:false,
      loading:false,
      editDetail:{},
      total:0,
      value3:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    getPage(val){
      console.log('waimian',val)
        this.pageData.pageIndex = val
        this.getList()
    },
      keyWordsQuery(val){
        this.pageData.keyword = val
        this.pageData.pageIndex = 1
        this.getList()
      },
      addShow(value){
        console.log('addShow',value)
        this.isDetail = value
      },
      closeAdd(item){
          let that = this
          if(item.isSuccess){
              that.getList()
          }
          that.isDetail = item.isShow
      },
      getList(){
        let data = this.pageData
        let that = this
        that.loading = true
        getAccessPersonList(data).then(res=>{
            that.list = res.data.dataList
            that.total = res.data.total
            that.loading = false
        }).catch(error=>{
            that.loading = false
        })
      },
      tableRowClassName({row, rowIndex}){
        //修改table行的颜色
        if(rowIndex%2 != 1){
          return 'odd-row'
        }
      }
  }
}
</script>
<style scoped>
.person-total{
    width: 215px;
    height: 80px;
    background: #F35D4D;
    position: absolute;
    right: 0;
    bottom: 0;
    /* color: #ffffff; */
}
.headPortrait-box{
  width: 31px;
  height: 27px;
  background: #e7e6e6;
  margin: 0 auto;
  /* color: #ffffff; */
}
</style>
