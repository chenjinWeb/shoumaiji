<template>

  <div class="content-modal">
    <y-header title="基本信息" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
              <li>
                <div class="central_list clear">
                  <div class="list_lef fl"><span style="color: red;">*</span>详细地址</div>
                  <div class="list_rig fr">
                    <input type="text" placeholder="请填写地址" class="txt" v-model="detailAddress">
                  </div>
                </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">点位类型</div>
                      <div class="list_rig fr">
                          <input type="text" placeholder="如学校/景区/园区/医院等" class="txt" v-model="locationType">
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list explain_list clear">
                      <div class="list_lef fl">详情说明<p>（选填）</p></div>
                      <div class="list_rig fr">
                          <textarea name="" id="" rows="2" placeholder="如酒店星级、小学/中学/大学、园区星级/类型具体信息等。" v-model="remark"></textarea>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">经纬度</div>
                      <div class="list_rig rig_du fr">
                          <a href="javascript:;" class="btn" @click="gopage()">选择经纬度</a>
                      </div>
                      <div style="position: absolute; height: 0.4rem; line-height: 0.2rem; text-align: left; font-size: 0.14rem; left: 55%; top: 0.1rem;">
                        <p>经度：{{latitude}}</p>
                        <p>维度：{{longitude}}</p>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">环境封闭</div>
                      <div class="list_rig fr flex rig_du">
                          <label>
                              <span class="mint-radio">
                              <input type="radio" class="mint-radio-input" value="1" v-model="environmentState">
                              <span class="mint-radio-core"></span>
                              <span class="mint-radio-label">是</span>
                              </span>

                          </label>
                          <label>
                              <span class="mint-radio">
                              <input type="radio" class="mint-radio-input" value="2" v-model="environmentState">
                              <span class="mint-radio-core"></span>
                              <span class="mint-radio-label">否</span>
                              </span>

                          </label>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">重要出入口</div>
                      <div class="list_rig fr flex rig_du">
                          <label>
                              <span class="mint-radio">
                              <input type="radio" class="mint-radio-input" value="1" v-model="entranceState">
                              <span class="mint-radio-core"></span>
                              <span class="mint-radio-label">是</span>
                              </span>

                          </label>
                          <label>
                              <span class="mint-radio">
                              <input type="radio" class="mint-radio-input" value="2" v-model="entranceState">
                              <span class="mint-radio-core"></span>
                              <span class="mint-radio-label">否</span>
                              </span>

                          </label>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">装水时间</div>
                      <div class="list_rig fr" @click="open('picker1')">
                          <input type="text" placeholder="请填写时间" readonly="readonly" class="txt" v-model="putWaterTime.split(' ')[0]">
                      </div>
                      <mt-datetime-picker
                        ref="picker1"
                        v-model="pickerVisible"
                        type="date"
                        @confirm="putConfirm">
                      </mt-datetime-picker>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">开售时间</div>
                      <div class="list_rig fr" @click="open('picker2')">
                          <input type="text" placeholder="请填写时间" readonly="readonly" class="txt" v-model="sellTime.split(' ')[0]">
                      </div>
                      <mt-datetime-picker
                        ref="picker2"
                        v-model="sellVisible"
                        type="date"
                        @confirm="sellConfirm">
                      </mt-datetime-picker>
                  </div>
              </li>
              <li>
                  <div class="central_list upload_list clear">
                      <div class="list_lef fl">点位图片</div>
                      <div class="list_rig fr upload flex">
                          <button @click="photoVisible=true" class="btn">点击上传</button><span>每张不超过500K</span>
                      </div>
                  </div>
                  <div class="upload_img clear">
                      <div class="images" v-for="(s,$index) in imgArr">
                          <img :src="s">
                          <p class="close" @click="deleteImg($index)"></p>
                      </div>

                      <div class="images" v-if="imgArr.length==0">
                        <img src="../../assets/img/shangct.png">
                      </div>

                  </div>
              </li>
          </ul>
        </div>

        <form ref="fromRef" hide>
          <input @change="photoCapture" ref="capture" type="file" accept="image/*" capture="camera"/>
          <input @change="photoAlbum" ref="album" type="file" accept="image/*"/>
        </form>

        <mt-actionsheet :actions="actions2" v-model="photoVisible"></mt-actionsheet>
        <mt-actionsheet :actions="actions" v-model="phoneBinVisible"></mt-actionsheet>

    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>


  </div>

</template>

<script>

  import Vue from "vue"

  import { InfiniteScroll,Toast,Indicator,Radio,MessageBox  } from 'mint-ui';

  Vue.component(Radio.name, Radio);

  import {mapState,mapMutations} from "vuex"

  import compressImg from "../../compress-img";

  Vue.use(InfiniteScroll)

  export default {
    name:"basicinformat",
    data(){
      return {
        pickerVisible:Date.format(new Date,"yyyy-MM-dd"),
        sellVisible:Date.format(new Date,"yyyy-MM-dd"),
        locationType:"",
        remark:"",
        detailAddress:"",
        gpsLng:"",
        gpsLat:"",
        environmentState:"1",
        entranceState:"1",
        putWaterTime:"",
        sellTime:"",
        phoneBinVisible: false,
        photoVisible: false,
        imgArr:[]
      }
    },
    mounted(){
      this.locationType = this.basicData.locationType? this.basicData.locationType : "";
      this.remark = this.basicData.remark? this.basicData.remark : "";
      this.detailAddress = this.basicData.detailAddress? this.basicData.detailAddress : "";
      this.gpsLng = this.basicData.gpsLng? this.basicData.gpsLng : "";
      this.gpsLat = this.basicData.gpsLat? this.basicData.gpsLat : "";
      this.environmentState = this.basicData.environmentState? this.basicData.environmentState : "1";
      this.entranceState = this.basicData.entranceState? this.basicData.entranceState : "1";
      this.putWaterTime = this.basicData.putWaterTime? this.basicData.putWaterTime : "";
      this.sellTime = this.basicData.sellTime? this.basicData.sellTime : "";
      this.imgArr = this.basicData.url? this.basicData.url.split(",") : [];
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData,
        latitude:state=>state.latitude,
        longitude:state=>state.longitude
      }),
      actions2() {
        let that = this;
        return [
          {
            name: '拍照',
            method: function () {
              that.$refs.capture.click();
            }
          },
          {
            name: '从相册上传',
            method: function () {
              that.$refs.album.click();
            }
          }
        ]
      },
    },
    watch:{

    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      gopage(){
        this.$router.push({name:"latitude"})
      },
      open(id){
        this.$refs[id].open();
      },
      putConfirm(data){
        this.putWaterTime = Date.format(data, "yyyy-MM-dd");
      },
      sellConfirm(data){
        this.sellTime = Date.format(data, "yyyy-MM-dd");
      },
      sured(){
        if(this.detailAddress==""){
          Toast("详细地址必须输入");
          return
        }
        let basicData={
          locationType:this.locationType,
          remark:this.remark,
          detailAddress:this.detailAddress,
          gpsLng:this.gpsLng,
          gpsLat:this.gpsLat,
          environmentState:this.environmentState,
          entranceState:this.entranceState,
          putWaterTime:this.putWaterTime,
          sellTime:this.sellTime,
          url:this.imgArr.join(",")
        }
        this.getPointData(basicData);
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      },
      photoCapture() {
        let capture = this.$refs.capture
        let file = capture.files[0];
        this.uploadPhoto(file);
      },
      photoAlbum() {
        let album = this.$refs.album;
        let file = album.files[0];
        this.uploadPhoto(file);
      },
      deleteImg(index){
        this.imgArr.splice(index,1)
      },
      uploadPhoto(file){

        //let img = this.$refs.img;

        let fromRef = this.$refs.fromRef;
        fromRef.reset();

        let formData = new FormData();
        Indicator.open({text: '', spinnerType: 'fading-circle'});
        compressImg(file,{quality:0.8}).then(
          (result) => {
            //img.src = URL.createObjectURL(result);
            this.imgArr.push(URL.createObjectURL(result));
            formData.append('file', result, file.name);
            Indicator.close();
            console.info(this.imgArr)
          }
        )
      }
    }
  }

</script>

<style>
  .picker-slot-wrapper .picker-item{ top: 1px;}
    .mint-radio-input:checked + .mint-radio-core {
        background-color: #fcfcfc;
        border-color: #cfcfcf;
    }
    .mint-radio-input:checked + .mint-radio-core::after {
        background-color: #2d72ff;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    .mint-radio-label{
    margin-right:0.4rem;
    }
    .mint-radio-core {
        width:0.18rem;
        height:0.18rem;
    }
    .mint-radio-core::after {
        top:0.035rem;
        left:0.035rem;
        position: absolute;
        width:0.09rem;
        height:0.09rem;
        border-radius: 100%;
    }
    .mint-radio-input:checked + .mint-radio-core + .mint-radio-label{
    color:#333333;
    }

</style>
