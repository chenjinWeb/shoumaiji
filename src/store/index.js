import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import mutations from "./mutations"
import index from "./modules/index-modules"
import {ScrollBar} from "../scroll-bar";
import { formatDate } from "../utils"
import {getLocation} from "../location"

let date = formatDate(new Date(),"yyyy-MM-dd")

const state={
  timedur:{
    times:Date.format(new Date(),"yyyy-MM-dd"),
    timee:Date.format(new Date(),"yyyy-MM-dd"),
  },
  date : date,
  companySaleLists:[],
  companySaleNums:[],
  deviceSaleLists:[],
  deviceSaleNums:[],
  productSaleLists:[],
  productSaleNums:[],
  foodSaleLists:[],
  foodSaleNums:[],
  saleSaleLists:[],
  saleSaleNums:[],
  goodsLists:[],
  basicData:{},
  ScrollBar: new ScrollBar(),
  longitude:"",
  latitude:"",
  devicelo:"",
  devicela:"",
  productNameLists:[],
  ladArray:[
    {
      options:[],
      value:"",
      goodsid:"",
      weight:"",
      number:"",
      price:""
    }
  ],
  ispass:true,
  dataArr:[],
  storeLists:[],
  storeArray:[
    {
      options:[],
      value:"",
      id:"",
      count:0
    }
  ],
  vendorlist:[],
  isapply:false,
  isaudit:false,
  productlimit:true,
  renterlist:[]
}

const getters = {

}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules:{
    $index:index
  }
})

export default store






