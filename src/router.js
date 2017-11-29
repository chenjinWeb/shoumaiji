import Vue from 'vue'
import Router from 'vue-router'
import login from "./pages/login/login.vue"
import error from "./pages/login/error.vue"
import limiterror from "./pages/login/limiterror.vue"
import success from "./pages/login/success.vue"
import signlist from "./pages/index/signlist.vue"
import signdetail from "./pages/index/signdetail.vue"
import errortotal from "./pages/index/errortotal.vue"
import errororder from "./pages/index/errororder.vue"
import help from "./pages/help/help.vue"
import index from "./pages/index/index.vue"
import user from "./pages/index/user.vue"
import devicetotal from "./pages/index/devicetotal.vue"
import devicegrid from "./pages/index/devicegrid.vue"
import griddetail from "./pages/index/griddetail.vue"
import xiaodetail from "./pages/index/xiaodetail.vue"
import userInfo from "./pages/index/userInfo.vue"
import pwdModify from "./pages/index/pwdModify.vue"
import question from "./pages/index/question.vue"
import salesdatadetail from "./pages/index/salesdatadetail.vue"
import Salesdetails from "./pages/index/Salesdetails.vue"
import Totalsales from "./pages/index/Totalsales.vue"
import outofstock from "./pages/index/outofstock.vue"
import productsell from "./pages/index/productsell.vue"
import devicesell from "./pages/index/devicesell.vue"
import companysell from "./pages/index/companysell.vue"
import lacksell from "./pages/index/lacksell.vue"
import lackorder from "./pages/index/lackorder.vue"
import devicesaledetail from "./pages/index/devicesaledetail.vue"
import productorder from "./pages/index/productorder.vue"
import deviceorder from "./pages/index/productorder.vue"
import companyorder from "./pages/index/productorder.vue"
import deviceerror from "./pages/index/deviceerror.vue"
import point from "./pages/point/point.vue"
import addPoint from "./pages/point/addPoint.vue"
import handlestate from "./pages/point/handlestate.vue"
import pointlist from "./pages/point/pointlist.vue"
import createpoint from "./pages/point/createpoint.vue"
import basicinformat from "./pages/point/basicinformat.vue"
import latitude from "./pages/point/latitude.vue"
import timehandily from "./pages/point/timehandily.vue"
import populattribute from "./pages/point/populattribute.vue"
import naturalenviront from "./pages/point/naturalenviront.vue"
import traffic from "./pages/point/traffic.vue"
import construction from "./pages/point/construction.vue"
import municipalplann from "./pages/point/municipalPlann.vue"
import other from "./pages/point/other.vue"
import competitive from "./pages/point/competitive.vue"
import preview from "./pages/point/preview.vue"
import product from "./pages/product/product.vue"
import inventory from "./pages/product/inventory.vue"
import purchapp from "./pages/product/purchapp.vue"
import goodsdetails from "./pages/product/goodsdetails.vue"
import storeddetail from "./pages/product/storeddetail.vue"
import outinventory from "./pages/product/outinventory.vue"
import procurecheck from "./pages/product/procurecheck.vue"
import outcheck from "./pages/product/outcheck.vue"
import waitdetail from "./pages/product/waitdetail.vue"
import device from "./pages/device/device.vue"
import devicedetails from "./pages/device/devicedetails.vue"
import devicebasic from "./pages/device/devicebasic.vue"
import fault from "./pages/device/fault.vue"
import signhistory from "./pages/device/signhistory.vue"
import signhis from "./pages/index/signhis.vue"
import signhisdetail from "./pages/index/signhisdetail.vue"
import tradingorder from "./pages/device/tradingorder.vue"
import goods from "./pages/device/goods.vue"
import changegoods from "./pages/device/changegoods.vue"
import statistics from "./pages/device/statistics.vue"
import footer from "./components/footer.vue"
import devicelong from "./pages/device/devicelong.vue"
import pointentrance from "./pages/point/pointentrance.vue"
import workreport from "./pages/index/workreport.vue"
import workdetail from "./pages/index/workdetail.vue"
import lineout from "./pages/product/lineout.vue"
import procheckdetail from "./pages/product/procheckdetail.vue"
import procheck from "./pages/product/procheck.vue"
import instoreddetail from "./pages/product/instoreddetail.vue"
import incheck from "./pages/product/incheck.vue"
import proapply from "./pages/product/proapply.vue"
import prowait from "./pages/product/prowait.vue"
import prorefuze from "./pages/product/prorefuze.vue"
import productlist from "./pages/product/productlist.vue"
import financialdetails from "./pages/index/financialdetails.vue"
import addfinancial from "./pages/index/addfinancial.vue"


/*补货*/
import replen from "./pages/replen/replen.vue"
import waitstore from "./pages/replen/waitstore.vue"
import replened from "./pages/replen/replened.vue"
import replenapply from "./pages/replen/replenapply.vue"
import repgoods from "./pages/replen/repgoods.vue"
import repdetail from "./pages/replen/repdetail.vue"
import repout from "./pages/replen/repout.vue"
import repoutdetail from "./pages/replen/repoutdetail.vue"
import addrep from "./pages/replen/addrep.vue"
import repsale from "./pages/replen/repsale.vue"
import reportday from "./pages/replen/reportday.vue"
import historyreport from "./pages/replen/historyreport.vue"
import historyreportdetail from "./pages/replen/historyreportdetail.vue"


/*资产管理*/
import asset from "./pages/device/asset.vue"
import machinelist from "./pages/device/machinelist.vue"
import assetdetail from "./pages/device/assetdetail.vue"
import storedasset from "./pages/device/storedasset.vue"
import addedit from "./pages/device/addedit.vue"
import addfactory from "./pages/device/addfactory.vue"
import addrenter from "./pages/device/addrenter.vue"


Vue.use(Router)

//初始页
let routes = [{
  path: '*',
  component: login
  // components: {
  //     node: index,
  //     footer: footer
  // },
}];

//tab切换的页面
let tabs = [
  {
    name: 'index',
    path: '/index',
    components: {
      node: index,
      footer: footer
    }
  },
  {
    name: 'point',
    path: '/point',
    components: {
      node: point,
      footer: footer
    }
  },
  {
    name: 'product',
    path: '/product',
    components: {
      node: product,
      footer: footer
    }
  },
  {
    name: 'device',
    path: '/device',
    components: {
      node: device,
      footer: footer
    }
  },
  {
    name: 'replen',
    path: '/replen',
    components: {
      node: replen,
      footer: footer
    }
  }
];

/*登录*/
let login_ = [
  {
    name: 'login',
    path: '/login',
    component: login,
    /*children: [
      {
        name: 'about',
        path: 'about',
        component: about
      }
    ]*/
  },
  {
    name: 'error',
    path: '/error',
    component: error,
  },
  {
    name: 'limiterror',
    path: '/limiterror',
    component: limiterror,
  },
  {
    name: 'success',
    path: '/success',
    component: success,
  }
]

/*首页*/
let indexMan=[
  {
    name: 'user',
    path: '/user',
    component:user,
  },
  {
    name: 'devicetotal',
    path: '/devicetotal',
    component:devicetotal,
    children:[
      {
        name: 'xiaodetail',
        path: 'xiaodetail',
        component:xiaodetail,
      }
    ]
  },
  {
    name:'financialdetails',
    path:"/financialdetails",
    component:financialdetails
  },
  {
    name:'addfinancial',
    path:"/addfinancial",
    component:addfinancial
  },
  {
    name: 'salesdatadetail',
    path: '/salesdatadetail',
    component:salesdatadetail,
    children:[
      {
        name: 'Salesdetails',
        path: 'Salesdetails',
        component:Salesdetails
      },
    ]
  },
  {

    name: 'devicegrid',
    path: '/devicegrid',
    component:devicegrid,
    children:[
      {
        name: 'griddetail',
        path: 'griddetail',
        component:griddetail,
      }
    ]
  },
  {
    name: 'Totalsales',
    path: '/Totalsales',
    component:Totalsales
  },
  {
    name: 'outofstock',
    path: '/outofstock',
    component:outofstock
  },
  {
    name: 'productsell',
    path: '/productsell',
    component:productsell,
    children:[
      {
        name: 'productorder',
        path: 'productorder',
        component:productorder
      },
    ]
  },
  {
    name: 'devicesell',
    path: '/devicesell',
    component:devicesell,
    children:[
      {
        name: 'deviceorder',
        path: 'deviceorder',
        component:deviceorder
      },
    ]
  },
  {
    name: 'companysell',
    path: '/companysell',
    component:companysell,
    children:[
      {
        name: 'companyorder',
        path: 'companyorder',
        component:companyorder
      },
    ]
  },
  {
    name: 'lacksell',
    path: '/lacksell',
    component:lacksell,
    children:[
      {
        name: 'lackorder',
        path: 'lackorder',
        component:lackorder
      },
    ]
  },
  {
    name: 'devicesaledetail',
    path: '/devicesaledetail',
    component:devicesaledetail
    /*children:[
      {
        name: 'companyorder',
        path: 'companyorder',
        component:companyorder
      },
    ]*/
  },
  {
    name: 'deviceerror',
    path: '/deviceerror',
    component:deviceerror
  },
  {
    name: 'signlist',
    path: '/signlist',
    component:signlist,
    children:[
      {
        name: 'signdetail',
        path: 'signdetail',
        component:signdetail,
        children:[
          {
            name:"signhis",
            path:"signhis",
            component:signhis,
            children:[
              {
                name:'signhisdetail',
                path:'signhisdetail',
                component:signhisdetail
              }
            ]
          }
        ]
      }
    ]
  },

  {
    name: 'errortotal',
    path: '/errortotal',
    component:errortotal,
    children:[
      {
        name: 'errororder',
        path: 'errororder',
        component:errororder,
      }
    ]
  },

  //工作报表
  {
    name:"workreport",
    path:"/workreport",
    component:workreport,
    children:[
      {
        name:"workdetail",
        path:"workdetail",
        component:workdetail,
      }
    ]
  }
]

/*用户*/
let user_ = [
  {
    name: 'userInfo',
    path: '/userInfo',
    component: userInfo
  },
  {
    name: 'pwdModify',
    path: '/pwdModify',
    component: pwdModify
  },
  {
    name: 'question',
    path: '/question',
    component: question
  },
];

/*点位管理*/
let pointMan=[
  {
    name: 'pointentrance',
    path: '/pointentrance',
    component:pointentrance,
  },
  {
    name: 'addPoint',
    path: '/addPoint',
    component:addPoint,
    /*children:[
      {
        name: 'goodsList',
        path: 'goodsList',
        component: goodsList
      }
    ]*/
  },
  {
    name: 'handlestate',
    path: '/handlestate',
    component:handlestate
  },
  {
    name: 'pointlist',
    path: '/pointlist',
    component:pointlist
  },
  {
    name: 'createpoint',
    path: '/createpoint',
    component:createpoint,
    children:[
      {
        name: 'basicinformat',
        path: 'basicinformat',
        component:basicinformat,
        children:[
          {
            name: 'latitude',
            path: 'latitude',
            component:latitude
          }
        ]
      },
      {
        name: 'timehandily',
        path: 'timehandily',
        component:timehandily
      },
      {
        name: 'competitive',
        path: 'competitive',
        component:competitive
      },
      {
        name: 'populattribute',
        path: 'populattribute',
        component:populattribute
      },
      {
        name: 'naturalenviront',
        path: 'naturalenviront',
        component:naturalenviront
      },
      {
        name: 'traffic',
        path: '/traffic',
        component:traffic
      },
      {
        name: 'construction',
        path: 'construction',
        component:construction
      },
      {
        name: 'municipalplann',
        path: 'municipalplann',
        component:municipalplann
      },
      {
        name: 'other',
        path: 'other',
        component:other
      },
    ]
  },

  {
    name: 'preview',
    path: '/preview',
    component:preview
  }

];

/*商品管理*/
let productMan=[

  {
    name:"proapply",
    path: '/proapply',
    component:proapply,
    children:[
      {
        name:"goodsdetails",
        path: 'goodsdetails',
        component:goodsdetails,
      },
      {
        name:"prowait",
        path: 'prowait',
        component:prowait,
      },
    ]
  },
  {
    name:"prorefuze",
    path: '/prorefuze',
    component:prorefuze
  },
  {
    name: 'inventory',
    path: '/inventory',
    component:inventory,
    children:[
      {
        name: 'instoreddetail',
        path: 'instoreddetail',
        component:instoreddetail
      },
      {
        name:"incheck",
        path: 'incheck',
        component:incheck,
      },
    ]
  },
  //采购审核点击审核进入的审核页面
  {
    name:"procheck",
    path: '/procheck',
    component:procheck,
  },
  //采购申请
  {
    name: 'purchapp',
    path: '/purchapp',
    component:purchapp
  },
  {
    name: 'outinventory',
    path: '/outinventory',
    component:outinventory,
    children:[
      {
        name: 'storeddetail',
        path: 'storeddetail',
        component:storeddetail
      }
    ]
  },
  {
    name:'outcheck',
    path:"/outcheck",
    component:outcheck
  },
  {
    name:'lineout',
    path:"/lineout",
    component:lineout
  },
  {
    name: 'procurecheck',
    path: '/procurecheck',
    component:procurecheck,
    children:[
      {
        name: 'procheckdetail',
        path: 'procheckdetail',
        component:procheckdetail
      },
    ]
  },
  {
    name: 'waitdetail',
    path: '/waitdetail',
    component:waitdetail
  },
  {
    name:"productlist",
    path:"/productlist",
    component:productlist
  }
]

/*设备管理*/
let deviceMan=[
  {
    name: 'devicebasic',
    path: '/devicebasic',
    component:devicebasic,
    children:[
      {
        name: 'devicelong',
        path: 'devicelong',
        component:devicelong,
      }
    ]
  },
  {
    name: 'devicedetails',
    path: '/devicedetails',
    component:devicedetails,
    children:[

      {
        name: 'signhistory',
        path: 'signhistory',
        component:signhistory
      },
      {
        name: 'fault',
        path: 'fault',
        component:fault
      },
      {
        name: 'tradingorder',
        path: 'tradingorder',
        component:tradingorder
      },
      {
        name: 'statistics',
        path: 'statistics',
        component:statistics
      },
      {
        name: 'goods',
        path: 'goods',
        component:goods,
        children:[
          {
            name: 'changegoods',
            path: 'changegoods',
            component:changegoods
          }
        ]
      }
    ]
  },


]

/*帮助*/
let help_ = {
  name: 'help',
  path: '/help',
  component: help
}

//补货
let replenpage=[
  {
    name: 'repgoods',
    path: '/repgoods',
    component:repgoods
  },
  {
    name: 'repdetail',
    path: '/repdetail',
    component:repdetail
  },
  {
    name: 'repout',
    path: '/repout',
    component:repout,
    children:[

      {
        name:"repoutdetail",
        path:"repoutdetail",
        component:repoutdetail
      },
      {
        name:"waitstore",
        path:"waitstore",
        component:waitstore
      },
      {
        name:"replened",
        path:"replened",
        component:replened
      },
      {
        name:"replenapply",
        path:"replenapply",
        component:replenapply
      }
    ]
  },
  {
    name: 'addrep',
    path: '/addrep',
    component:addrep,
    children:[
      {
        name:"repsale",
        path:"repsale",
        component:repsale
      }
    ]
  },

  {
    name: 'reportday',
    path: '/reportday',
    component:reportday,
    children:[
      {
        name: 'historyreport',
        path: 'historyreport',
        component:historyreport,
        children:[
          {
            name: 'historyreportdetail',
            path: 'historyreportdetail',
            component:historyreportdetail,
          }
        ]
      }
    ]
  },
]

//资产管理
let assetpage=[
  {
    name: 'asset',
    path: '/asset',
    component:asset,
    children:[
      {
        name:"machinelist",
        path:"machinelist",
        component:machinelist,
        children:[
          {
            name:"assetdetail",
            path:"assetdetail",
            component:assetdetail,
          },
          {
            name:"storedasset",
            path:"storedasset",
            component:storedasset,
          },
        ]
      },
    ]
  },
  {
    name:"addedit",
    path:"/addedit",
    component:addedit,
    children:[
      {
        name:"addfactory",
        path:"addfactory",
        component:addfactory
      },
      {
        name:"addrenter",
        path:"addrenter",
        component:addrenter
      },
    ]
  }
]

let array = [
  ...login_,
  ...tabs,
  ...indexMan,
  ...user_,
  help_,
  ...pointMan,
  ...productMan,
  ...deviceMan,
  ...replenpage,
  ...assetpage
];
routes.unshift(...array);

const router = new Router({
  routes: routes,
  mode: 'hash',
});

//登录拦截
router.beforeEach((to, from, next) => {
  next();
});

export default router;

