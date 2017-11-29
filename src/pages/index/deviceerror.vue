<template>

  <div class="content-modal">
    <y-header title="故障设备" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content"  style="margin-top:0.45rem;">
        <div class="outtinvent">
          <div class="outsrock_top">
            <div class="outsrock clear error_a">
              <a href="javascript:;" :class="{ 'active': activeNum == 1}" @click="activeNum=1">全部({{allarr.length}})</a>
              <a href="javascript:;" :class="{ 'active': activeNum == 2}" @click="activeNum=2">离线({{offarr.length}})</a>
              <a href="javascript:;" :class="{ 'active': activeNum == 3}" @click="activeNum=3">缺币({{quearr.length}})</a>
              <a href="javascript:;" :class="{ 'active': activeNum == 4}" @click="activeNum=4">其他({{otherarr.length}})</a>
            </div>
          </div>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 1">
            <li v-for="(m,$index) in allarr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 40%;">
                  <p><span>{{m.another}}</span></p>
                  <p class="time">设备编号：{{m.number}}</p>
                </div>
                <div class="list_lef" style="width: 40%; left: 43%;">
                  <p class="time">{{typeFn(m.type)}}</p>
                  <p class="time">{{m.time | dates}}</p>
                </div>
                <div class="list_rig err_rig" style="width: 17%;" @click="issure(m.state)"  v-if="m.state!=1">
                  <p class="fr line_state">
                    <span class="empty_path">
                      <i v-if="m.state==1" class="bulecolr">恢复</i>
                      <i v-if="m.state!=1">已恢复</i>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 2">
            <li v-for="(m,$index) in offarr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 40%;">
                  <p><span>{{m.another}}</span></p>
                  <p class="time">设备编号：{{m.number}}</p>
                </div>
                <div class="list_lef" style="width: 40%; left: 43%;">
                  <p class="time">{{typeFn(m.type)}}(持续：{{m.count}}天)</p>
                  <p class="time">{{m.time | dates}}</p>
                </div>
                <div class="list_rig err_rig" style="width: 17%;" @click="issure(m.state)"  v-if="m.state!=1">
                  <p class="fr line_state">
                    <span class="empty_path">
                      <i v-if="m.state==1" class="bulecolr">恢复</i>
                      <i v-if="m.state!=1">已恢复</i>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 3">
            <li v-for="(m,$index) in quearr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 40%;">
                  <p><span>{{m.another}}</span></p>
                  <p class="time">设备编号：{{m.number}}</p>
                </div>
                <div class="list_lef" style="width: 40%; left: 43%;">
                  <p class="time">{{typeFn(m.type)}}</p>
                  <p class="time">{{m.time | dates}}</p>
                </div>
                <!--<div class="list_rig err_rig" style="width: 17%;" @click="issure(m.state)">
                  <p class="fr line_state">
                    <span class="empty_path">
                      <i v-if="m.state==1" class="bulecolr">恢复</i>
                      <i v-if="m.state!=1">已恢复</i>
                    </span>
                  </p>
                </div>-->
              </a>
            </li>
          </ul>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 4">
            <li v-for="(m,$index) in otherarr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 40%;">
                  <p><span>{{m.another}}</span></p>
                  <p class="time">设备编号：{{m.number}}</p>
                </div>
                <div class="list_lef" style="width: 40%; left: 43%;">
                  <p class="time">{{typeFn(m.type)}}</p>
                  <p class="time">{{m.time | dates}}</p>
                </div>
                <div class="list_rig err_rig" style="width: 17%;" @click="issure(m.state)">
                  <p class="fr line_state">
                    <span class="empty_path">
                      <i v-if="m.state==1" class="bulecolr">恢复</i>
                      <i v-if="m.state!=1">已恢复</i>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==1 && allarr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==2 && offarr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==3 && quearr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==4 && otherarr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  import {MessageBox} from "mint-ui"

  export default {
    name:"deviceerror",
    data(){
      return {
        activeNum:1,
        allarr:[],
        offarr:[],
        quearr:[],
        otherarr:[]
      }
    },
    watch:{
      activeNum:function (value){
        if(value == 1 && this.allarr.length>0){
          return
        }
        if(value == 2 && this.offarr.length>0){
          return
        }
        if(value == 3 && this.quearr.length>0){
          return
        }
        if(value == 4 && this.otherarr.length>0){
          return
        }

        if(value == 1 && this.allarr.length==0){
          this.deviceerr('allarr',1);
        }

        if(value == 2 && this.offarr.length==0){
          this.deviceerr('offarr',2);
        }

        if(value == 3 && this.quearr.length==0){
          this.deviceerr('quearr',3);
        }
        if(value == 4 && this.otherarr.length==0){
          this.deviceerr('otherarr',4);
        }
      }
    },
    mounted(){
      this.deviceerr('allarr',1);
      this.deviceerr('offarr',2);
      this.deviceerr('quearr',3);
      this.deviceerr('otherarr',4);
    },
    methods:{
      ...mapActions([
        "deviceerror_"
      ]),
      deviceerr(name,type){
        this.deviceerror_({type:type}).then((res)=>{
          if(res.success==200){
            this[name] = res.data || [];
          }
        })
      },
      issure(type){
        if(type==1){
          MessageBox.confirm("您确定要恢复该设备吗？").then(action => {
            //console.info(action)

          },action=>{

          })
        }
      },
      typeFn(type){
        switch (type.toString()){
          case "1":
            return "系统故障"
          break;
          case "2":
            return "纸币器故障"
            break;
          case "3":
            return "硬币器故障"
            break;
          case "4":
            return "通讯故障"
            break;
          case "5":
            return "网络异常"
            break;
          case "6":
            return "空道"
            break;
        }
      }
    }
  }

</script>

<style scoped>


</style>
