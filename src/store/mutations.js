
import Vue from "vue"

import {Indicator} from "mint-ui"

export default {

  getCompanyList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.companySaleLists.push(data[i])
    }
  },

  getCompanyNumList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.companySaleNums.push(data[i])
    }
  },

  getDeviceList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.deviceSaleLists.push(data[i])
    }
  },

  getDeviceNumList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.deviceSaleNums.push(data[i])
    }
  },

  getProductList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.productSaleLists.push(data[i])
    }
  },

  getProductNumList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.productSaleNums.push(data[i])
    }
  },

  getFoodList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.foodSaleLists.push(data[i])
    }
  },

  getFoodNumList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.foodSaleNums.push(data[i])
    }
  },

  getSaleList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.saleSaleLists.push(data[i])
    }
  },

  getSaleNumList(state,data=[]){
    for(var i=0;i<data.length;i++){
      state.saleSaleNums.push(data[i])
    }
  },

  initData(state){
    state.companySaleLists=[];
    state.companySaleNums=[];
    state.deviceSaleLists=[];
    state.deviceSaleNums=[];
    state.productSaleLists=[];
    state.productSaleNums=[];
    state.foodSaleLists=[];
    state.foodSaleNums=[];
    state.saleSaleLists=[];
    state.saleSaleNums=[];
  },

  deviceSaleListsInit(state){
    state.deviceSaleLists = [];
  },

  deviceSaleNumsInit(state){
    state.deviceSaleNums = [];
  },

  companySaleListsInit(state){
    state.companySaleLists = [];
  },

  companySaleNumsInit(state){
    state.companySaleNums = [];
  },

  productSaleListsInit(state){
    state.productSaleLists = [];
  },

  productSaleNumsInit(state){
    state.productSaleNums = [];
  },

  foodSaleListsInit(state){
    state.foodSaleLists = [];
  },

  foodSaleNumsInit(state){
    state.foodSaleNums = [];
  },

  saleSaleListsInit(state){
    state.saleSaleLists = [];
  },

  saleSaleNumsInit(state){
    state.saleSaleNums = [];
  },

  setPosition(state,data){
    state.latitude = data.latitude;
    state.longitude = data.longitude;
  },

  getPointData(state,data={}){
    Object.assign(state.basicData,data);
  },

  setDevicePoint(state,data){
    state.devicelo = data.gps_lng;
    state.devicela = data.gps_lat;
  },

  getDevicePoint(state,data={}){
    state.devicelo = data.longitude;
    state.devicela = data.latitude;
  },

  setGoodsList(state,data){
    state.goodsList = data || [];
  },

  setTime(state,data){
    state.timedur = data;
    console.info(state.timedur)
  },

  setAisleList(state,data = []){
    state.aisleList = data;
  },

  //保存商品名称
  saveProductName(state,data=[]){
    state.productNameLists = data;
  },

  //赋值
  setLadList(state,data=[]){
    state.ispass=false;
    state.ladArray=[];
    for(var i=0;i<data.length;i++){
      state.ladArray.push({
        //options:state.productNameLists,
        value:data[i].pName,
        goodsid:data[i].p_id,
        weight:data[i].weight,
        unit:data[i].unit,
        price:data[i].costPrice,
        number:data[i].count,
        productName:data[i].pName,
        disabled:true
      })
    }
  },

  changepass(state){
    state.ispass=false;
  },

  changepasstrue(state){
    state.ispass=true;
  },

  //
  initLadArray(state){
    state.ladArray=[
      {
        options:state.productNameLists,
        value:"",
        goodsid:"",
        price:"",
        weight:"",
        unit:"",
        number:"",
        productName:"",
        disabled:false
      }
    ];
  },

  //初始化第一次
  initLad(state,data=[]){
    state.ladArray[0].options = data;
  },

  addLad(state){
    state.ladArray.push({
      options:state.productNameLists,
      value:"",
      goodsid:"",
      weight:"",
      price:"",
      unit:"",
      number:"",
      productName:"",
      disabled:false
    })
  },

  deleteLad(state,index){
    state.ladArray.splice(index,1)
  },

  //保存仓库名称
  saveStore(state,data=[]){
    state.storeLists.push(...data);
  },

  //初始化值
  initStore(state){
    state.dataArr=[];
    state.storeLists=[];
  },

  saveDataArr(state,data=[]){
    state.dataArr.push(...data);
  },

  addNumData(state,num){
    for(var i=0;i<state.dataArr.length;i++){
      for(var j=0;j<state.dataArr[i].selectArr.length;j++){
        Vue.set(state.dataArr[i].selectArr[j],"storeNum",num)
      }
    }
  },

  //下拉传值
  selectDown(state,value){
    for(var i=0;i<state.storeLists.length;i++){
      if(value.value == state.storeLists[i].id){
        Vue.set(value,"name",state.storeLists[i].name)
        Vue.set(value,"storeNum",state.storeLists[i].count_use)
      }
    }
  },

  addStoreData(state,index){
    state.dataArr[index].selectArr.push({
      options:state.storeLists,
      value:state.storeLists[0].id,
      storeNum:0,
      number:0
    })
  },

  //或者厂家信息
  getVendorList(state,data=[]){
    state.vendorlist=data;
  },

  //或者租赁方列表
  getRenterList(state,data=[]){
    state.renterlist=data;
  },

  //添加厂家信息
  addVendorList(state,data={}){
    state.vendorlist.push(data)
  },

  addRenterList(state,data={}){
    state.renterlist.push(data)
  },

  changeapply(state){
    state.isapply=true;
  },

  changeapplyfalse(state){
    state.isapply=false;
  },

  changeaudit(state){
    state.isaudit=true;
  },

  changeauditfalse(state){
    state.isaudit=false;
  },

  //得到商品权限
  returnlimit(state,data=true){
    state.productlimit = data;
  },


}

























