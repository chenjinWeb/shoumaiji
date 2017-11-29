<template>
  <div class="tab-content">
    <y-header title="新增" router="-1" r_title="确定" @sured="sured()"></y-header>
    <div class="content">

      <div class="search_input">
        <label class="form">
          <span>点位组名称：</span>
          <input type="search" @search="deviceSearch($event.target)" name="name" placeholder="请输入点位组名称" class="search" v-model="pointName">
        </label>
      </div>

      <!--<div class="fix-name">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-value">
            <div class="mint-cell-value is-link" @click="choiceArea">
              <input placeholder="请选择省市" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.areaText">
              <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
            </div>
          </div>
          <i class="cell-right icon">&#xe600;</i>
          <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
            <div class="picker-toolbar">
              <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="2" :show-tool-bar="true"></mt-picker>
          </mt-popup>
        </div>
      </div>-->

      <div class="search_input select_area" @click="selectArea()">
        <label class="form">
          <span>区域：</span>
          <input type="search" readonly placeholder="请选择区域" class="search" v-model="areaName">
        </label>

        <div class="downandup">

          <i class="icon" v-html="icon"></i>

        </div>

      </div>

      <div class="area_list" v-if="icon=='&#xe62d;'">

        <ul>

          <li v-for="(a,$index) in areaLists" @click="getArea(a)">{{a.name}}</li>

        </ul>

      </div>
    </div>
  </div>

</template>

<script>

    import Vue from "vue"

    import {mapActions} from "vuex"

    import { Picker,MessageBox,Switch,Toast  } from 'mint-ui';

    Vue.component(Picker.name,Picker);

    Vue.component(Switch.name, Switch);

    export default {
        name: "app",
        data() {
            return {
              icon:'&#xe628;',
              pointName:"",
              popupVisible: false,
              areaPicker:{},
              areaValues:[],
              addressProvince: '',
              addressProvinceId: '',
              addressCity: '',
              addressCityId: '',
              areaList:{
                "areaList": [
                  {
                    "上海": [
                      "上海"
                    ],
                    "北京": [
                      "北京"
                    ],
                    "广东": [
                      "广州",
                      "深圳"
                    ],
                    "江苏": [
                      "徐州",
                      "南京"
                    ],
                    "福建": [
                      "福州"
                    ]
                  }
                ],
                "provinceCodeList": [
                  {
                    "上海": [
                      "120001"
                    ],
                    "北京": [
                      "110001"
                    ],
                    "广东": [
                      "130001"
                    ],
                    "江苏": [
                      "130007"
                    ],
                    "福建": [
                      "0100"
                    ]
                  }
                ],
                "cityCodeList": [
                  {
                    "上海": [
                      "120002"
                    ],
                    "北京": [
                      "110002"
                    ],
                    "广州": [
                      "130002"
                    ],
                    "南京": [
                      "130006"
                    ],
                    "深圳": [
                      "518000"
                    ],
                    "福州": [
                      "0200"
                    ],
                    "徐州": [
                      "130009"
                    ]
                  }
                ]
              },
              data: {
                privinceName: '',
                provinceId: '',
                cityName: '',
                cityId: '',
                address:"",
                areaText: '北京 - 北京'
              },
              slots: [
                {
                  flex: 1,
                  values: Object.keys(address),
                  className: 'slot1',
                  textAlign: 'center'
                }, {
                  divider: true,
                  content: '-',
                  className: 'slot2'
                }, {
                  flex: 1,
                  values: Object.keys(address)[0],
                  className: 'slot3',
                  textAlign: 'center'
                }
              ],
              areaName:"",
              id:this.$route.query.id || 0,
              areaLists:[],
              areaListId:"",
            }
        },
        computed: {

        },
        methods: {
            ...mapActions([
              "getarea_",
              'addpoint_'
            ]),
            sured(){
              if(this.pointName==""){
                MessageBox.alert("请输入点位组名称");
                return
              }

              if(this.areaListId == ""){
                MessageBox.alert("请选择区域");
                return
              }

              let formData = new FormData();

              formData.append('name', this.pointName);
              formData.append('id', this.id);
              formData.append('number_prefix', this.areaListId);

              this.addpoint_(formData).then((res)=>{
                if(res.success==200){
                  MessageBox.alert(res.message).then(action=>{
                    if(action=="confirm"){
                      if(res.message=="修改成功"){
                        this.$router.go(-1)
                      }else{
                        this.$router.push({name:"pointentrance",query:{id:res.data}})
                      }

                    }
                  });
                }else{
                  Toast(res.message)
                }
              })
            },
            deviceSearch(data){
              //console.info(data)
            },
            onValuesChange(picker, values) {
              this.areaPicker = picker;
              address[values[0]]= address[values[0]]? address[values[0]] : ["上海"];
              picker.setSlotValues(1, address[values[0]]);
              this.addressProvince = values[0]? values[0] : "上海";
              this.addressCity = values[1]? values[1] : "上海";
              this.addressProvinceId = provinceCodeList[this.addressProvince] + '';
              this.addressCityId = cityCodeList[this.addressCity] + '';
            },
            //取消
            cancleaddress: function () {
              this.popupVisible = false;
              this.areaPicker.setSlotValue(0, this.data.privinceName);
              this.areaPicker.setSlotValue(1, this.data.cityName);
            },

            //确认
            selectaddress: function () {
              this.popupVisible = false;
              this.data.privinceName = this.addressProvince;
              this.data.cityName = this.addressCity;
              this.data.provinceId = this.addressProvinceId;
              this.data.cityId = this.addressCityId;
              this.data.areaText = this.data.privinceName +' - ' + this.data.cityName;
              console.info(this.data.provinceId);
              console.info(this.data.cityId);
            },

            //点击显示地区联动
            choiceArea: function () {
              this.popupVisible = true
              // 设置默认选中
              if (this.data.privinceName !== '' && this.data.cityName !== '') {
                this.areaPicker.setSlotValue(0, this.data.privinceName)
                this.areaPicker.setSlotValue(1, this.data.cityName)
                //console.log(this.data.privinceName + '-' + this.data.cityName)
              }
            },

            getArea(n){
              this.areaName=n.name;
              this.areaListId=n.id;
              this.icon="&#xe628;"
            },
            selectArea(){
              this.icon= this.icon=="&#xe628;"? "&#xe62d;" : "&#xe628;"
            }
        },
        mounted() {
          this.getarea_({id:this.id}).then((res)=>{
            if(res.success==200){
              this.pointName = res.data? res.data.name : "";
              this.areaListId = res.data? res.data.numberPrefix : "";
              this.areaLists = res.extrasInfo.area_list;
              if(this.areaListId!=""){
                for(var i=0;i<this.areaLists.length;i++){
                  if(this.areaLists[i].id == this.areaListId){
                    this.areaName = this.areaLists[i].name
                  }
                }
              }
            }else{
              Toast(res.message)
            }
          })

          setTimeout(()=>{
            address = this.areaList.areaList[0];
            provinceCodeList = this.areaList.provinceCodeList[0];
            cityCodeList = this.areaList.cityCodeList[0];
            this.slots[0].values = Object.keys(address);
            this.slots[2].values = Object.values(address)[0];
          },500)
        }
    }

    let address = {};

    let provinceCodeList = {};

    let cityCodeList = {};

</script>

<style scoped>
  .mint-tab-container-item{ background: #f1f1f1;}
  div.mint-cell-wrapper{ height: 100%; background-size: 120% 0px; position: relative;}
  .mint-cell{ background: #f5f5f5; height: 0.7rem;}
  div.cart-item-img img{ vertical-align: top;}
  div.cart-item-info{ padding: 0; height: 100%;}
  .mint-cell{ height: 0.6rem;}
  .mint-cell-value{ width: 100%;}
  .mint-cell-wrapper{padding: 0; flex: 1;}
  .cell-right{ position: absolute; line-height: 0.2rem; font-size: 0.2rem;  height: 0.2rem; width: 0.2rem; top: 0.125rem; right: 0;}
  .picker{width: 100%; position: absolute; bottom: -0.4rem; z-index: 100; background: #fff;}
  .mint-popup-bottom{ width: 100%; height: 1.5rem;}
  .picker{ bottom: 0rem;}
  div.picker-item{ top: -18px;}
</style>
