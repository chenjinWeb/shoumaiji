<template>
<div>
  <div class="search_input search_latitud" style="margin-top: 0.45rem;">
    <label class="form">
      <input type="search" placeholder="请输入要搜索的地址" class="search" v-model="name">
    </label>
    <div class="search_btn" @click="search(name)">搜索</div>
  </div>

  <div id="allmap" v-bind:style="mapStyle"></div>
</div>
</template>
<script>



  export default{
    name:"b-map-component",
    data:function(){
      return{
        mapStyle:{
          width:'100%',
          height:this.mapHeight +'px',
          name:""
        }
      }
    },
    props:{
// 地图在该视图上的高度
      mapHeight:{
        type:Number,
        default:500
      },
      // 经度
      longitude:{
        type:Number,
        default:121.409064
      },
      // 纬度
      latitude:{
        type:Number,
        default:31.174439
      },
      description:{
        type:String,
        default:''
      }
    },
    mounted () {
      this.ready()
    },
    methods:{
      search(keyword){
        this.description = keyword;
        var map =new BMap.Map("allmap");
        var localSearch = new BMap.LocalSearch(map);
        map.clearOverlays();
        const _this = this;
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0);
          _this.$emit('searched',{lng:poi.point.lng,lat:poi.point.lat});
          //document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
          map.centerAndZoom(poi.point, 13);
          var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
          _this.longitude = poi.point.lng;
          _this.latitude = poi.point.lat;
          map.addOverlay(marker);
          //var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
          //var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
          marker.addEventListener("click", function () {
            console.info(1)
            //this.openInfoWindow(infoWindow);
          });
          // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        });
        localSearch.search(keyword);
      },
      ready:function(){
        var map =new BMap.Map("allmap");
        var point =new BMap.Point(this.longitude,this.latitude);
        var marker =new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point,15);
        // 信息窗的配置信息
        var opts ={
          width :250,
          height:75,
        }
        /*var infoWindow =new BMap.InfoWindow(this.description, opts);// 创建信息窗口对象
        marker.addEventListener("click",function(){

          map.openInfoWindow(infoWindow,point);
        });
        map.enableScrollWheelZoom(true);
        map.openInfoWindow(infoWindow,point);//开启信息窗口*/
      }
    }
  }
</script>
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
