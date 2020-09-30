<template>
  <div>
      <el-dialog
        title="新增人员"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">人员基本信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>姓名</th>
                        <td>zengxuemei</td>
                        <th>性别</th>
                        <td>女</td>
                        <th>年龄</th>
                        <td>12</td>
                        <th>联系电话</th>
                        <td>13458984247</td>
                    </tr>
                    <tr>
                        <th>学历</th>
                        <td colspan="3"></td>
                        <th>专业</th>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td></td>
                        <th>岗位</th>
                        <td></td>
                        <th>紧急联系人</th>
                        <td></td>
                        <th>联系电话</th>
                        <td>13458984247</td>
                    </tr>
                    <tr>
                        <th>入职时间</th>
                        <td></td>
                        <th>转正时间</th>
                        <td></td>
                        <th>合同到期时间</th>
                        <td></td>
                        <th>离职时间</th>
                        <td></td>
                    </tr>
                </table>
                <span class="person-info-title">文档资料</span>
                <div class="ml50 mb40">
                    <img src="" alt="">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传资料</span>
                    </el-upload>
                </div>
                <span class="person-info-title">车辆信息</span>
                <div class="person-car-info ml50 mb40 flex-start">
                    <el-upload
                        action="http://localhost:9528"
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="1">
                        <!-- <i class="el-icon-plus"></i> -->
                        <span>上传车辆图片</span>
                    </el-upload>
                    <table class="person-table person-car-table" border="1">
                        <tr>
                            <th>车牌号</th>
                            <td></td>
                            <th>车辆类型</th>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <span class="person-info-title mr20">人员事件</span>
                <el-button type="text" @click="showEvent"><i class="el-icon-circle-plus-outline" /><span style="display:inline-block;margin-left:10px">新增事件</span> </el-button>
                <!-- <el-button type="primary" icon="el-icon-circle-plus-outline">新增事件</el-button> -->
                <div class="ml50">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="序号"
                        width="128">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="事件名称"
                        width="364">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="事件内容"
                        width="364">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="发生时间"
                        >
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog
                    width="30%"
                    title="添加事件"
                    :visible.sync="innerVisible"
                    :close-on-click-modal="false"
                    append-to-body>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="事件名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="事件内容">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="事件时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                                <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="innerVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <p>11</p>
                <p>11</p>
                <p>11</p>
                <p>11</p>
                <p>11</p>
                <p>11</p>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddPerson',
  components: {},
  data() {
    return {
        form:{},
        innerVisible:false,
        tableData:[],
        dialogVisible:false,
        dialogVisibleImg:false,
        dialogImageUrl:null
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      showEvent(){
        this.innerVisible = true
      },
      handleClose(done) {
        this.dialogVisible = false
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
}
</script>
<style scoped>
.person-content{
    height: 60vh;
    overflow: hidden;
}
.line{
    text-align: center;
}
.person-info-title{
    line-height: 32px;
    padding: 0 16px;
    text-align: center;
    background: #90afda;
    display: inline-block;
    color: #333333;
    margin-bottom: 20px;
}
.person-table{
    border-collapse: collapse;
    /* margin: 0 auto; */
}
.person-table th,.person-table td{
    width: 128px;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.person-car-table{
    margin-left: 38px;
}
.el-button--primary{
    background: #4c5e79;
    border: none;
}
/* .el-dialog{
    height: 1050px;
    overflow: hidden;
} */
</style>
