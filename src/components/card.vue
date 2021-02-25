<template>
  <div class="card">
      <div class="cardImg" >
          <img :src="image" alt="" ref="img">
      </div>
      <div class="card-content">
          <div class="overflow-hidden title">{{title}}</div>
          <div class="overflow-hidden desc">{{desc}}</div>
          <div class="tags">
              <div v-for="(item, i) in tags" :key="i">{{item}}</div>
          </div>
          <div class="prices">
              <div class="price">{{price}}</div>
              <div class="price-off">{{price_off}}</div>
              <div class="counter">
                  <div @touchend="changeHandler(id, -1)" v-if="num">
                      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
                  </div>
                  <div class="num" v-if="num">{{num}}</div>
                  <div @touchend="changeHandler(id, 1)"

                  >
                      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt="">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import animate from '@/tools/animate';

export default {
  props: ['id', 'title', 'desc', 'tags', 'price', 'price_off', 'image', 'num'],
  methods: {
    ...mapMutations(['storageChange']),
    changeHandler(id, num) {
      this.storageChange({ id, value: num });
      if (num === 1) {
        const { left, top } = this.$refs.img.getBoundingClientRect();
        console.log(left, top);
        const shoppingCard = document.getElementById('shoping-card');
        const { left: shoppingLeft, top: shoppingTop } = shoppingCard.getBoundingClientRect();
        const { offsetWidth: shopWidth, offsetHeight: shopHeight } = shoppingCard;
        const endX = shoppingLeft + shopWidth / 2;
        const endY = shoppingTop + shopHeight / 2;
        const { width, height } = getComputedStyle(this.$refs.img, null);
        animate({
          startX: left,
          startY: top,
          endX,
          endY,
          width,
          height,
          src: this.$refs.img.src,

        });
      }
    },
  },

};
</script>

<style lang="less">
    .card{
         width: 100%;
        box-sizing: border-box;
        height: 100px;
        display: flex;
        .cardImg{
            width: 90px;
            margin-right: 20px;
            img{
                width: 90px;
                height: 90px;
            }
        }
        .card-content{
             position: relative;
            flex: 1;
            >div:not(.smaller) {
                width: 170px;
            }
            .title {
                font-size: 13px;
                color: #1a1a1a;
                margin-top: 5px;
            }
            .desc {
                color: #aaa;
                font-size: 11px;
                margin-top: 5px;
            }
             .tags {
            display: flex;
            margin-top: 4px;
            >div {
            font-size: 10px;
            border: 1px solid #aaa;
            padding: 1px 2px 2px 2px;
            color: #aaa;
            border-radius: 3px;
            margin-right: 5px;
            }

        }
         .prices{
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            .price-off {
            font-size: 14px;
            color: #ff1a90;
            font-weight: 600;
            margin-right: 5px;
            }
            .price {
            font-size: 12px;
            color: #aaa;
            text-decoration: line-through;
            }
        }
        .counter{
            position: absolute;
            bottom: 12px;
            right: 15px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            > div:not(.num){
                width: 16px;
                height: 16px;
                img{
                    width: 100%;
                }
            }
            .num {
                padding:0 5px;
                height: 22px;
                line-height: 22px;
      }
        }
        }
    }
    .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
