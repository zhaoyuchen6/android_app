import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isManager: false,
    countdownValue: 30
  },
  getters: {
    // isManager: state => state.isManager,
    countdownValue: state => state.countdownValue
  },
  mutations: {
    isManagerFn(state, flag) {
      state.isManager = flag;
    },
    countdownValueFn(state, value) {
      state.countdownValue = value;
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit}, id) {

    }
  }
});
export default store;
