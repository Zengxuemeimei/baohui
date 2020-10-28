<template>
  <div>
      <el-dialog
        title="新增点位"
        :visible.sync="isShow"
        width="1284px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="person-content">
            <el-scrollbar style="height:100%">
                <span class="person-info-title">点位信息</span>
                <table class="person-table mb40 ml50" border="1">
                    <tr>
                        <th>点位名称</th>
                        <td>
                          <input
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlaceInfo.name"
                            />
                        </td>
                        <th>点位编号</th>
                        <td>
                          <input
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlaceInfo.number"
                            />
                        </td>
                        <th>点位类型</th>
                        <td style="width:300px">
                            <el-select clearable v-model="keepWatchPlaceInfo.type" placeholder="请选择">
                            <DictionarySelect :list="positionTypeList"/>
                          </el-select>
                        </td>
                    </tr>
                    <tr>
                        <th>所属部门</th>
                        <td colspan="2">
                          <el-select clearable v-model="keepWatchPlaceInfo.departmentId" placeholder="请选择">
                            <DepartmentSelect :list="listDepartment"/>
                          </el-select>
                        </td>
                        <th>详细位置</th>
                        <td colspan="2">
                          <input
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlaceInfo.detailedAddress"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>经度</th>
                        <td colspan="2">
                          <input
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlaceInfo.longitude"
                            />
                        </td>
                        <th>纬度</th>
                        <td colspan="2">
                          <input
                                type="text"
                                class="input-form"
                                v-model="keepWatchPlaceInfo.latitude"
                            />
                        </td>
                    </tr>
                </table>
                <div class="amap-wrapper map ml50">
                  <el-amap-search-box class="search-box" :searchOption="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                    <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="16" :events="events" class="amap-demo">
                      <el-amap-marker v-for="marker in markers" :key="marker[0]" :position="marker" ></el-amap-marker>
                    </el-amap>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addPointPosition">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import VueAMap from 'vue-amap';
import {saveOrUpdate} from '@/api/keepWatch/index'
import DepartmentSelect from '@/components/Recursion/departmentSelect'
import DictionarySelect from '@/components/Recursion/dictionarySelect'
// import AMapUI from 'vue-amap';

let amapManager = new VueAMap.AMapManager();
export default {
  name: 'AddPointPosition',
  components: {DepartmentSelect,DictionarySelect},
  props:{
    isShow:{
      type:Boolean
    },
    isEdit:{
      type:Boolean
    },
    listDepartment:{
      type:Array
    },
    editDetail:{
      type:Object
    },
    positionTypeList:{
      type:Array
    }
  },
  data() {
    let that = this
    return {
        center: [121.59996, 31.197646],
        markers:[],
        amapManager,
        searchOption: {
            city: '上海',
            citylimit: false
        },
        events: {
            init(o) {
              console.log(o.getCenter())
            },
            dblclick(e){
              console.log(that.keepWatchPlaceInfo)
              that.keepWatchPlaceInfo.latitude = e.lnglat.lat
              that.keepWatchPlaceInfo.longitude = e.lnglat.lng
            }
          },
          keepWatchPlaceInfo:{
            departmentId:null,
            detailedAddress: null,
            latitude: null,
            longitude: null,
            name: null,
            number: null,
            type: null,
            orderNum:null
          }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    addPointPosition(){
      let that = this
        let data = this.keepWatchPlaceInfo
        saveOrUpdate(data).then(res=>{
            that.empty()
            that.$emit('close',{isShow:false,isSuccess:true})
        })
    },
    onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.center = [center.lng, center.lat];
          }
    },
    empty(){
      this.keepWatchPlaceInfo={
            departmentId:null,
            detailedAddress: null,
            latitude: null,
            longitude: null,
            name: null,
            number: null,
            type: null
          }
    },
    handleClose() {
      this.empty()
      this.$emit('close',{isShow:false,isSuccess:false})
    },
  },
  watch:{
    editDetail(newVal){
      if(newVal){
        this.keepWatchPlaceInfo = newVal
        this.center = [newVal.longitude,newVal.latitude]
        this.markers = [
          [newVal.longitude,newVal.latitude]
        ]
      }
    }
  }
}
</script>
<style scoped>
.map{
    width: 80%;
    height: 400px;
    position: relative;
}
.el-select{
  width: 100%;
}
.search-box {
      position: absolute;
      top: 25px;
      left: 20px;
}
</style>
