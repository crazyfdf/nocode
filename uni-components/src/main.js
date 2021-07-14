import Vue from 'vue';
import App from './App';
import uct from 'uctui';
Vue.use(uct);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
