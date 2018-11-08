import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 定义数据
const state = {
  menuPos: ''
}

// 修改数据
const mutations = {
  setMenuPos(menuPos, pos) {
    state.menuPos = pos
  }
}

// 获取数据
const getters = {
  getMenuPos: (state) => {
    return state.menuPos;
  }
}

// 定义store
export default new Vuex.Store({
  state,
  mutations,
  getters
})