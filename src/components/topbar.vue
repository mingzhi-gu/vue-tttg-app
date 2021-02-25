<template>
  <div class="topbar"
  ref="scroll"
         @touchend="scrollTo"
       @touchstart="move = false"
       @touchmove="move = true"
  >
      <div class="topImg "
      v-for="(item, i) in menuList"
       :key="i"
       :class="{'active':i == index}"
       :data-id="i"
       >
          <div class="imgs">
              <img :src="item.imgURL">
          </div>
          <div class="title">{{item.title}}</div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  created() {
    this.$axios.getTwoList(this.menuList[this.index].title).then((res) => {
      this.getSideList(res);
    });
  },
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getSideList', 'getGoodsList']),
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
      const itemOL = e.target.getBoundingClientRect().left;
      const itemOW = e.target.offsetWidth;
      const wrapperWidth = this.$refs.scroll.clientWidth;
      const changeDisX = itemOL - wrapperWidth / 2 + itemOW / 2;
      this.moveScroll(this.$refs.scroll.scrollLeft, changeDisX);
      this.$axios.getTwoList(this.menuList[this.index].title).then((res) => {
        this.getSideList(res);
        this.resetGoodsList();
        this.getGoodsList({ type: res[0], page: 1, sort: 'all' });
      });
    },
    moveScroll(start, end) {
      let dis = 0;
      let speed = 5;
      if (end < 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.scroll.scrollLeft = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          this.$refs.scroll.scrollLeft = start + end;
          clearInterval(t);
        }
      }, 2);
    },
  },

};
</script>

<style lang="less" scoped>
    .topbar{
        // width: 100vw;
        display: flex;
        height: 94px;
        // border: 1px solid #f40;
        overflow: auto;
        .topImg{
            width: 50px;
            height: 70px;
            // margin-top: 10px;
            margin-left: 10px;
            // border:#f40 1px solid;
            &.active {
            .imgs{
                background: #fff;
                border-color: #d13193;
            }
            .title{
                color: #fff;
                background: #d13193;
                font-weight: bold;
                border-radius: 30px;
            }
        }
            .imgs{
                width: 100%;
                height: 50px;
                border-width: 2px;
                border-style: solid;
                border-color: transparent;
                border-radius: 23px;
                img{
                    width: 45px;
                    height: 45px;
                    position: relative;
                    left: 50%;
                    top: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    border-radius: 50%;

                }
            }
            .title{
                 margin-top: 5px;
                 font-size: 12px;
            }
        }

    }
    .topbar::-webkit-scrollbar{
        width: 0;
         background: none;
    }
</style>
