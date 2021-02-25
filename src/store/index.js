import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/api/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    sideList: [],
    goodsList: [],
    page: 1,
    size: 7,
    sort: 'all',
    goodsType: 2,
    counterMap: {},
    finish: false,
  },
  mutations: {
    setFinsh(state, boo) {
      state.finish = boo;
    },
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[id] === 1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setTwoList(state, list) {
      state.sideList = list;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setStype(state, type) {
      state.goodsType = type;
    },
  },
  actions: {
    getSideList({ commit, state }, value) {
      // const value = await axios.getTwoList(type);
      state.loading = true;
      commit('setTwoList', value);
      state.loading = false;
    },
    async getGoodsList({ commit, state }, t) {
      const type = t.type || state.goodsType;
      const { page, sort } = t;
      // const { type } = t;
      commit('setStype', type);
      const { list, total } = await axios.getGoodsList(type, page, state.size, sort);
      commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
