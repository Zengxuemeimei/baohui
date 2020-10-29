<template>
  <div>
      <el-dialog
        title="考勤信息"
        :visible.sync="isDetail"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <div>
                    <el-calendar v-model="calendarMonth">
                        <template slot="dateCell" slot-scope="{data}">
                            <div class="flex-center flex-column" style="width:100%;height:100%" @click="staffDetail(data.day)">
                                <p class="calendar-date">{{data.day.split('-').slice(2).join('-')}}</p>
                                <p :class="item.status == '正常'?'is-vacation':''" class="abnormal" v-for="item in list" :key="item.date">{{item.date == data.day ? item.status:''}}</p>
                            </div>
                            
                        </template>
                    </el-calendar>
                    <p class="mb20 ml20">点击日期查看当日打卡详情 <i class="el-icon-top"></i> </p>
                    <div>
                        <span class="person-info-title">打卡详情</span>
                        <el-table
                            :data="detailList"
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                label="打卡时间"
                                prop="workSignTime">
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                prop="status">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-scrollbar>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { getStaffDayDetail } from '@/api/calendar'

export default {
  name: 'CheckWorkDetail',
  components: {},
  props:{
      isDetail:{
          type:Boolean
      },
      list:{
          type:Array
      },
      staffId:{
          type:Number
      }
  },
  data() {
    return {
        calendarMonth:null,
        detailList:[]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleClose(){
        this.$emit("close", { isShow: false, isSuccess: false });
        this.detailList = []
    },
    staffDetail(date){
        let data = {
            staffId:this.staffId,
            day:date
        }
        let that = this
        getStaffDayDetail(data).then(res=>{
            that.detailList = res.data.staffSignInfos
        })
        // console.log('date',date)
    }
  }
}
</script>
<style scoped>
.abnormal{
    background: #ff6666;
    color: #fff;
    width: 50%;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
}
</style>
