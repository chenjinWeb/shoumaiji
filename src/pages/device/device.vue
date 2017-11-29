<template>

  <div class="tab-content">
    <y-header title="设备管理" isgo="true"  :r_title="show_asset_button? '资产管理' : ''" @sured="goPage()"></y-header>
    <div class="content">
        <ul class="tab_label flex" margin-header>
            <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
              按设备
              <div class="triangle_first" v-show="menuNum==1"></div>
            </li>
            <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
              按设备组
              <div class="triangle_first" v-show="menuNum==2"></div>
            </li>
        </ul>
        <div class="scroll-content"  style="margin-top:0.9rem;" ref="deviceScroll">

            <div class="outtinvent" v-if="menuNum==1">
                <div class="search_input search_latitud">
                    <label class="form">
                        <input type="search" placeholder="请输入设备编号" class="search" v-model="number">
                    </label>
                    <div class="search_btn" @click="getData(1)">搜索</div>
                </div>
                <ul class="inventory_list">
                    <template v-for="l in deviceList">
                        <li>
                            <router-link :to="{name:'devicedetails',query:{vmId:l.id,title:l.number}}" class="central_list flex">
                                <div class="list_lef list_left">
                                    <p><span>{{l.another}}</span></p>
                                    <p class="time">编号：{{l.number}}</p>
                                </div>
                                <div class="list_rig list_right clear">
                                    <p class="fl line_state">
                                        <span class="empty_path" @click.prevent="getinfo(l.id)"><em>{{l.offaisle}}</em>空道</span>
                                        <span v-if="l.is_on_line == 0">离线</span>
                                        <span v-else>在线</span>
                                    </p>
                                    <i class="icon fr">&#xe600;</i>
                                </div>
                            </router-link>
                        </li>
                    </template>
                </ul>
                <div class="noData" v-if="menuNum==1 && deviceList.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>

            </div>

            <mt-popup
              v-model="popupVisible"
              popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem; ">
              <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
                <div style="font-size: 0.16rem;">空道详情</div>
                <div class="close_btn bulecolr" @click="popupVisible=false">关闭</div>
                <ul style="margin-top: 0.2rem; max-height: 2.5rem; overflow-y: scroll;">
                  <li v-for="(a,$index) in offmonitorInfoList" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}(货道号：{{a.aisle}})</li>
                </ul>
              </div>
            </mt-popup>

            <div class="outtinvent" v-if="menuNum==2">
                <div class="search_input search_latitud">
                    <label class="form">
                        <input type="search" placeholder="请输入设备组名称" class="search" v-model="search">
                    </label>
                    <div class="search_btn" @click="deviceGroup(1)">搜索</div>
                </div>
                <ul class="inventory_list">
                    <li v-for="i in deviceGroupList"  @click="groupFrom(i.vending_machine_group_id)">
                        <a class="central_list flex">
                            <div class="list_lef long_left">
                                <p><span>{{i.name}}（{{i.count || 0}}台）</span></p>
                            </div>
                            <div class="list_rig">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="noData" v-if="menuNum==2 && deviceGroupList.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>
            </div>

        </div>
    </div>
  </div>

</template>

<script>

import {mapState,mapActions} from 'vuex'
  export default {
    name:"device",
    data(){
      return {
        popupVisible:false,
        offmonitorInfoList:[],
        number:"",
        groupId:"",
        online:"",
        search:"",
        menuNum:1,
        deviceList:[],
        deviceGroupList:[],
        show_asset_button:false
        // groupInfoList:[]
      }
    },
    watch:{
        menuNum:function (oldNum,newNum){
            if(oldNum==1 && this.deviceList.length>0){
                return
            }
            if(oldNum==2 && this.deviceGroupList.length>0){
                return
            }

            if(oldNum==1 && this.deviceList.length==0){
                this.getData();
            }
            if(oldNum==2 && this.deviceGroupList.length==0){
                this.deviceGroup();
            }

        }
    },
    computed:{
      ...mapState({
        ScrollBar: state => state.ScrollBar,
      })
    },
    mounted(){
        this.getData();
        this.$refs.deviceScroll && this.ScrollBar.init('index-scroll', this.$refs.deviceScroll);
    },
    activated(){

    },
    methods: {
        ...mapActions([
            'deviceindex_',
            'deviceGroups_',
            "offMonitorInfo_"
        ]),
        goPage(){
          this.$router.push({name:"asset"})
        },
        getinfo(id){
          this.popupVisible=true;
          //请求接口
          this.offMonitorInfo_({vmId:id}).then(res =>{
            if(res.success==200){
              this.offmonitorInfoList = res.data;
            }
          })
        },
        groupFrom(id){
            this.deviceList=[];
            this.groupId=id;
            this.menuNum = 1;
        },
        getData(type){
            if(type==1){
              this.deviceList=[];
            }
            this.deviceindex_({number:this.number,online:this.online,groupId:this.groupId}).then( res => {
                if(res.success == 200){
                    this.deviceList = res.data;
                    this.show_asset_button = res.extrasInfo.show_asset_button;
                }
            } )
        },
        deviceGroup(type){
            if(type==1){
              this.deviceGroupList=[];
            }
            this.deviceGroups_({search:this.search}).then(res => {
                if (res.success == 200) {
                    this.deviceGroupList.push(...res.data);
                }
            })
        }
    }
  }

</script>

<style scoped>


</style>
