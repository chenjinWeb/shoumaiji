// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import MintUI from "mint-ui"
import elementUi from "element-ui"

Vue.use(router);
Vue.use(MintUI);
Vue.use(elementUi);

Vue.config.silent = true;
Vue.config.devtools = true;

//全局使用过滤器和组件
import filter from "./filter"
import component from "./component"


Vue.use(filter);
Vue.use(component);

import "mint-ui/lib/style.css"


Vue.config.productionTip = false;

//异步 加快首页加载速度
const app = new Vue({
  el: '#app',
  store,
  router,
  render: a => a(App)
});

export {app, router, store}
