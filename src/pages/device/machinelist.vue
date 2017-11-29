<template>

  <div class="content-modal">
    <y-header title="机器列表" router="-1"></y-header>
    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          未出库
          <div class="triangle_first" v-show="menuNum==1"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          已出库
          <div class="triangle_first" v-show="menuNum==2"></div>
        </li>
      </ul>
      <div class="scroll-content"  style="margin-top:0.9rem;" ref="deviceScroll">

        <div class="outtinvent" v-if="menuNum==1">
          <div class="search_input search_latitud">
            <label class="form">
              <input type="search" placeholder="请输入出厂厂家" class="search" v-model="number">
            </label>
            <div class="search_btn" @click="getData(1)">搜索</div>
          </div>
          <ul class="inventory_list">
            <template v-for="l in deviceList">
              <li class="asset_li" style="border-top: none;" @click="goPage(l.vendor_id)">
                  <p style="font-weight: bold;">{{l.name}}</p>
                  <p style="position: relative;">机器总数：{{l.vm_count | thoundnum}}台<span class="posi_span">剩余：{{l.vm_surplus_count}}台</span></p>
                  <p>存放地址：{{l.detail_address}}</p>
                  <i class="icon asset_r">&#xe600;</i>
              </li>
            </template>
          </ul>
          <div class="noData" v-if="menuNum==1 && deviceList.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

        </div>

        <div class="outtinvent" v-if="menuNum==2">
          <div class="search_input search_latitud">
            <label class="form">
              <input type="search" placeholder="请输入设备组名称" class="search" v-model="search">
            </label>
            <div class="search_btn" @click="deviceGroup(1)">搜索</div>
          </div>
          <ul class="inventory_list">
            <li v-for="i in deviceGroupList" @click="groupFrom(i.vm_group_id,i.gname)">
              <a class="central_list flex">
                <div class="list_lef long_left">
                  <p><span>{{i.gname}}（{{i.vm_count || 0}}台）</span></p>
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

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>

  </div>

</template>

<script>

  import {mapState,mapActions} from 'vuex'
  export default {
    name:"machinelist",
    data(){
      return {
        number:"",
        groupId:"",
        online:"",
        search:"",
        menuNum:1,
        deviceList:[],
        deviceGroupList:[],
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
        'assetvmlist_',
        "offMonitorInfo_"
      ]),
      goPage(id){
        this.$router.push({name:"assetdetail",query:{id:id}})
      },
      groupFrom(id,name){
        this.$router.push({name:"storedasset",query:{id:id,name:name}})
      },
      getData(type){
        if(type==1){
          this.deviceList=[];
        }
        this.assetvmlist_({type:1,search:this.number}).then( res => {
          if(res.success == 200){
            this.deviceList = res.data;
          }
        } )
      },
      deviceGroup(type){
        if(type==1){
          this.deviceGroupList=[];
        }
        this.assetvmlist_({type:2,search:this.search}).then(res => {
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
