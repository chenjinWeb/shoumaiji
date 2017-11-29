<template>

  <div class="content-modal">
    <y-header :title="title" router="-1"></y-header>
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
      <div class="scroll-content"  style="margin-top:0.9rem;">

        <div class="outtinvent" v-if="menuNum==1">
          <div class="search_input search_latitud">
            <label class="form">
              <input type="search" placeholder="请输入设备编号或别名" class="search" v-model="query.number">
            </label>
            <div class="search_btn" @click="searchData()">搜索</div>
          </div>
          <!--<mt-loadmore ref="loadmore1" :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom">-->
          <ul class="inventory_list">
              <template v-for="l in deviceList">
                <li @click="childpage(l.id,1)">
                  <a class="central_list flex">
                    <div class="list_lef list_left storescont">
                      <p><span>{{l.another}}</span></p>
                      <p class="time">编号：{{l.number}}</p>
                    </div>
                    <div class="list_rig list_right clear">
                      <p class="fl line_state">
                        <span class="empty_path" @click.stop="check(l.id,l.offaisle)">
                          <em>{{l.offaisle}}</em>
                          空道
                        </span>
                        <span v-if="l.is_on_line == 1">在线</span>
                        <span v-else>离线</span>
                      </p>
                      <i class="icon fr">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </template>
            </ul>
          <!--</mt-loadmore>-->

          <div class="noData" v-if="deviceList.length==0 && menuNum==1">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

          <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem; ">
              <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
                <div style="font-size: 0.16rem;">空道详情</div>
                <div class="close_btn bulecolr" @click="popupVisible=false">关闭</div>
                <ul style="margin-top: 0.2rem; max-height: 2.5rem; overflow-y: scroll;">
                  <li v-for="(a,$index) in arr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}(货道号：{{a.aisle}})</li>
                </ul>
              </div>
          </mt-popup>
        </div>

        <div class="outtinvent" v-if="menuNum==2">
          <div class="search_input search_latitud">
            <label class="form">
              <input type="search" placeholder="请输入设备组名称" class="search" v-model="query.search">
            </label>
            <div class="search_btn" @click="searchdevice()">搜索</div>
          </div>
          <!--<mt-loadmore ref="loadmore2" :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom">-->
            <ul class="inventory_list">
              <li v-for="i in deviceGroupList" @click="childpage(i.vending_machine_group_id,2)">
                <a class="central_list flex">
                  <div class="list_lef long_left">
                    <p><span>{{i.name}}（{{i.count || 0}}台）</span></p>
                  </div>
                  <div class="list_rig list_right">
                    <i class="icon">&#xe600;</i>
                  </div>
                </a>
              </li>
            </ul>
          <!--</mt-loadmore>-->
          <div class="noData" v-if="deviceGroupList.length==0 && menuNum==2">
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

  import Vue from "vue"

  import { Popup,MessageBox  } from 'mint-ui';

  Vue.component(Popup.name, Popup);

  import {mapActions} from 'vuex'
  export default {
    name: "devicetotal",
    data() {
      return {
        title: this.$route.query.type==1? '所有设备':'在线设备',
        popupVisible: false,
        arr: [],
        query: {
          number: '',
          pagesize: 20,
          online: this.$route.query.type==1? "":1,
          search: ''
        },
        depage: 1,
        despage: 1,
        menuNum: 1,
        deviceList: [],
        deviceGroupList: [],
        loadmore: {
          bottomPullText: '上拉加载更多...',
          allLoaded: false,
        },
      }
    },
    watch: {
      menuNum: function (oldNum, newNum) {
        if (oldNum == 1 && this.deviceList.length > 0) {
          return
        }
        if (oldNum == 2 && this.deviceGroupList.length > 0) {
          return
        }

        if (oldNum == 1 && this.deviceList.length == 0) {
          this.getData(this.query);
        }
        if (oldNum == 2 && this.deviceGroupList.length == 0) {
          this.deviceGroup(this.query);
        }

      }
    },
    mounted() {
      this.getData(this.query);
      //this.deviceGroup();
    },
    methods: {
      ...mapActions([
        'deviceindex_',
        'deviceGroups_',
        "offMonitorInfo_"
      ]),
      childpage(id, type) {
        this.$router.push({name: "xiaodetail", query: {id: id, type: type}})
      },
      goPage(name) {
        this.$router.push({name: name})
      },
      check(id, num) {
        if (num > 0) {
          this.popupVisible = true;
          this.arr = [];
          this.offMonitorInfo_({vmId: id}).then((res) => {
            if (res.success == 200 && res.data.length > 0) {
              this.arr = res.data;
            }
          })
        } else {
          MessageBox.alert("暂时没有空道数据!")
        }
      },
      loadTop() {
        let loadmore = this.$refs[`loadmore${this.menuNum}`];
        this.query.page = 1;
        this.loadmore.bottomPullText = "上拉加载更多...";
        this.loadmore.allLoaded = false;
        switch (this.menuNum) {
          case 1:
            this.deviceList.length = 0;
            Reflect.deleteProperty(this.query, 'id');
            Reflect.deleteProperty(this.query, 'type');
            this.getData(this.query).then(() => {
              loadmore.onTopLoaded();
            });
            break;
          case 2:
            this.deviceGroupList.length = 0;
            this.deviceGroup(this.query).then(() => {
              loadmore.onTopLoaded();
            });
            break;
        }
      },
      loadBottom() {
        let loadmore = this.$refs[`loadmore${this.menuNum}`];
        if (this.loadmore.allLoaded) {
          loadmore.onBottomLoaded();
          return;
        }
        switch (this.menuNum) {
          case 1:
            ++this.depage;
            this.getData(this.query).then(() => {
              loadmore.onBottomLoaded();
            }, (e) => {
              this.loadmore.allLoaded = true;
              this.loadmore.bottomPullText = "没有更多的数据！";
              loadmore.onBottomLoaded();
            });
            break;
          case 2:
            ++this.despage;
            this.deviceGroup(this.query).then(() => {
              loadmore.onBottomLoaded();
            }, () => {
              this.loadmore.allLoaded = true;
              this.loadmore.bottomPullText = "没有更多的数据！";
              loadmore.onBottomLoaded();
            });
            break;
        }
      },
      searchData(){
        this.deviceList=[];
        this.getData(this.query)
      },
      getData(query) {
        return new Promise((resolved, rejected) => {
          const querys = {
            number: query.number,
            online: query.online
          }
          this.deviceindex_(querys).then(res => {
            if (res.success == 200 && res.data && res.data.length > 0) {
              this.deviceList.push(...res.data);
              resolved();
            } else {
              rejected('not data');
            }
          }, (e) => {
            rejected(e)
          })
        })

      },
      searchdevice(){
        this.deviceGroupList=[];
        this.deviceGroup(this.query)
      },
      deviceGroup(query) {
        return new Promise((resolved, rejected) => {
          const querys = {
            search: query.search,
            online: query.online,
            page: this.despage,
            pagesize: query.pagesize
          }
          this.deviceGroups_(querys).then(res => {
            if (res.success == 200 && res.data && res.data.length > 0) {
              this.deviceGroupList.push(...res.data)
              resolved();
            } else {
              rejected('not data');
            }
          }, (e) => {
            rejected(e)
          })
        })
      },

    }
  }

</script>

<style scoped>


</style>
