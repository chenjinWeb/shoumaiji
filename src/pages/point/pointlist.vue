<template>

  <div class="content-modal">
    <y-header title="点位管理" isshow="true" @goback="goback()"></y-header>

    <div class="scroll-content" style="margin-top: 0.454rem; overflow-y: scroll;">

      <div class="point_title" v-if="isapply">
        <p class="top">
          <span>待申请</span>
        </p>
        <ul class="place">
          <li class="place_list" v-for="(d,$index) in pointData" v-if="(d.isBuild && d.checkStateId==1) || d.checkStateId==3">
            <h2>
              <label>
                <input type="checkbox" :checked="d.checked" @click="d.checked=!d.checked" />
                {{d.detailAddress}}
              </label>
              <em>
                <span class="bulecolr" v-if="d.reason && d.checkStateId==3" @click="showreason(d.reason)">查看原因</span>&nbsp;&nbsp;{{(d.isBuild && d.checkStateId==1)? '新建' : (!d.isBuild && d.checkStateId==1)? '审核中' : d.checkStateId==2? '审核通过' : '审核失败'}}</em>
            </h2>
            <p>
              <span class="left">
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.preview_able" @click="previewdata(extrasInfo.preview_able,d.id)">预览</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.add_edit_able" @click="editdata(extrasInfo.add_edit_able,d.id)">编辑</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.delete_able" @click="deletedata(extrasInfo.delete_able,d.id,$index)">删除</a>
              </span>
              <span class="right">台</span>
              <span class="right">
                <input type="text" class="input_count" :disabled="!extrasInfo.input_vm_count_able || (!d.isBuild && d.checkStateId==1)" v-model="d.vmCount"/>
              </span>
            </p>
          </li>
        </ul>
        <div style="height: 0.55rem;" v-if="extrasInfo.apply_vm_able && extrasInfo.show_apply_button && isapply" @click="applyVm()">
          <div class="point_create_btn">申请机器</div>
        </div>
        <div class="datano" v-if="!isapply">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>
      </div>

      <div class="point_title" v-if="isaudit">
        <p class="top">
          <span>待审核</span>
        </p>
        <ul class="place">
          <li class="place_list" v-for="(d,$index) in pointData" v-if="(!d.isBuild && d.checkStateId==1)">
            <h2>
              <label>
                <input type="checkbox" :checked="d.checked" @click="d.checked=!d.checked" />
                {{d.detailAddress}}
              </label>
              <em>
                <span class="bulecolr" v-if="d.reason && d.checkStateId==3" @click="showreason(d.reason)">查看原因</span>&nbsp;&nbsp;{{(d.isBuild && d.checkStateId==1)? '新建' : (!d.isBuild && d.checkStateId==1)? '审核中' : d.checkStateId==2? '审核通过' : '审核失败'}}</em>
            </h2>
            <p>
              <span class="left">
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.preview_able" @click="previewdata(extrasInfo.preview_able,d.id)">预览</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.add_edit_able" @click="editdata(extrasInfo.add_edit_able,d.id)">编辑</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.delete_able" @click="deletedata(extrasInfo.delete_able,d.id,$index)">删除</a>
              </span>
              <span class="right">台</span>
              <span class="right">
                <input type="text" class="input_count" :disabled="!extrasInfo.input_vm_count_able || (!d.isBuild && d.checkStateId==1)" v-model="d.vmCount"/>
              </span>
            </p>
          </li>
        </ul>
        <div class="datano" v-if="!isaudit">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>
        <div style="height: 0.55rem;" v-if="extrasInfo.check_able && extrasInfo.show_check_button && isaudit" @click="handlestate()">
          <div class="point_create_btn">审批</div>
        </div>
      </div>

      <div class="point_title">
        <p class="top">
          <span>点位列表（{{pointedData.length}}）</span>
          <em @click="addpointlist(extrasInfo.add_edit_able)" :class="getcolor(extrasInfo.add_edit_able)" v-if="extrasInfo.add_edit_able">+新增</em>
        </p>
        <ul class="place">
          <li class="place_list" v-for="(d,$index) in pointedData">
            <h2>
              {{d.detailAddress}}
              <em><span class="bulecolr" v-if="d.reason && d.checkStateId==3" @click="showreason(d.reason)">查看原因</span>&nbsp;&nbsp;{{stateStr(d.flowState)}}</em>
            </h2>
            <p style="position: relative;">
              <span class="left">
                <a href="javascript:;" :class="getcolor(true)" @click="luodian(d.id,d.vmCount)" v-if="d.buildStateId!=3 && extrasInfo.input_mac_able">落点</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.preview_able" @click="previewdata(extrasInfo.preview_able,d.id)">预览</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.add_edit_able && d.buildStateId!=3"  @click="editdata(extrasInfo.add_edit_able && d.buildStateId!=3,d.id)">编辑</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.delete_able && (d.checkStateId!=2)" @click="deletedata(extrasInfo.delete_able && (d.checkStateId!=2),d.id,$index)">删除</a>
                <a href="javascript:;" class="bulecolr" v-if="extrasInfo.view_operator" style=" position: absolute; left: 50%;" @click="operator(extrasInfo.view_operator,d.id)">操作人</a>
                 <a href="javascript:;" class="bulecolr" style=" position: absolute; left: 70%;" @click="viewdes(d.description)">机器地址</a>
              </span>
              <span class="right">
                <em>{{d.vmCount}}</em> 台
              </span>
            </p>
          </li>
        </ul>
      </div>

      <div class="point_title" style="padding-bottom: 0.2rem;" v-if="vmlists.length>0">
        <p class="top">
          <span>设备列表（{{vminfo.count}}）</span>
        </p>
        <ul class="place">
            <template v-for="v in vmlists">
              <li class="place_list">
                <h2>{{v.detail_address}}</h2>
                <div>
                  <p>
                    <span class="empty_path"><em>设备编号：NO.{{v.number}}</em></span>
                  </p>
                </div>
                <div>
                  <p><span>MAC地址：{{v.mac}}</span></p>
                </div>
              </li>
            </template>
        </ul>
      </div>
    </div>

    <mt-popup
      v-model="operator_show"
      popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem; min-height: 1.0rem; max-height: 3.0rem;">
      <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
        <div v-for="(o,$index) in operator_list">
          <div class="operate_show">
            <span>{{o.user_type_name}}:</span>
            <span v-if="!o.edit_able">{{o.user_name}}</span>
            <el-select v-model="o.user_id" placeholder="请选择" :disabled="!edit_able" @change="builder(o.user_id)" v-if="o.edit_able && $index==2" style="display: inline-block; width: 70%;">
              <el-option
                v-for="item in builder_user_list"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="o.user_id" placeholder="请选择" :disabled="!edit_able" @change="replen(o.user_id)" v-if="o.edit_able && $index==3" style="display: inline-block; width: 70%;">
              <el-option
                v-for="item in replenishment_user_list"
                :key="item.id"
                :label="item.userName"
                :value="item.id">
              </el-option>
            </el-select>
            <a :href="'tel:'+o.phone_number" class="phone_a"></a>
          </div>
        </div>
        <div class="mac_div" style="margin-top: 0.2rem;">
          <a class="btn" @click="canceloperate()">取消</a>
          <a class="btn" @click="sureoperate(edit_able)">确定</a>
        </div>
      </div>
    </mt-popup>

    <mt-popup
      v-model="macshow"
      popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem; min-height: 1.0rem; max-height: 3.0rem;">
      <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
        <div style="font-size: 0.14rem; text-align: left; margin-bottom: 0.1rem;">请输入Mac地址:（输入后即施工完成）</div>
        <input type="text" placeholder="请输入MAC地址（如：00-18-05-09-78-2A）" class="mac_input" v-for="n in macarr" v-model="n.mac" />
        <div class="mac_div">
          <a class="btn" @click="cancelpop()">取消</a>
          <a class="btn" @click="suredcom(edit_able)">确定</a>
        </div>
      </div>
    </mt-popup>

    <!--<transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>-->
  </div>



</template>

<script>

    import {MessageBox,Toast} from "mint-ui"

    import {mapState,mapActions,mapMutations} from "vuex"

    export default {
        name: "pointlist",
        data() {
            return {
              location_id:"",
              builder_user_list:[],
              builder_id:"",
              replenishment_user_list:[],
              replenishment_id:"",
              edit_able:false,
              operator_list:[],
              operator_show:false,
              pointedData:[],
              dropid:"",
              dropvm:0,
              macshow:false,
              macarr:[],
              area_id:this.$route.query.id? this.$route.query.id : 0,
              data:[],
              pointData:[],
              extrasInfo:{},
              vmlists:[],
              vminfo:{}
            }
        },
        computed: {
          ...mapState({
            isapply:state=>state.isapply,
            isaudit:state=>state.isaudit
          })
        },
        mounted() {
          this.pointlist();
          this.getvmlist();
          this.donepoint();
        },
        methods: {
          ...mapActions([
            "operator_",
            "setoperator_",
            'applyvm_',
            'pointdetail_',
            'deletepointdata_',
            "getmac_",
            "droppoint_",
            "buildend_",
            "vmlist_"
          ]),
          ...mapMutations([
            "changeapply",
            "changeapplyfalse",
            "changeaudit",
            "changeauditfalse"
          ]),
          //查看机器地址
          viewdes(description){
            if(!description){
              MessageBox.alert('暂无机器地址!').then(action=>{})
              return
            }
            MessageBox.alert(description).then(action=>{})
          },
          //状态1,待审核;2,审核通过,3,审核失败,4,待实施,5,实施中,6,实施完成,7,待补货,8,,9,补货完成
          stateStr(state){
            switch (state.toString()){
              case "1":
                return "待审核";
                break;
              case "2":
                return "审核通过";
                break;
              case "3":
                return "审核失败";
                break;
              case "4":
                return "待实施";
                break;
              case "5":
                return "实施中";
                break;
              case "6":
                return "实施完成";
                break;
              case "7":
                return "待补货";
                break;
              case "8":
                return "";
                break;
              case "9":
                return "";
                break;
            }
          },
          //查看原因
          showreason(str){
            MessageBox.alert(str,"拒绝原因").then(action=>{

            })
          },
          getClass(bool){
            if(bool){
              return "changebg"
            }
          },
          goback(){
            this.$router.replace({name:"point"})
          },
          builder(id){
            this.builder_id = id;
          },
          replen(id){
            this.replenishment_id = id;
          },
          //申请机器
          applyVm(){
            let data=[];
            for(var i=0;i<this.pointData.length;i++){
              if(this.pointData[i].checked){
                if(this.pointData[i].checkStateId==2 || (!this.pointData[i].isBuild && this.pointData[i].checkStateId==1)){
                  MessageBox.alert("包含已申请的机器，不能重复申请")
                  return
                }
                data.push({
                  id:this.pointData[i].id,
                  vmCount:parseInt(this.pointData[i].vmCount)
                })
              }
            }
            if(data.length==0){
              Toast('至少选择一个待处理的点位!')
              return
            }
            this.applyvm_(data).then((res)=>{
              if(res.success==200){
                MessageBox.alert("申请机器成功！").then(action => {
                  this.$router.go(0)
                });
              }
            })
          },
          //审批
          handlestate(){
            let data=[];
            for(var i=0;i<this.pointData.length;i++){
              if(this.pointData[i].checked){
                if(this.pointData[i].checkStateId==3 || (this.pointData[i].isBuild && this.pointData[i].checkStateId==1)){
                  MessageBox.alert("有未申请的机器，无法审批")
                  return
                }
                data.push(this.pointData[i].id)
              }
            }
            if(data.length==0){
              Toast('至少选择一个待处理的点位!')
              return
            }
            this.$router.push({name:"handlestate",query:{state:data.join(",")}})
          },
          //获取设备列表
          getvmlist(){
            this.vmlist_({area_id:this.area_id}).then((res)=>{
              if(res.success==200){
                this.vmlists = res.data;
                this.vminfo = res.extrasInfo;
              }
            })
          },
          getcolor(bool){
            if(bool){
              return "bulecolr"
            }else{
              return ""
            }
          },
          addpointlist(bool){
            if(bool){
              this.$router.push({name:"createpoint",query:{id:this.area_id,dataId:0}});
            }
          },
          //待处理
          pointlist(){
            this.pointdetail_({area_id:parseInt(this.area_id),type:1}).then((res)=>{
              if(res.success==200){
                this.pointData = res.data;
                if(this.pointData.length==0){
                  this.changeapplyfalse();
                  this.changeauditfalse();
                }
                this.pointData.find((p)=>{
                  if(p.vmCount==0){
                    p.vmCount=1;
                    p.isBuild=true
                  }else{
                    p.isBuild=false;
                  }
                })
                for(var i=0;i<this.pointData.length;i++){
                  this.pointData[i].checked=false;
                }
                for(var i=0;i<this.pointData.length;i++){
                  if((this.pointData[i].checkStateId==1 && this.pointData[i].isBuild) || this.pointData[i].checkStateId==3){
                    this.changeapply();
                    break;
                  }else{
                    this.changeapplyfalse();
                  }
                }
                for(var i=0;i<this.pointData.length;i++){
                  if((this.pointData[i].checkStateId==1 && !this.pointData[i].isBuild)){
                    this.changeaudit();
                    break;
                  }else{
                    this.changeauditfalse();
                  }
                }
                this.extrasInfo = res.extrasInfo;
              }
            })
          },
          //完成的列表
          donepoint(){
            this.pointdetail_({area_id:parseInt(this.area_id),type:2}).then((res)=>{
              if(res.success==200){
               /* res.data.find((p)=>{
                  if(p.vmCount==0){
                    p.vmCount=1;
                  }
                })*/
                this.pointedData = res.data;
              }
            })
          },
          //预览
          previewdata(bool,id){
            if(bool){
              this.$router.push({name:"preview",query:{id:id}})
            }
          },
          //编辑
          editdata(bool,id){
            if(bool){
              this.$router.push({name:"createpoint",query:{id:this.area_id,dataId:id}})
            }
          },
          //删除
          deletedata(bool,id,index){
            if(bool){
              MessageBox.confirm("确认要删除该点位?").then(action=>{
                this.deletepointdata_({id:id}).then((res)=>{
                  if(res.success==200){
                    Toast("删除成功");
                    this.pointlist();
                  }
                })
              },action=>{

              })
            }
          },
          //操作人
          operator(bool,id){
            if(bool){
              this.operator_show=true;
              this.location_id=id;
              this.operator_({location_id:id}).then((res)=>{
                if(res.success==200){
                  this.$nextTick(function (){
                    this.builder_user_list=res.data.builder_user_list;
                  })
                  this.replenishment_user_list=res.data.replenishment_user_list;
                  this.edit_able = res.data.edit_able;
                  this.operator_list = res.data.operator_list;
                }
              })
            }
          },
          //实施完成
          donebtn(){
            this.buildend_({area_id:this.area_id}).then((res)=>{
              if(res.success==200){
                MessageBox.alert("实施成功").then(action=>{
                  this.$router.go(0)
                })
              }
            })
          },
          //落点
          luodian(id,vmCount){
            this.dropid = id;
            this.dropvm = vmCount;
            this.macarr=[];
            this.macshow=true;
            this.getmac_({location_detail_id:id}).then((res)=>{
              if(res.success==200 && res.data.length>0){
                this.macarr = res.data;
              }else{
                for(var i=0;i<vmCount;i++){
                  this.macarr.push({
                    mac:""
                  })
                }
              }
            })
          },
          //取消；落点
          canceloperate(){
            this.operator_show=false;
          },
          //确认落点
          sureoperate(bool){
            if(bool){
              this.setoperator_({location_id:this.location_id,builder_user_id:this.builder_id,replenishment_user_id:this.replenishment_id}).then((res)=>{
                if(res.success==200){
                  MessageBox.alert("设置操作人成功！").then(action => {
                    this.operator_show=false;
                  });
                }
              })
            }else{
              this.operator_show=false;
            }
          },
          //取消mac输入
          cancelpop(){
            this.macshow=false;
          },
          //提交
          suredcom(){
            if(this.macarr.length != this.dropvm){
              MessageBox.alert("请补全mac地址");
              return
            }
            let arr = [];
            for(var i=0;i<this.macarr.length;i++){
              arr.push(this.macarr[i].mac)
            }
            const data = {
              id:this.dropid,
              vmCount:this.dropvm,
              macs:arr
            }
            this.droppoint_(data).then((res)=>{
              if(res.success==200){
                MessageBox.alert("落点成功").then((res)=>{
                  this.$router.go(0)
                })
              }else{

              }
            })
          }
        },
    }

</script>

<style scoped>


</style>
