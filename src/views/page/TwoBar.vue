<template>
  <div class="twoBar"
  @touchstart="move=false"
  @touchmove="move=true"
  @touchend="scrollTo"
   ref="side">
      <div :class="{active: index == i}"
      v-for="(item, i) in sideList"
      :key="i"
      :data-id="i"

      >{{ i == 0 ? '全部' : item}}</div>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      list: [],
      index: 0,
      move: false,
      page: 1,
      size: 7,
      sortType: 'all',
    };
  },
  computed: {
    ...mapState(['sideList']),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    scrollTo(e) {
      if (this.move) {
        return;
      }
      if (e.target.dataset.id) {
        this.index = +e.target.dataset.id;
      } else if (e.target.parentElement.dataset.id) {
        this.index = +e.target.parentElement.dataset.id;
      } else if (e.target.parentElement.parentElement.dataset.id) {
        this.index = +e.target.parentElement.parentElement.dataset.id;
      } else {
        return;
      }
      //   this.resetGoodsList();
      //   this.nextSibling = e.target.nextElementSibling;
      const cTop = e.target.getBoundingClientRect().top;
      const sideTop = this.$refs.side.offsetTop;
      const sideHeight = this.$refs.side.offsetHeight / 2;
      this.moveScroll(this.$refs.side.scrollTop, (sideHeight - (cTop - sideTop)));
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideList[this.index], page: 1, sort: this.sortType });
    },
    moveScroll(start, end) {
      if (this.move) {
        this.move = false;
        return;
      }
      let dis = 0;
      let speed = 5;
      if (end > 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.side.scrollTop = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          this.$refs.side.scrollTop = start - end;
          clearInterval(t);
        }
      }, 2);
    },

  },
  mounted() {
    this.resetGoodsList();
    this.getGoodsList({ type: this.sideList[0], page: 1, sort: this.sortType });
  },
};
</script>

<style lang="less" scoped>
    .twoBar {
        width: 79px;
        position: fixed;
        left: 0;
        top: 135px;
        bottom: 1.33333rem;
        background: #f8f8f8;
        overflow: auto;
        div {
        width: 100%;
        text-align: center;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        position: relative;
      }
      .active {
        font-weight: bold;
        color: #ff1a90;
      }
      .active::before {
        position: absolute;
        width: 6px;
        height: 18px;
        background: #ff1a90;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        content: '';
      }
    }
    .twoBar::-webkit-scrollbar{
        width: 0;
        background: none;
    }
</style>
