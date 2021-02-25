<template>
  <div>
      <router-view></router-view>
      <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{name: 'Classify'}">分类</van-tabbar-item>
      <van-tabbar-item
      id="shoping-card"
      icon="cart-o" :to="{name: 'Shopping'}" :badge="badge">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },

};
</script>

<style>

</style>
