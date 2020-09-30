<template>
  <div>
      <el-dialog
        title="新增点位"
        :visible.sync="dialogVisible"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">点位信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>点位名称</th>
                        <td></td>
                        <th>点位编号</th>
                        <td></td>
                        <th>点位类型</th>
                        <td style="width:300px"></td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td colspan="2"></td>
                        <th>详细位置</th>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <th>经度</th>
                        <td colspan="2"></td>
                        <th>纬度</th>
                        <td colspan="2"></td>
                    </tr>
                </table>
                <div class="amap-wrapper map ml50">
                    <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="12" :events="events" class="amap-demo">
                    </el-amap>
                </div>
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
import VueAMap from 'vue-amap';
// import AMapUI from 'vue-amap';

let amapManager = new VueAMap.AMapManager();
export default {
  name: 'AddPointPosition',
  components: {},
  data() {
    return {
        center: [121.59996, 31.197646],
        amapManager,
        events: {
            init(o) {
              console.log(o.getCenter())
            }
          },
        dialogVisible:true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose(done) {
        this.dialogVisible = false
      },
  }
}
</script>
<style scoped>
.map{
    width: 80%;
    height: 400px;
}
</style>
