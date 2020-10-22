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
                          <!-- <input
                                type="text"
                                class="input-form"
                                v-model="enterpriseInfo.enterpriseType"
                            /> -->
                            <el-select v-model="enterpriseInfo.enterpriseType" placeholder="请选择">
                                <DictionarySelect :list="enterpriseTypeList"/>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <th>企业区域</th>
                        <td colspan="5">
                            <v-distpicker @selected="selectProvince"></v-distpicker>
                        </td>
                        
                    </tr>
                    <tr>
                        <th>详细地址</th>
                        <td colspan="5">
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
import DictionarySelect from '@/components/Recursion/dictionarySelect';
import VDistpicker  from 'v-distpicker'
import Tools from '@/utils/tools';

let amapManager = new VueAMap.AMapManager();

export default {
  name: 'AddEnterprise',
  components: {DictionarySelect,VDistpicker },
  props:{
      isShow:{
          type:Boolean
      },
      isEdit:{
          type:Boolean
      },
      editDetail:{
          type:Object
      },
      enterpriseTypeList:{
          type:Array
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
            cityCode:null,
            countyCode:null,
            detailedAddress: null,
            enterpriseType: null,
            latitude: null,
            longitude: null,
            mobilNumber: null,
            name: null,
            provinceCode: null,
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
      selectProvince(val){
          this.enterpriseInfo.provinceCode = val.province.value
          this.enterpriseInfo.cityCode = val.city.value
          this.enterpriseInfo.countyCode = val.area.value
          console.log('选择',val)
      },
      empty(){
          this.enterpriseInfo={
            cityCode:null,
            countyCode:null,
            detailedAddress: null,
            enterpriseType: null,
            latitude: null,
            longitude: null,
            mobilNumber: null,
            name: null,
            provinceCode: null,
            status: '启用',
        }
      },
      addEnterprise(){
            console.log('企业',this.enterpriseInfo)
            if(!Tools.isPhone(this.enterpriseInfo.mobilNumber)){
                this.$message({
                    message: '电话格式不正确',
                    type: 'warning'
                });
                return
            }
            saveOrUpdate(this.enterpriseInfo).then(res=>{
                 this.$emit('close',{isShow:false,isSuccess:true})
                 this.empty()
            })
      }
  },
  watch:{
      editDetail(newVal){
          if(newVal){
              this.enterpriseInfo={
                cityCode:newVal.cityCode,
                countyCode:newVal.countyCode,
                detailedAddress: newVal.detailedAddress,
                enterpriseType: newVal.enterpriseType,
                latitude: newVal.latitude,
                longitude: newVal.longitude,
                mobilNumber: newVal.mobilNumber,
                name: newVal.name,
                provinceCode: newVal.provinceCode,
                status: newVal.status,
                id:newVal.id
            }
          }
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
