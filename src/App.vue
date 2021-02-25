<template>
  <div id="app">
    <transition :name="transitionName" :mode="$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"/>
    </transition>
  </div>
</template>
<script>
export default {
  created() {
    const countermap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', countermap);
  },
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all .3s linear;
}
.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
