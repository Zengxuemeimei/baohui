<template>
    <div class="map_m">
        <div id="map_container"></div>
        <dv-decoration-8 class="titL" style="width: 16vw; height: 4.9vh" />
        <dv-decoration-8 class="titR" style="width: 16vw; height: 4.9vh" :reverse="true" />
        <dv-decoration-11 style="width: 16vw; height: 5vh" class="tit">
            <span class="titC">宝汇冷链配送中心智慧平台</span>
        </dv-decoration-11>
        <dv-decoration-5 style="width: 26vw; height: 5vh" class="topTit" />
        <dv-border-box-4 class="head">
            <div class="head_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/1.png" alt="" /> &nbsp;告警中心
                </span>
                <vue-seamless-scroll :data="items" :class-option="classOption" id="content">
                    <ul>
                        <li v-for="(item, index) in items" :key="index">
                            <img src="@/assets/images/default/card_photo.jpg" alt="" />
                            <div class="accessInfo">
                                <span style="color: yellow">{{ item.deviceName }}</span>
                                <span>{{ item.alarmTime }} &nbsp;&nbsp;
                                    <span style="color: red">{{ item.alarmTypeCn }}</span></span>
                            </div>
                        </li>
                    </ul>
                </vue-seamless-scroll>
            </div>
        </dv-border-box-4>
        <dv-border-box-8 class="traffic">
            <div class="traffic_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/2.png" alt="" /> &nbsp;车流统计
                </span>
                <div id="trafficEchart"></div>
                <div class="in_out">
                    <div>
                        <img src="@/assets/images/baohui/in-3.png" alt="" />
                        <div class="accessInfo">
                            <span>进入车辆</span>
                            <span>{{ enterCar }}辆</span>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/images/baohui/out-4.png" alt="" />
                        <div class="accessInfo">
                            <span>离开车辆</span>
                            <span>{{ outCar }}辆</span>
                        </div>
                    </div>
                </div>
            </div>
        </dv-border-box-8>
        <dv-border-box-1 class="park">
            <div class="park_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/3.png" alt="" /> &nbsp;园区分布
                </span>
                <div class="distribution">
                    <div>
                        <img src="@/assets/images/baohui/house-5.png" alt="" @click="modelShow(0)" />
                        园区展示
                    </div>
                    <div>
                        <img src="@/assets/images/baohui/house-5.png" alt="" @click="modelShow(1)" />
                        冷库
                    </div>
                    <div>
                        <img src="@/assets/images/baohui/house-5.png" alt="" @click="modelShow(2)" />
                        常温库1楼
                    </div>
                    <div>
                        <img src="@/assets/images/baohui/house-5.png" alt="" @click="modelShow(3)" />
                        常温库2楼
                    </div>
                </div>
            </div>
        </dv-border-box-1>
        <dv-border-box-10 class="number">
            <div class="streamBox">
                <div class="person-stream">
                    <span class="stream">当天打卡人数</span>
                    <span class="num">
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="cars-stream">
                    <span class="stream">当天园区车辆</span>
                    <span class="num">
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span><img src="@/assets/images/num/0@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/1@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/2@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/3@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/4@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/5@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/6@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/7@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/8@2x.png" alt="" /></span>
                                <span><img src="@/assets/images/num/9@2x.png" alt="" /></span>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </dv-border-box-10>
        <dv-border-box-4 :reverse="true" class="danger">
            <div class="danger_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/4.png" alt="" /> &nbsp;安全隐患处理
                </span>
                <div id="dangerEchart"></div>
            </div>
        </dv-border-box-4>
        <dv-border-box-8 :reverse="true" class="patrol">
            <div class="patrol_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/5.png" alt="" /> &nbsp;巡更系统
                </span>
                <div id="patrolEchart"></div>
            </div>
        </dv-border-box-8>
        <dv-border-box-10 class="access">
            <div class="access_content">
                <span class="head_top">
                    <img src="@/assets/images/baohui/6.png" alt="" /> &nbsp;出入记录
                </span>
                <div id="accessEchart"></div>
                <div class="dateBox">
                    <div class="day active" @click="findAccessByDate(0)">日</div>
                    <div class="month" @click="findAccessByDate(1)">月</div>
                    <div class="year" @click="findAccessByDate(2)">年</div>
                </div>
            </div>
        </dv-border-box-10>
        <dv-border-box-9 class="inpark">
            <div class="inpark_content">
                <span @click="electronicFence();eleflag=!eleflag">电子围栏</span>
                <span @click="parkCamera();cameraShow=!cameraShow">园区摄像头</span>
            </div>
        </dv-border-box-9>
        <dv-loading class="loading" v-if="loadingShow">等待模型加载...</dv-loading>
        <el-button type="primary" class="addCamera" @click="getCameraList();cameraList = true;">摄像头列表</el-button>
        <div class="tableData" v-if="cameraList">
            <el-button type="primary" @click="cameraList = false;addCameraShow = false">关闭列表</el-button>
            <el-button size="mini" type="danger" @click="addCamera()">添加设备</el-button>
            <el-table :data="cameraData" style="width:100%;" height="900">
                <el-table-column label="摄像头名称" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.name }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="摄像头类型" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.cameraType }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="播放地址" width="300">
                    <template slot-scope="scope">
                        <p>{{ scope.row.videoUrl }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="摄像头X坐标" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.coordinateX }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="摄像头Y坐标" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.coordinateY }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="摄像头Z坐标" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.coordinateZ }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="模型材质组" width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.mesh }}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="cameraEdit(scope.$index, scope.row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="formCamera" v-show="addCameraShow">
            <el-form label-position="right" :model="formCamera" class="">
                <el-form-item label="摄像头名称">
                    <el-input v-model="formCamera.name"></el-input>
                </el-form-item>
                <el-form-item label="摄像头类型">
                    <!-- <el-input v-model="formCamera.cameraType"></el-input> -->
                    <el-select v-model="formCamera.cameraType" clearable placeholder="请选择摄像头类型">
                        <el-option v-for="(item,index) in deviceType" :key="index" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="播放地址">
                    <el-input v-model="formCamera.videoUrl"></el-input>
                </el-form-item>
                <el-form-item label="摄像头X坐标">
                    <el-input v-model="formCamera.coordinateX"></el-input>
                </el-form-item>
                <el-form-item label="摄像头Y坐标">
                    <el-input v-model="formCamera.coordinateY"></el-input>
                </el-form-item>
                <el-form-item label="摄像头Z坐标">
                    <el-input v-model="formCamera.coordinateZ"></el-input>
                </el-form-item>
                <el-form-item label="旋转中心经度">
                    <el-input v-model="formCamera.centerLongitude"></el-input>
                </el-form-item>
                <el-form-item label="旋转中心纬度">
                    <el-input v-model="formCamera.centerLatitude"></el-input>
                </el-form-item>
                <el-form-item label="旋转朝向度数">
                    <el-input v-model="formCamera.heading"></el-input>
                </el-form-item>
                <el-form-item label="模型材质组">
                    <el-input v-model="formCamera.mesh"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="info" @click="updateCameraXYZ(formCamera.id)">完成</el-button>
            <el-button type="info" @click="addCameraShow = false">关闭</el-button>
        </div>

        <el-button type="primary" class="backHome" @click="backHome()">返回</el-button>
    </div>
</template>
<script>
const THREE = mapvgl.THREE;
import axios from 'axios';
import store from '@/store';
import { getDeviceType, saveOrUpdate, getVideoInfoList, getAccessCount, getKeepWatchPlaceCount, getHiddenDangerCount, getTrafficCount, getDayCount } from '@/api/home'
export default {
    name: "Dashboard",
    data () {
        return {
            n: 120,
            m: 50,
            mx: 11606162,
            my: 3590843,
            origin: null,
            spriteName: 1,
            playerId: null,
            videoLists: [],
            flag: null,
            playerLists: [],
            percent: 0,
            loadingShow: true,
            eleflag: false,
            enterCar: 0,
            outCar: 0,
            cameraList: false,
            requestId: null,
            modelUrl: "/static/3Dmodules/2020-baohui/baohuiGltf/baohui.gltf",
            formCamera: {
                address: null,
                cameraType: null,
                code: null,
                coordinateX: 0,
                coordinateY: 0,
                coordinateZ: 0,
                departmentId: null,
                name: null,
                videoUrl: null,
                id: null,
                centerLongitude: null,
                centerLatitude: null,
                heading: null,
                mesh: null
            },
            cameraData: [],
            eleData: [],
            addCameraShow: false,
            resizeEchartIds: new Set(),
            items: [],
            timeLine: null,
            deviceType: [],
            cameraShow: false,
            eleGroup: [],
            eleMaterial: [],
            timerStop: null,
            timerM: null,
        };
    },
    methods: {
        //加载地图
        baiduMap () {
            this.map = new BMapGL.Map("map_container"); // 创建Map实例
            this.map.centerAndZoom(new BMapGL.Point(104.258471, 30.847504), 20); // 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            this.map.setHeading(163);
            this.map.setTilt(70);
            this.map.setMapStyleV2({
                styleId: "1c32e130ab28977417d56e7f02cd5248",
            });
            this.map.addEventListener("click", e => {
                console.log('点击位置墨卡托平面坐标：');
                console.log(e.point.lng + ',' + e.point.lat);
                console.log("墨卡托平面坐标转换为经纬度球体坐标:");
                console.log(this.map.mercatorToLnglat(e.point.lng, e.point.lat));
                console.log("————————————————");
            });
            this.map.disableDoubleClickZoom(); //阻止地图双击事件
            this.view = new mapvgl.View({
                map: this.map,
            });
            this.origin = new BMapGL.Point(this.mx, this.my);
            console.log("————————map————————");
            console.log(this.map);
            console.log("————————————————");
        },
        //加载threelayer实例，里面涵盖了three的scene,camera,renderer等等
        tLayer () {
            console.log("————————THREE————————");
            console.log(THREE);
            console.log("————————————————");
            this.threeLayer = new mapvgl.ThreeLayer(); //创建一个threelayer
            this.view.addLayer(this.threeLayer); //添加到view
            this.threeLayer.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                1,
                10000
            ); //将this.threeLayer.camera变成透视相机
            // this.threeLayer.renderer.antialias = true;
            console.log("-----------this.threeLayer----------");
            console.log(this.threeLayer);
            console.log("---------------------");
        },
        //加载模型
        loadModel (url, name) {
            this.loadingShow = true;
            this.group = [];
            const gltfLoader = new THREE.GLTFLoader(); //读取gltf模型
            gltfLoader.load(url, (gltf) => {
                // gltf.scene
                console.log("———————模型体—————————");
                console.log(gltf.scene);
                console.log("————————1————————");

                this.loadingShow = false;

                this.model1 = gltf.scene;

                this.model1.name = name;

                this.model1.traverse((child) => {
                    if (child.isMesh) {
                        this.group.push(child);
                    }
                });

                // group = gltf.scene;
                this.model1.rotation.set((Math.PI * 1) / 2, (Math.PI * 10.78) / 6, 0);
                this.model1.scale.set(0.0016, 0.0016, 0.0016);

                this.threeLayer.add(this.model1, this.origin); //设置模型位置坐标
                // console.log(gltf.scene);
            });
        },
        //鼠标双击事件
        onMouseclick (event) {
            let intersects = this.getIntersects(event, this.group);

            // 获取选中最近的 Mesh
            if (intersects.length > 0 && intersects[0].object instanceof THREE.Mesh) {
                this.selectObject = intersects[0].object;
                console.log("选中Mesh!");
                //选中效果
                this.changeMaterial(this.selectObject);
            } else {
                console.log("未选中Mesh!");
            }
        },
        //鼠标单击事件
        onMouseclickCamera (event) {
            let intersects = this.getIntersects(event, this.spriteList);

            // 获取选中最近的 Mesh
            if (
                intersects.length > 0 &&
                intersects[0].object instanceof THREE.Sprite
            ) {
                console.log("选中Sprite!");
                //选中效果

                console.log("----------click-----------");
                console.log("css", intersects[0].object.name);
                console.log("---------------------");

                this.playVideo(intersects[0].object.name, intersects[0].object.Vname);

            } else {
                console.log("未选中Sprite!");
            }
        },
        //播放过滤
        playVideo (id, Vname) {
            this.playerId = null;

            if (this.flag != id) {
                $(".label").css("display", "none");
            }
            $("#" + id).toggle();
            this.flag = id;
            // 清除播放器列表
            if (this.playerLists && this.playerLists.length > 0) {
                for (let i of this.videoLists) {
                    i.pause();
                }
                for (let i of this.playerLists) {
                    i.destroy();
                }
                this.playerLists = [];
                this.videoLists = [];
            }
            $(".label").empty();
            // $(`<img class='close' src="./images/car/modal_close.png">`).appendTo($('#' + id));
            $(`<i class='el-icon-circle-close close'></i>`).appendTo($('#' + id));
            $(`<button class='live'>直播</button>`).appendTo($('#' + id));
            $('.label .live').click(() => {
                this.flag = null;
                this.playVideo(id, Vname);
                return;
            });

            $('.label .close').click(() => {
                this.playVideo(id, Vname);
                return;
            });
            this.streamedian(id, Vname);
        },
        //返回raycaster射线与相机相交最近的数组
        getIntersects (event, child) {
            event.preventDefault();
            console.log("event.clientX:" + event.clientX);
            console.log("event.clientY:" + event.clientY);

            // 声明 raycaster 和 mouse 变量
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

            // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
            raycaster.setFromCamera(mouse, this.threeLayer.camera); //若报错 THREE.Raycaster: Unsupported camera type.解决:更改相机类型

            // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
            var intersects = raycaster.intersectObjects(child);

            console.log("----------intersects-----------");
            console.log(intersects);
            console.log("---------------------");

            //返回选中的对象
            return intersects;
        },
        //改变模型的material
        changeMaterial (object) {
            console.log("----------object-----------");
            console.log(object);
            console.log("---------------------");

            let material = new THREE.MeshLambertMaterial({
                color: 0xffffff * Math.random(),
                transparent: object.material.transparent ? false : true,
                opacity: 0.8,
            });
            object.material = material;
        },
        //设置光线
        light () {
            let light = new THREE.DirectionalLight("#ffffff", 2); //添加灯光
            light.position.set(0, 50, 100);
            light.lookAt(0, 0, 0);
            this.threeLayer.scene.add(light);
            // this.threeLayer.add(light, this.origin);
        },
        //坐标系辅助
        axes () {
            let axes = new THREE.AxesHelper(300); //坐标轴长度
            this.threeLayer.add(axes, this.origin); //设置模型位置坐标
        },
        //摄像头数据处理
        getCameraInfo (data) {
            // let data = this.cameraData;
            //mercatorToLnglat  lnglatToMercator

            for (let i in data) {
                data[i].coordinateX = this.map.lnglatToMercator(data[i].coordinateX, data[i].coordinateY)[0];
                data[i].coordinateY = this.map.lnglatToMercator(data[i].coordinateX, data[i].coordinateY)[1];
                this.imgLoad(
                    Number(data[i].coordinateX),
                    Number(data[i].coordinateY),
                    Number(data[i].coordinateZ),
                    data[i].cameraType,
                    data[i].deviceLdId
                );

                // console.log('----------' + i + '-----------');
                // console.log(data[i].coordinateX, data[i].coordinateY);

            }
        },
        //摄像头加载
        imgLoad (x, y, z, type, name) {
            let textured = new THREE.TextureLoader().load(
                "/static/images/" + type + ".png"
            );
            let spriteMaterial = new THREE.SpriteMaterial({
                // color: 0xffffff,
                map: textured,
            });
            //摄像头图标
            let sprite = new THREE.Sprite(spriteMaterial);
            sprite.name = "sprite" + this.spriteName++;
            sprite.Vname = name;
            sprite.Vtype = type;
            sprite.position.z = z;
            sprite.scale.x = 5;
            sprite.scale.y = 5;
            sprite.visible = false;
            this.threeLayer.add(sprite, new BMapGL.Point(x, y));
            //视频盒子
            const label = this.create2DObject(sprite.name);
            label.position.z = z + 30;
            this.threeLayer.add(label, new BMapGL.Point(x, y));

            this.css2ObjList.push(label); //存储label
            this.spriteList.push(sprite); //存储sprite
        },
        //css2渲染
        css2Render () {
            this.CSSRender = new THREE.CSS2DRenderer();
            this.CSSRender.setSize(window.innerWidth, window.innerHeight);
            this.CSSRender.domElement.style.position = "absolute";
            this.CSSRender.domElement.style.top = 0;
            $("#map_container").append(this.CSSRender.domElement);
        },
        //实时渲染（每60s一次）
        renderScene () {
            this.threeLayer.renderer.render(
                this.threeLayer.scene,
                this.threeLayer.camera
            );
            this.CSSRender.render(this.threeLayer.scene, this.threeLayer.camera);
            this.requestId = requestAnimationFrame(this.renderScene);
        },
        //创建css2dobject
        create2DObject (id) {
            let div = document.createElement("div");
            // let str = `<video id="id+${id}" controls autoplay>你的浏览器可能不支持该播放器</video>`
            div.style.width = "300px";
            div.style.height = "240px";
            // div.style.background = "rgba(10,18,51,0.8)";
            div.style.color = "#fff";
            div.style.display = "none";
            div.style.cursor = "pointer";
            // div.innerHTML = str;
            div.className = "label";
            div.setAttribute("id", id);
            const label = new THREE.CSS2DObject(div);
            return label;
        },
        //播放器
        streamedian (id, Vname) {
            let url;
            let that = this;
            for (let i in this.cameraData) {
                if (this.cameraData[i].deviceLdId == Vname) {
                    url = this.cameraData[i].videoUrl;
                }
            }

            console.log('----------url-----------');
            console.log(url);
            console.log('---------------------');


            if (!url) {
                // alert('播放地址不存在');
                this.$notify({
                    message: '播放地址不存在',
                    type: 'warning'
                });
                return;
            }

            if (document.getElementById(id).style.display == "none") {
                console.log("已销毁播放器");
                return;
            }

            //移除绑定事件
            if (this.timeLine) {
                this.timeLine.removeEventListener('change', timeChange, false);
                this.timeLine.removeEventListener("mousemove", timeShow, false);
                this.timeLine = null;
            }

            this.playerId = id + "Id";
            $(
                `<video id="${this.playerId}" style="width:100%;height:100%" muted controls autoplay></video>
                 <div class="progressV">
                    <input type="range" class="timeLine"  min="0" max="100" value="100" style="width:100%;">
                    <div class="timeFloat">11-20 / 04:20:50</div>
                </div>`
            ).appendTo($("#" + id));

            // var n = parseInt(Math.random() * 10);
            url = 'rtsp://admin:zzxy2009@jtht.tpddns.cn:9683/Streaming/Channels/102';
            // this.videoN += 100;

            let errHandler = function (err) {
                console.log("errHandler", err.message);
            };

            var playerOptions = {
                socket: "ws://192.168.10.250:9080/ws/",
                redirectNativeMediaErrors: true,
                bufferDuration: 30,
                errorHandler: errHandler,
                // infoHandler: infHandler
            };

            var html5Player = document.getElementById(this.playerId);
            html5Player.src = url;
            var player = Streamedian.player(this.playerId, playerOptions);
            var nativePlayer = document.getElementById(this.playerId);
            nativePlayer.addEventListener("play", function () {
                //监听播放
                console.log("开始播放");
                console.log(nativePlayer.currentTime, nativePlayer.buffered.end(0));
                // setTimeout(function () {
                //     nativePlayer.currentTime = nativePlayer.buffered.end(0);
                // }, 500);
            });

            //监听进度条
            this.timeLine = document.getElementsByClassName('timeLine')[0];
            this.timeLine.addEventListener("change", timeChange, false);

            this.timeLine.onmousedown = function () {
                that.timeLine.addEventListener("mousemove", timeShow, false);
                $('.timeFloat').first().css("visibility", 'visible');
            }
            this.timeLine.onmouseup = function () {
                that.timeLine.removeEventListener("mousemove", timeShow, false);
                $('.timeFloat').first().css("visibility", 'hidden');
            }

            function timeShow () {
                // console.log("————————————————");
                // console.log(this.timeLine.value,this.timeLine.offsetWidth);
                // console.log("————————————————");
                let distanceTime, firstTime, startTime, nowTime;
                nowTime = new Date().getTime();
                distanceTime = 24 * 60 * 60 * 1000;
                firstTime = nowTime - distanceTime;
                startTime = parseInt(distanceTime * (Number(that.timeLine.value))) / 100 + firstTime;
                let siderLeft = Number(that.timeLine.value) / 100 * that.timeLine.offsetWidth - 65;
                var date = new Date(startTime);
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":";
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":";
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                var str = MM + DD + ' / ' + hh + mm + ss;
                console.log("————————————————");
                console.log(str);
                console.log("————————————————");
                $('.timeFloat').first().css("left", siderLeft + "px");
                $('.timeFloat').html(str);
                console.log("siderLeft", siderLeft);
            }

            function timeChange () {
                console.log('orgin_url', url);
                let nowTime, distanceTime, firstTime, startTime, New_url, edit_url;

                nowTime = new Date().getTime();
                distanceTime = 24 * 60 * 60 * 1000;
                firstTime = nowTime - distanceTime;
                startTime = parseInt(distanceTime * (Number(that.timeLine.value))) / 100 + firstTime;
                startTime = that.formatDate(startTime);
                New_url = url.replace('Channels', 'tracks').slice(0, -1);
                edit_url = New_url + '1?starttime=' + startTime
                console.log('edit_url', edit_url);

                player.destroy();
                player = null;
                html5Player.src = edit_url;
                player = Streamedian.player(that.playerId, playerOptions);

                that.playerLists.push(player);
                that.videoLists.push(nativePlayer);

                console.log("———————value—————————");
                console.log('进度', that.timeLine.value + '%');
                console.log('nowTime', nowTime);
                console.log('distanceTime', distanceTime);
                console.log('firstTime', firstTime);
                console.log('startTime', startTime);
                console.log('edit_url', edit_url);
                console.log("————————————————");
            }

            this.playerLists.push(player);
            this.videoLists.push(nativePlayer);
        },
        //时间处理
        formatDate (date) {
            var date = new Date(date);
            var YY = date.getFullYear();
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + 't';
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + 'z';
            return String(YY) + String(MM) + String(DD) + String(hh) + String(mm) + String(ss);
        },
        //告警中心数据滚动
        scroll () {
            this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setInterval(() => {
                //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                this.items.push(this.items[0]); // 将数组的第一个元素添加到数组的
                this.items.shift(); //删除数组的第一个元素
                this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            }, 500);
        },
        //车流统计
        trafficEchart (a) {
            this.chart1 = this.$echarts.init(
                document.getElementById("trafficEchart")
            );
            var data = [],
                dataL = [];
            a.totalAmount = a.gateOne + a.gateTwo;
            $.each(a, function (name, value) {
                if (name == "gateOne") {
                    data[0] = { value: value, name: "1号门 " + value + "辆" };
                } else if (name == "gateTwo") {
                    data[1] = { value: value, name: "2号门 " + value + "辆" };
                }
            });
            for (let i = 0; i < data.length; i++) {
                dataL[i] = data[i].name;
            }
            let option = {
                tooltip: {
                    trigger: "item",
                    position: ["50%", "30%"],
                    formatter: "{a} <br/>{b}({d}%)",
                },
                legend: {
                    orient: "vertical",
                    right: 20,
                    y: "center",
                    data: dataL,
                    textStyle: {
                        //图例文字的样式
                        color: "#fff",
                        fontSize: 13,
                    },
                    /* itemWidth: 24,
                                         itemHeight: 15,*/
                    itemGap: 20,
                },
                color: ["#a0ce3a ", "#1e9bd1"],
                series: [
                    {
                        name: "小区信息",
                        type: "pie",
                        center: ["30%", "52%"],
                        radius: ["20%", "50%"],
                        // avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{d}%",
                                // position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "12",
                                    fontWeight: "bold",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                length: 5,
                            },
                        },
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };
            this.chart1.setOption(option);
        },
        //数字流动
        numberScroll (data) {
            // let data = {
            //     faceAccessRecordDayCount: [1, 2, 3, 4, 6],
            //     carAccessRecordDayCount: [0, 7, 5, 8, 9],
            // };
            let len1 = String(data.faceAccessRecordDayCount).length;
            let len2 = String(data.carAccessRecordDayCount).length;

            data.faceAccessRecordDayCount = String(data.faceAccessRecordDayCount).split(',');
            data.carAccessRecordDayCount = String(data.carAccessRecordDayCount).split(',');
            for (let i = 0; i < 5 - len1; i++) {
                data.faceAccessRecordDayCount.unshift(0);
            }
            for (let i = 0; i < 5 - len2; i++) {
                data.carAccessRecordDayCount.unshift('0');
            }

            for (let i in data.faceAccessRecordDayCount) {
                data.faceAccessRecordDayCount[i] = Number(data.faceAccessRecordDayCount[i]);
                $(".person-stream>.num > ul > li")
                    .eq(i)
                    .css("top", this.dealNumber(data.faceAccessRecordDayCount[i]) + "vh");
            }
            for (let i in data.carAccessRecordDayCount) {
                // data.car[i] = parseInt(Math.random() * 10);
                data.carAccessRecordDayCount[i] = Number(data.carAccessRecordDayCount[i]);
                $(".cars-stream>.num > ul > li")
                    .eq(i)
                    .css("top", this.dealNumber(data.carAccessRecordDayCount[i]) + "vh");
            }
        },
        //数字滚动规则
        dealNumber (n) {
            let top = 0.5;
            switch (n) {
                case 0:
                    top = 0.5;
                    break;
                case 1:
                    top = -3.2;
                    break;
                case 2:
                    top = -6.8;
                    break;
                case 3:
                    top = -10.5;
                    break;
                case 4:
                    top = -14.2;
                    break;
                case 5:
                    top = -18;
                    break;
                case 6:
                    top = -21.6;
                    break;
                case 7:
                    top = -25.5;
                    break;
                case 8:
                    top = -29;
                    break;
                case 9:
                    top = -32.8;
                    break;
                default:
                    break;
            }
            return top;
        },
        //安全隐患处理
        dangerEchart (a) {
            this.chart2 = this.$echarts.init(document.getElementById("dangerEchart"));
            var data = [],
                dataL = [];
            // a = {
            //     totalAmount: 241,
            //     beforeDeal: 121,
            //     dealing: 85,
            //     dealed: 35,
            // };
            $.each(a, function (name, value) {
                if (name == "processed") {
                    data[0] = { value: value, name: "已处理 " + value };
                } else if (name == "processing") {
                    data[1] = { value: value, name: "处理中 " + value };
                } else if ((name = "untreated")) {
                    data[2] = { value: value, name: "未处理 " + value };
                }
            });
            for (let i = 0; i < data.length; i++) {
                dataL[i] = data[i].name;
            }
            let option = {
                tooltip: {
                    trigger: "item",
                    position: ["50%", "50%"],
                    formatter: "{a} <br/>{b}({d}%)",
                },
                legend: {
                    orient: "horizontal",
                    bottom: 50,
                    x: "center",
                    data: dataL,
                    textStyle: {
                        //图例文字的样式
                        color: "#fff",
                        fontSize: 13,
                    },
                    /* itemWidth: 24,
                                         itemHeight: 15,*/
                    itemGap: 20,
                },
                color: ["#a0ce3a ", "#b89046", "#1e9bd1"],
                series: [
                    {
                        name: "小区信息",
                        type: "pie",
                        center: ["55%", "32%"],
                        radius: ["20%", "50%"],
                        // avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{d}%",
                                // position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "12",
                                    fontWeight: "bold",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                length: 5,
                            },
                        },
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };
            this.chart2.setOption(option);
        },
        //巡更系统统计
        patrolEchart (a) {
            var _this = this;
            this.chart3 = this.$echarts.init(document.getElementById("patrolEchart"));
            // a = [75, 65, 94, 51, 24, 45, 44];
            let a1 = [];
            let a2 = [];
            let datax = [];
            for (let i in a) {
                a1.push(a[i].normal);
                datax.push(a[i].date);
                if (a[i].total) {
                    a2.push(parseInt(a[i].normal / a[i].total));
                } else {
                    a2.push(0);
                }
            }
            let option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true,
                        },
                    },
                },
                legend: {
                    data: ["巡查次数", "巡查合格率"],
                    top: "2%",
                    right: "10",
                    textStyle: {
                        color: "white",
                        fontSize: 10,
                    },
                },
                xAxis: {
                    data: datax,
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: "rgba(250,250,250,0.4)",
                            width: 1,
                        },
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "white", //X轴文字颜色
                            fontSize: 10,
                        },
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(0,0,0,.4)", "rgba(250,250,250,0)"],
                        },
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        // max: 100,
                        name: "次数",
                        interval: 1,
                        nameTextStyle: {
                            color: "white",
                            fontSize: 10,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#ccc",
                                width: 1,
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "white",
                                fontSize: 12,
                            },
                        },
                    },
                    {
                        type: "value",
                        min: 0,
                        max: 100,
                        name: "合格率",
                        nameTextStyle: {
                            color: "white",
                            fontSize: 10,
                        },
                        position: "right",
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            formatter: "{value}%", //右侧Y轴文字显示
                            textStyle: {
                                color: "white",
                                fontSize: 10,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "巡查次数",
                        type: "bar",
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgba(49,197,192, 0.8)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(49,197,192, 0.1)",
                                    },
                                ]),
                                borderColor: new _this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(160,196,225, 1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(61,126,235, 1)",
                                        },
                                    ]
                                ),
                                borderWidth: 1,
                            },
                        },
                        data: a2,
                    },
                    {
                        name: "巡查合格率",
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: false, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        symbol: "circle", //标记的图形为实心圆
                        symbolSize: 8, //标记的大小
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#1045A0",
                            borderColor: "#3D7EEB",
                            width: 2,
                            shadowColor: "#3D7EEB",
                            shadowBlur: 4,
                        },
                        lineStyle: {
                            color: "#3D7EEB",
                            width: 2,
                            shadowColor: "#3D7EEB",
                            shadowBlur: 4,
                        },
                        areaStyle: {
                            color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "rgba(61,126,235, 0.5)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(61,126,235, 0)",
                                },
                            ]),
                        },
                        data: a1,
                    },
                ],
            };
            this.chart3.setOption(option);
        },
        //出入记录
        accessEchart (datax, a, type) {
            var _this = this;
            this.chart4 = this.$echarts.init(document.getElementById("accessEchart"));

            // a1 ? a1 : a1 = [175, 75, 94, 151, 24, 145, 74, 142, 65, 234, 211, 98];
            // a2 ? a2 : a2 = [88, 155, 166, 75, 259, 78, 294, 94, 251, 111, 58, 67];
            datax
                ? datax
                : (datax = [
                    "00:00",
                    "03:00",
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00",
                    "21:00",
                ]);
            let a1 = [],
                a2 = [];

            if (type == "day") {
                if (a.faceDay.length > 0) {
                    a1 = [
                        a.faceDay[0].twentyFourOclock,
                        a.faceDay[0].threeOclock,
                        a.faceDay[0].sixOclock,
                        a.faceDay[0].nineOclock,
                        a.faceDay[0].twelveOclock,
                        a.faceDay[0].fifteenOclock,
                        a.faceDay[0].eighteenOclock,
                        a.faceDay[0].twentyOneOclock,
                    ];
                    a2 = [
                        a.carDay[0].twentyFourOclock,
                        a.carDay[0].threeOclock,
                        a.carDay[0].sixOclock,
                        a.carDay[0].nineOclock,
                        a.carDay[0].twelveOclock,
                        a.carDay[0].fifteenOclock,
                        a.carDay[0].eighteenOclock,
                        a.carDay[0].twentyOneOclock,
                    ];
                } else {
                    a1 = [0, 0, 0, 0, 0, 0, 0, 0];
                    a2 = [0, 0, 0, 0, 0, 0, 0, 0];
                }
            } else if (type == "month") {
                if (a.faceMonth.length > 0) {
                    for (let i in a.faceMonth) {
                        a1.push(a.faceMonth[i].count);
                        a2.push(a.carMonth[i].count);
                    }
                } else {
                    a1 = [0, 0, 0, 0, 0];
                    a2 = [0, 0, 0, 0, 0];
                }
            } else {
                if (a.faceYear.length > 0) {
                    for (let i in a.faceYear) {
                        a1.push(a.faceYear[i].count);
                        a2.push(a.carYear[i].count);
                    }
                } else {
                    a1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    a2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
            }
            for (let i in a1) {
                a1[i] ? a1[i] : (a1[i] = 0);
            }
            for (let j in a2) {
                a2[j] ? a2[j] : (a2[j] = 0);
            }
            let option = {
                legend: {
                    show: true,
                    icon: "rect",
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 10,
                    left: "25%",
                    top: "2%",
                    textStyle: {
                        fontSize: 10,
                        color: "white",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(0, 255, 233,0)",
                                    },
                                    {
                                        offset: 0.5,
                                        color: "rgba(255, 255, 255,1)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(0, 255, 233,0)",
                                    },
                                ],
                                global: false,
                            },
                        },
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            show: true,
                        },
                        splitArea: {
                            // show: true,
                            color: "#f00",
                            lineStyle: {
                                color: "#f00",
                            },
                        },
                        axisLabel: {
                            color: "#fff",
                        },
                        splitLine: {
                            show: false,
                        },
                        boundaryGap: false,
                        data: datax,
                    },
                ],

                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        // max: 140,
                        splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            // margin: 20,
                            textStyle: {
                                color: "#d1e6eb",
                                fontSize: 10,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: "人",
                        type: "line",
                        smooth: true, //是否平滑
                        showAllSymbol: false,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 1,
                        lineStyle: {
                            normal: {
                                color: "#00b3f4",
                            },
                        },
                        itemStyle: {
                            color: "#00b3f4",
                        },
                        tooltip: {
                            show: true,
                        },
                        areaStyle: {
                            normal: {
                                color: new _this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(0,179,244,0.3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,179,244,0)",
                                        },
                                    ],
                                    false
                                ),
                                shadowColor: "rgba(0,179,244, 0.9)",
                                shadowBlur: 20,
                            },
                        },
                        data: a1,
                    },
                    {
                        name: "车",
                        type: "line",
                        smooth: true, //是否平滑
                        showAllSymbol: false,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 2,
                        lineStyle: {
                            normal: {
                                color: "#00ca95",
                            },
                        },
                        itemStyle: {
                            color: "#00ca95",
                        },
                        tooltip: {
                            show: true,
                        },
                        areaStyle: {
                            normal: {
                                color: new _this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(0,202,149,0.3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,202,149,0)",
                                        },
                                    ],
                                    false
                                ),
                                shadowColor: "rgba(0,202,149, 0.9)",
                                shadowBlur: 20,
                            },
                        },
                        data: a2,
                    },
                ],
            };
            this.chart4.setOption(option);
        },
        //根据年月日获取出入记录
        findAccessByDate (index) {
            $(".dateBox > div").removeClass("active");
            $(".dateBox > div").eq(index).addClass("active");
            this.chart4.dispose();
            let datax = [];
            let dateType;
            if (index == 0) {
                datax = [
                    "00:00",
                    "03:00",
                    "06:00",
                    "09:00",
                    "12:00",
                    "15:00",
                    "18:00",
                    "21:00",
                ];
                dateType = "day";
            } else if (index == 1) {
                datax = [];
                dateType = "month";
            } else {
                datax = [
                    "一月",
                    "二月",
                    "三月",
                    "四月",
                    "五月",
                    "六月",
                    "七月",
                    "八月",
                    "九月",
                    "十月",
                    "十一月",
                    "十二月",
                ];
                dateType = "year";
            }
            this.accessCount(dateType, datax);
            // this.accessEchart(datax);
        },
        //电子围栏
        electronicFence () {
            console.log("----------电子围栏-----------");
            console.log(this.group, this.model1.name, this.eleflag);
            console.log("---------------------");
            this.cameraShow = false;
            this.clearCamera();
            let material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                transparent: true,
                opacity: 0.8,
            });

            if (!this.eleflag) {

                //显示电子围栏图标
                for (let i in this.spriteList) {
                    if (this.spriteList[i].Vtype == "eleFence") {
                        this.spriteList[i].visible = true;
                    }
                }

                //改变模型mesh
                if (this.model1.name == "baohui") {
                    for (let i = 0; i < this.group.length; i++) {
                        if (this.group[i].name == "Mesh1377 __1_1 Model_1_1" ||
                            this.group[i].name == "Mesh1378 __1_1 Model_1_0" ||
                            this.group[i].name == "Mesh49 Group2 Model_1_2" ||
                            this.group[i].name == "Mesh50 Group2 Model_1_1" ||
                            this.group[i].name == "Mesh25 Group1 Model_1_0" ||
                            this.group[i].name == "Mesh24 Group1 Model_1_1" ||
                            this.group[i].name == "Mesh96 Group3 Model_1_0" ||
                            this.group[i].name == "Mesh98 Group3 Model_1_0" ||
                            this.group[i].name == "Mesh162 Group4 Model_1_2" ||
                            this.group[i].name == "Mesh233 Group5 Model_1_0" ||
                            this.group[i].name == "Mesh276 Group6 Model_1_2" ||
                            this.group[i].name == "Mesh333 Group8 Model_1_2" ||
                            this.group[i].name == "Mesh308 Group7 Model_1_3"
                        ) {
                            let temporaryObj = {};
                            temporaryObj.material = this.group[i].material;
                            temporaryObj.index = i;
                            this.materialList.push(temporaryObj);
                            this.group[i].material = material;
                        }
                    }
                }
                // } else if (this.model1.name == "lenku") {
                //     for (let i = 0; i < this.group.length; i++) {
                //         if (
                //             this.group[i].name == "Mesh1273 __3_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1276 __3_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1087 __1_1 Model_1_1" ||
                //             this.group[i].name == "Mesh1088 __1_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1051 __2_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1275 __3_1 Model_1_0"
                //         ) {
                //             let temporaryObj = {};
                //             temporaryObj.material = this.group[i].material;
                //             temporaryObj.index = i;
                //             this.materialList.push(temporaryObj);
                //             this.group[i].material = material;
                //         }
                //     }
                // } else if (this.model1.name == "changwen1") {
                //     for (let i = 0; i < this.group.length; i++) {
                //         if (
                //             this.group[i].name == "Mesh1087 __3_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1090 __3_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1198 __1_1 Model_1_1" ||
                //             this.group[i].name == "Mesh1199 __1_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1248 __2_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1089 __3_1 Model_1_0"
                //         ) {
                //             let temporaryObj = {};
                //             temporaryObj.material = this.group[i].material;
                //             temporaryObj.index = i;
                //             this.materialList.push(temporaryObj);
                //             this.group[i].material = material;
                //         }
                //     }
                // } else if (this.model1.name == "changwen23") {
                //     for (let i = 0; i < this.group.length; i++) {
                //         if (
                //             this.group[i].name == "Mesh1203 __3_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1206 __3_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1314 __1_1 Model_1_1" ||
                //             this.group[i].name == "Mesh1315 __1_1 Model_1_0" ||
                //             this.group[i].name == "Mesh1364 __2_1 Model_1_2" ||
                //             this.group[i].name == "Mesh1205 __3_1 Model_1_0"
                //         ) {
                //             let temporaryObj = {};
                //             temporaryObj.material = this.group[i].material;
                //             temporaryObj.index = i;
                //             this.materialList.push(temporaryObj);
                //             this.group[i].material = material;
                //         }
                //     }
                // }
            } else {
                for (let i in this.materialList) {
                    this.group[this.materialList[i].index].material = this.materialList[
                        i
                    ].material;
                }
            }



            // console.log('---------this.materialList------------');
            // console.log(this.materialList);
            // console.log('---------------------');
        },
        //园区摄像头
        parkCamera () {
            console.log("--spriteList--", this.spriteList);
            this.clearCamera();
            // if (!this.eleData) {
            //     this.electronicFence();
            //     this.eleData = true;
            // } else {
            //     this.eleData = false;
            // }
            // if (this.eleData) {
            //     this.eleData = false;
            //     this.electronicFence();
            // }
            this.eleData = false;
            if (this.cameraShow) {
                $(".label").css("display", "none");
            } else {
                for (let i in this.spriteList) {
                    if (this.spriteList[i].Vtype == "eleFence") {
                        this.spriteList[i].visible = false;
                    } else {
                        this.spriteList[i].visible = true;
                    }
                }

            }
        },
        //清除摄像头
        clearCamera () {
            //移除sprite图片和css2 div
            for (let i of this.spriteList) {
                i.visible = false;
                // this.threeLayer.remove(this.css2ObjList[i]);
            }
            // this.spriteList = [];
            // this.css2ObjList = [];
            //清除播放器
            if (this.playerLists && this.playerLists.length > 0) {
                for (let i of this.videoLists) {
                    i.pause();
                }
                for (let i of this.playerLists) {
                    i.destroy();
                }
                this.playerLists = [];
                this.videoLists = [];
            }
            $(".label").remove();
        },
        //切换模型
        modelShow (index) {
            this.eleflag = true;
            this.model1.traverse(function (obj) {
                if (obj.isMesh) {
                    obj.geometry.dispose();
                    obj.material.dispose();
                    // obj.texture.dispose();
                }
            });

            this.threeLayer.remove(this.model1); //删除之前的模型
            this.model1 = null;
            let name;
            if (index == 0) {
                this.modelUrl = "/static/3Dmodules/2020-baohui/baohuiGltf/baohui.gltf";
                name = "baohui";
            } else if (index == 1) {
                this.modelUrl = "/static/3Dmodules/2020-baohui/lenkuGltf/lengku.gltf";
                name = "lenku";
            } else if (index == 2) {
                this.modelUrl = "/static/3Dmodules/2020-baohui/changwenGltf1/changwen1.gltf";
                name = "changwen1";
            } else if (index == 3) {
                this.modelUrl =
                    "/static/3Dmodules/2020-baohui/changwenGltf2/changwen23.gltf";
                name = "changwen23";
            }
            this.loadModel(this.modelUrl, name); //加载新模型
        },
        backHome () {
            this.$router.push({ path: this.redirect || '/manage', query: this.otherQuery })
        },
        /*接口调用*/

        //获取车流统计
        trafficCount () {
            getTrafficCount().then(res => {
                this.trafficEchart(res.data);
                this.enterCar = res.data.enter;
                this.outCar = res.data.out;
            })
            //   axios({
            //     url: "index/trafficCount",
            //     method: "get",
            //   }).then((res) => {
            //     if (res.data.success) {
            //       this.trafficEchart(res.data.data);
            //       this.enterCar = res.data.data.enter;
            //       this.outCar = res.data.data.out;
            //       return;
            //     }
            //     this.$notify.error({
            //       title: "失败",
            //       message: res.data.msg,
            //     });
            //   });
        },
        //获取安全隐患
        getHiddenDangerCount () {
            getHiddenDangerCount().then(res => {
                this.dangerEchart(res.data);
            })
        },
        //获取巡跟系统
        getKeepWatchPlaceCount () {
            getKeepWatchPlaceCount().then(res => {
                this.patrolEchart(res.data);
            })
        },
        //获取出入记录
        accessCount (type, datax) {
            type ? type : (type = "day");
            getAccessCount({ enterpriseId: 2, type: type }).then(res => {
                if (type == "month" && res.data.faceMonth.length > 0) {
                    for (let i in res.data.faceMonth) {
                        datax.push(res.data.faceMonth[i].date);
                    }
                }
                this.accessEchart(datax, res.data, type);
            })
        },
        //获取摄像头数据
        getCameraList () {
            this.eleData = [];
            this.cameraData = [];
            getVideoInfoList().then(res => {
                this.cameraData = res.data.dataList;
                for (let i in res.data.dataList) {
                    if (res.data.dataList[i].cameraType == "eleFence") {
                        this.eleData.push(res.data.dataList[i])
                    }
                }
                if (this.spriteList.length == 0) {
                    this.getCameraInfo(this.cameraData);
                }

                console.log('----------eleData-----------');
                console.log(this.eleData);
                console.log('---------------------');

            });
            getDeviceType().then(res => {
                this.deviceType = res.data;
            })
        },
        //添加摄像头-
        addCamera () {
            this.addCameraShow = true;
            this.formCamera = {
                address: null,
                cameraType: null,
                code: null,
                coordinateX: 0,
                coordinateY: 0,
                coordinateZ: 0,
                departmentId: null,
                name: null,
                videoUrl: null,
                id: null,
                centerLongitude: null,
                centerLatitude: null,
                heading: null,
                mesh: null
            };
        },
        //更新摄像头数据
        updateCameraXYZ (id) {
            if (id) {
                console.log("---------------------");
                console.log("编辑");
                console.log("---------------------");
            } else {
                console.log("---------------------");
                console.log("添加");
                console.log("---------------------");
            }
            this.formCamera = this.trimDeal(this.formCamera);
            saveOrUpdate(this.formCamera).then(res => {
                this.$notify({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                });
                this.addCameraShow = false;
                this.getCameraList();
            })
        },
        //字符串空格处理
        trimDeal (obj) {
            for (let i in obj) {
                if (typeof obj[i] == 'string') {
                    obj[i] = obj[i].trim();
                }
            }
            return obj
        },
        //编辑摄像头-
        cameraEdit (index, id) {
            this.addCameraShow = true;
            this.formCamera = this.cameraData[index];
        },
        //电子围栏websoket
        websocket () {
            var _this = this;
            var socket;
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            var me = module;
            var host = window.location.host;
            var ws;
            if (window.location.protocol == 'http:') {
                console.log('----------http-----------');
                ws = 'ws';
                host = process.env.VUE_APP_BASE_API.split('http://')[1];
            } else {
                console.log('----------https-----------');
                ws = 'wss';
                host = process.env.VUE_APP_BASE_API.split('https://')[1];
            }

            if (window.WebSocket) {
                socket = new WebSocket(ws + "://" + host + "/baohui/" + store.getters.userId);
                // socket =new WebSocket("ws://localhost:9539/pt/ar/"+module.state.communityId);
                socket.onopen = function () {
                    console.log('连上了');
                    heartCheck.reset().start();
                }
                //Get message
                socket.onmessage = function (e) {

                    console.log('----------e-----------');
                    console.log(e);
                    console.log('---------------------');

                    var allData = JSON.parse(e.data);
                    if (allData) {
                        heartCheck.reset().start();

                        console.log('-----------socket----------');
                        console.log(allData);
                        console.log('---------------------');

                        _this.numberScroll(allData.data);
                        // dealTime
                        allData.data.securityAlarmRecordDataList[0].alarmTime = _this.dealTime(allData.data.securityAlarmRecordDataList[0].alarmTime);
                        _this.items.push(allData.data.securityAlarmRecordDataList[0]);
                        _this.electronicFenceWarn(allData.data.securityAlarmRecordDataList[0]);
                    }
                }
                //close
                socket.onclose = function () {
                    console.log('关闭');
                    // socket =new WebSocket("ws://rl.cnxnu.com:9659/ppf/ar/6.0");
                }
                //error
                socket.onerror = function (e) {
                    socket = new WebSocket(ws + "://" + host + "/baohui/" + store.getters.userId);
                    // socket =new WebSocket("ws://localhost:9539/pt/ar/"+module.state.communityId);
                    console.log(e);
                }
                var heartCheck = {
                    timeout: 10000,
                    timeoutObj: null,
                    serverTimeoutObj: null,
                    reset: function () {
                        clearTimeout(this.timeoutObj);
                        clearTimeout(this.serverTimeoutObj);
                        return this;
                    },
                    start: function () {
                        this.timeoutObj = setTimeout(function () {
                            if (socket.readyState == 1) {
                                console.log("电子围栏连接，发送消息保持连接");
                                socket.send("ping");
                                heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
                            } else {
                                console.log("断开状态，尝试重连");
                                socket = new WebSocket(ws + "://" + host + "/baohui/" + store.getters.userId);
                                // socket =new WebSocket("ws://localhost:9539/pt/ar/"+module.state.communityId);
                            }
                        }, this.timeout)
                    }
                }
            } else {
                alert("对不起，您的浏览器不支持WebSocket.");
            }
        },
        //电子围栏告警
        electronicFenceWarn (data) {

            console.log('----------电子围栏告警-----------');
            console.log(data);
            console.log('---------------------');

            let _this = this;

            clearTimeout(this.timerStop);
            clearInterval(this.timerM);
            console.log("————————eleGroup————————");
            console.log(this.spriteList);
            console.log("————————————————");

            data.mesh = data.mesh.split(',');

            for (i in this.eleGroup) {
                this.eleGroup[i].material = this.eleMaterial[i];
            }
            this.eleGroup = [];
            this.eleMaterial = [];
            var materialYellow = new THREE.MeshPhongMaterial({
                color: 0xffff00,
                opacity: 0.9
            });
            var materialRed = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                opacity: 0.8
            });


            for (let j in this.spriteList) {
                if (this.spriteList[j].Vname == data.deviceId) {
                    // console.log("————————data————————");
                    // console.log(data);
                    // console.log(this.spriteList[j].Vname, data.deviceId);
                    // console.log("————————————————");
                    this.spriteList[j].visible = true;
                    this.flag = null;
                    //调整视图
                    if (data.centerLongitude && data.centerLatitude) {
                        this.map.centerAndZoom(new BMapGL.Point(data.centerLongitude, data.centerLatitude), 20);
                        setTimeout(() => {
                            // this.map.setHeading(220);
                            this.map.setHeading(data.heading);
                            this.map.setTilt(70);
                        }, 500)
                    }
                    this.playerId = null;
                    this.flag = null;
                    //视频
                    this.playVideo(this.spriteList[j].name, data.deviceId);

                    // if (data.alarmType == "ELE_FENCE") {
                    //     for (let i = 0; i < this.group.length; i++) {
                    //         for (let j = 0; j < this.group.length; j++) {
                    //             if (this.group[i].name == data.mesh[j]) {
                    //                 this.eleGroup.push(this.group[i])
                    //                 this.eleMaterial.push(this.group[i].material)
                    //             }
                    //         }

                    //     }
                    // }
                }

            }

            this.timerM = setInterval(function () {
                for (i in this.eleGroup) {
                    this.eleGroup[i].material.opacity == 0.8 ? this.eleGroup[i].material = this.eleMaterial[i] : this.eleGroup[i].material = materialRed;
                }
            }, 500)

            this.timerStop = setTimeout(() => {
                // stopSound();
                clearInterval(this.timerM);
                for (let i in this.eleGroup) {
                    this.eleGroup[i].material = this.eleMaterial[i];
                }
                console.log("————————stop————————");
            }, 30000)

        },
        //查询当天数据
        getAccessCount () {
            getDayCount().then(res => {

                this.numberScroll(res.data);
                this.items = res.data.securityAlarmRecordDataList;
                for (let i in this.items) {
                    this.items[i].alarmTime = this.dealTime(this.items[i].alarmTime);
                }

            })
        },
        //时间戳处理
        dealTime (nS) {
            return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
        }
    },
    mounted () {
        this.map;
        this.view;
        this.model1;
        this.spriteList = [];
        this.css2ObjList = [];
        this.group = [];
        this.selectObject;
        this.CSSRender;
        this.chart1;
        this.chart2;
        this.chart3;
        this.chart4;
        this.materialList = [];
        this.baiduMap();
        this.tLayer();
        this.loadModel(this.modelUrl, "baohui");
        this.css2Render();
        // this.axes();
        this.light();
        this.renderScene();
        // this.accessEchart();
        this.trafficCount();
        this.getHiddenDangerCount();
        this.getKeepWatchPlaceCount();
        this.accessCount();
        this.getCameraList();
        this.getAccessCount();
        this.websocket();
        // setInterval(() => {
        //     this.numberScroll();
        // }, 2000);
        window.addEventListener("click", this.onMouseclickCamera, false);
        window.addEventListener("dblclick", this.onMouseclick, false);
        window.onresize = () => {
            this.chart1.resize();
            this.chart2.resize();
            this.chart3.resize();
            this.chart4.resize();
        };

        console.log('-----------userId----------');
        console.log(store.getters.userId);
        console.log('---------------------');

    },
    computed: {
        classOption () {
            return {
                direction: 1,
                limitMoveNum: 4,
                step: 0.5,
                hoverStop: true,
            };
        },
    },
    beforeDestroy () {

        console.log('----------beforeDestroy-----------');
        console.log('beforeDestroy');
        console.log('---------------------');

        cancelAnimationFrame(this.requestId);
        this.map = null;
        this.view = null;
        this.model1 = null;
        this.spriteList = [];
        this.group = [];
        this.selectObject = null;
        this.CSSRender = null;
        this.chart1 = null;
        this.chart2 = null;
        this.chart3 = null;
        this.chart4 = null;
        this.threeLayer = null;
        window.removeEventListener("resize", this.onResize, false);
        window.removeEventListener("click", this.onMouseclickCamera, false);
        window.removeEventListener("dblclick", this.onMouseclick, false);
        //移除绑定事件
        if (this.timeLine) {
            this.timeLine.removeEventListener('change', timeChange, false);
            this.timeLine.removeEventListener("mousemove", timeShow, false);
            this.timeLine = null;
        }
    },
};
</script>

<style >
.map_m {
    width: 100vw;
    height: 100vh;
}
#map_container {
    width: 100%;
    height: 100%;
    z-index: 0;
}
.head {
    position: fixed;
    top: 4vh;
    left: 0.5vw;
    z-index: 10;
    color: white;
    width: 24vw;
    height: 30vh;
}
.head_top {
    display: flex;
    padding: 0.5vh;
    /* background-image: -webkit-gradient(linear, 0 70%, 0 bottom, from(#80eeff), to(#0a4fc5)); */
    font-weight: bold;
    font-size: 0.8vw;
    background-image: -webkit-gradient(
        linear,
        0 50%,
        0 bottom,
        from(#80eeff),
        to(#0a4fc5)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
#content {
    /* width: 21.4vw; */
    height: 22vh;
    overflow: hidden;
    margin: 0 0 1vh 0;
}
#content ul li {
    background-image: linear-gradient(
        to right,
        rgb(15, 28, 56, 0.7),
        rgb(55, 55, 100, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 0.5vh 0;
    display: flex;
    box-sizing: border-box;
}
#content ul li > img {
    width: 4vw;
    height: 6vh;
}
.accessInfo {
    display: flex;
    /* align-items: center; */
    flex-wrap: wrap;
    flex-direction: column;
    margin-left: 0.5vw;
}
.accessInfo > span {
    margin: auto 0;
}
.border-box-content {
    margin: 0;
}
.head_content {
    background-image: linear-gradient(
        to right,
        rgb(15, 28, 56),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 3vh 2vw 0;
}
.tit {
    position: fixed;
    top: 1vh;
    left: 50%;
    margin-left: -8vw;
}
.titC {
    font-weight: bold;
    font-size: 1vw;
    background-image: -webkit-gradient(
        linear,
        0 50%,
        0 bottom,
        from(#ffb161),
        to(#0a4fc5)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.topTit {
    position: fixed;
    top: 5vh;
    left: 50%;
    margin-left: -13vw;
}
.titL {
    position: fixed;
    top: 1.3vh;
    right: 21vw;
}
.titR {
    position: fixed;
    top: 1.3vh;
    left: 21vw;
}
.traffic {
    position: fixed;
    left: 0.5vw;
    top: 38vh;
    width: 24vw;
    height: 32vh;
}
.traffic_content {
    background-image: linear-gradient(
        to right,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 1vh 2vw 0;
    color: white;
    height: 28vh;
}
#trafficEchart {
    height: 18vh;
}
.in_out {
    display: flex;
    justify-content: space-around;
}
.in_out > div {
    display: flex;
    height: 6vh;
}
.park {
    position: fixed;
    left: 0.5vw;
    bottom: 3vh;
    z-index: 10;
    color: white;
    width: 24vw;
    height: 24vh;
}
.park_content {
    background-image: linear-gradient(
        to right,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 2vh 2vw 0;
    color: white;
    height: 20vh;
}
.distribution {
    display: flex;
    justify-content: space-around;
    height: 80%;
}
.distribution > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    cursor: pointer;
}
.number {
    position: fixed;
    right: 0.5vw;
    top: 5vh;
    z-index: 10;
    color: white;
    width: 24vw;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.person-stream {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 49%;
    justify-content: center;
}
.cars-stream {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 49%;
    justify-content: center;
}
.num {
    position: relative;
    width: 8.1vw;
    /* margin-top: 1.2vh; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.num > ul {
    position: relative;
    list-style: none;
    margin: 0;
    width: 1.45vw;
    height: 3.7vh;
    background: url("../../assets/images/num/num_back_m.png") no-repeat;
    text-align: center;
    background-size: 100% 100%;
    overflow: hidden;
}
.num > ul > li {
    position: absolute;
    top: 0.5vh;
    color: #ffffff;
    width: 1.3vw;
    height: 24vh;
    transition: all linear 0.8s;
}
.num > ul > li > span {
    display: block;
    width: 1.45vw;
    height: 3.7vh;
    text-align: center;
    line-height: 3.7vh;
}
.num > ul > li > span > img {
    width: 1vw;
    height: 2.8vh;
    object-fit: cover;
}
.stream {
    width: 2.5vw;
    font-size: 0.7vw;
    color: #ffffff;
    margin-right: 5%;
    margin-top: 1.1vh;
}
.streamBox {
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.danger {
    position: fixed;
    right: 0.5vw;
    top: 12vh;
    width: 24vw;
    height: 26vh;
}
.danger_content {
    background-image: linear-gradient(
        to left,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 2vh 2vw 0;
    color: white;
    height: 20.5vh;
}
#dangerEchart {
    height: 100%;
}
.patrol {
    position: fixed;
    right: 0.5vw;
    bottom: 32vh;
    width: 24vw;
    height: 28vh;
}
.patrol_content {
    background-image: linear-gradient(
        to left,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 2vh 2vw 0;
    color: white;
    height: 24vh;
}
#patrolEchart {
    height: 100%;
    /* color: #283b56; */
}
.access {
    position: fixed;
    right: 0.5vw;
    bottom: 3vh;
    width: 24vw;
    height: 26vh;
}
.access_content {
    background-image: linear-gradient(
        to left,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 1vh 2vw 0;
    color: white;
    height: 24vh;
    position: relative;
}
#accessEchart {
    height: 100%;
}
.dateBox {
    position: absolute;
    top: 3vh;
    right: 1vw;
    width: 7vw;
    /* height: 3vh; */
    display: flex;
    justify-content: space-around;
}
.dateBox > div {
    padding: 0.2vh 0.5vw;
    color: white;
    transition: all linear 0.4;
    border: 1px solid;
    cursor: pointer;
}
.dateBox > div.active {
    background-image: -webkit-gradient(
        linear,
        0 5%,
        0 bottom,
        from(rgb(255, 207, 160)),
        to(rgb(247, 152, 57))
    );
    color: black;
}
.dateBox > div:hover {
    background-image: -webkit-gradient(
        linear,
        0 5%,
        0 bottom,
        from(rgb(255, 207, 160)),
        to(rgb(247, 152, 57))
    );
    color: black;
}
.inpark {
    position: fixed;
    left: 50%;
    margin-left: -12vw;
    bottom: 8vh;
    width: 24vw;
    height: 12vh;
}
.inpark_content {
    background-image: linear-gradient(
        to top,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
    margin: 2vh 2vw 0;
    color: white;
    height: 8vh;
    display: flex;
    justify-content: space-around;
}
.inpark_content > span {
    margin: auto;
    cursor: pointer;
    color: #36e2fc;
    transition: all linear 0.6;
}
.inpark_content > span:hover {
    background-image: -webkit-gradient(
        linear,
        0 50%,
        0 bottom,
        from(#80eeff),
        to(#0a4fc5)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: white;
}
.addCamera {
    position: fixed;
    bottom: 12vh;
    right: 28vw;
    /* color: white; */
}
.formCamera {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 36vw;
    height: 56vh;
    padding: 1vh 2vw;
    z-index: 170;
    background: gainsboro;
    background-image: linear-gradient(
        to top,
        rgb(15, 28, 56, 0.8),
        rgb(15, 28, 56, 0.4),
        rgb(55, 55, 100, 0.1)
    );
}
.formCamera form {
    display: grid;
    grid-template-columns: repeat(2, 45%);
    justify-content: space-around;
}
.formCamera form label {
    color: white !important;
}
.tableData {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: white;
}
video::-webkit-media-controls-timeline {
    /*display: none;*/
    visibility: hidden !important;
}

video {
    position: relative;
}
.videoContent {
    position: relative;
    /* border: 1px solid; */
}

.progressV {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    height: 10px;
    z-index: 10;
}

.timeLine {
    visibility: hidden;
    opacity: 0;
    transition: all linear 0.4s;
}

.label:hover .timeLine {
    opacity: 1;
    visibility: visible;
}

.errorTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: red;
    z-index: -1;
    height: 2vh;
    text-align: center;
}

.base-data {
    z-index: 20;
}

.timeFloat {
    width: 115px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    right: 0;
    color: black;
    top: -26px;
    font-size: 0.8vh;
    margin-right: -50px;
    background: white;
    border-radius: 3px;
    text-align: center;
    visibility: hidden;
}

.label {
    background: #16223a;
    padding: 0.5vh 0.2vw;
}

.label .close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    z-index: 55;
    color: red;
    font-size: 2vh;
    transition: all linear 0.2s;
}
.label .live {
    position: absolute;
    top: 5px;
    left: 5px;
    cursor: pointer;
    z-index: 55;
    font-size: 0.7vh;
    border: none;
    padding: 0.4vh 0.4vw;
    color: white;
    background: green;
    transition: all linear 0.1s;
    border-radius: 3px;
    outline: none;
}
.label .live:hover {
    /* background: white; */
    /* color: blue; */
    transform: scale(1.1);
}
.label .close:hover {
    /* background: white; */
    /* color: blue; */
    transform: scale(1.1);
}
.backHome {
    position: fixed;
    top: 1vh;
    right: 2vw;
    z-index: 20;
}
</style>