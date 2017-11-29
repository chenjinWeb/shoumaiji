<template>

  <div class="content-modal">

    <y-header title="选择经纬度" r_title="确认定位" @sured="sured()" router="-1"></y-header>


    <b-map-component :mapHeight="mapHeight" :longitude="devicelo" :latitude="devicela" @searched="getl"></b-map-component>

  </div>

</template>

<script>

  import {mapState,mapMutations} from "vuex"

  import {MessageBox} from 'mint-ui'

  export default {
    name:"devicelong",
    data(){
      return {
        mapHeight:"400",
        name:"",
        long:"",
        lati:""
      }
    },
    computed:{
      longitude:state=>state.longitude,
      latitude:state=>state.latitude
    },
    mounted(){
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((res)=>{
        this.long = res.longitude;
        this.lati = res.latitude;
        this.getDevicePoint({
          longitude:res.longitude,
          latitude:res.latitude
        })
      })
    },
    methods:{
      ...mapMutations([
        "getDevicePoint"
      ]),
      getl(data){
        this.long = data.lng;
        this.lati = data.lat;
      },
      sured(){
        this.getDevicePoint(
          {
            longitude:this.long? this.long : this.longitude,
            latitude:this.lati? this.lati : this.latitude
          }
        )
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      }
    }
  }

</script>

<style scoped>


</style>
