<template>
  <div>
      <el-dialog
        :title="title"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">企业信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>企业名称</th>
                        <td>
                          <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.name"
                            />
                        </td>
                        <th>企业电话</th>
                        <td>
                          <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.mobilNumber"
                            />
                        </td>
                        <th>企业类型</th>
                        <td>
                          <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.enterpriseType"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>企业区域</th>
                        <td colspan="2"></td>
                        <th>详细地址</th>
                        <td colspan="2">
                            <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.detailedAddress"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>经度</th>
                        <td colspan="2">
                            <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.longitude"
                            />
                        </td>
                        <th>纬度</th>
                        <td colspan="2">
                            <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.latitude"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>状态</th>
                        <td colspan="2">
                            <el-radio-group v-model="enterpriseInfo.status">
                                <el-radio-button label="启用"></el-radio-button>
                                <el-radio-button label="停用"></el-radio-button>
                            </el-radio-group>
                        </td>
                        <th></th>
                        <td colspan="2"></td>
                    </tr>
                </table>
                <div class="amap-wrapper map ml50">
                    <el-amap vid="amap"  :center="center" :map-manager="amapManager" :zoom="12" :events="events" class="amap-demo">
                    </el-amap>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addEnterprise">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import VueAMap from 'vue-amap';
import {saveOrUpdate} from '@/api/enterprise'
let amapManager = new VueAMap.AMapManager();

export default {
  name: 'AddEnterprise',
  components: {},
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      }
  },
  data() {
      let that = this
    return {
        center: [121.59996, 31.197646],
        amapManager,
        events: {
            init(o) {
              console.log(o.getCenter())
            },
            dblclick(e){
              console.log(that.keepWatchPlaceInfo)
              that.enterpriseInfo.latitude = e.lnglat.lat
              that.enterpriseInfo.longitude = e.lnglat.lng
            }
        },
        title:'新增企业',
        enterpriseInfo:{
            cityCode:'成都市',
            countyCode:'青白江',
            detailedAddress: null,
            enterpriseType: null,
            latitude: null,
            longitude: null,
            mobilNumber: null,
            name: null,
            provinceCode: '四川省',
            status: '启用',
        }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      handleClose(){
          this.$emit('close',{isShow:false,isSuccess:false})
      },
      empty(){
          this.enterpriseInfo={
            cityCode:'成都市',
            countyCode:'青白江',
            detailedAddress: null,
            enterpriseType: null,
            latitude: null,
            longitude: null,
            mobilNumber: null,
            name: null,
            provinceCode: '四川省',
            status: '启用',
        }
      },
      addEnterprise(){
            console.log('企业',this.enterpriseInfo)
            saveOrUpdate(this.enterpriseInfo).then(res=>{
                 this.$emit('close',{isShow:false,isSuccess:true})
            })
      }
  }
}
</script>
<style scoped>
.map{
    width: 80%;
    height: 400px;
}
</style>
