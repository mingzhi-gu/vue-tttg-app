<template>
  <div class="goodsList">
      <div class="list-header">
          <div :class="{'active': type === 'all'}" @touchend="changeType('all')">综合</div>
          <div :class="{'active': type === 'sale'}" @touchend="changeType('sale')">销量</div>
          <div
          class="price"
          :class="{'price-up': type === 'price-up',
          'price-down': type === 'price-down'}"
          @touchend="changeType('price')"
          >价格</div>
      </div>
      <div class="list-content">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            >
            <card
            v-for="item in goodsList"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :desc="item.desc"
            :tags="item.tags"
            :price="item.price"
            :price_off="item.price_off"
            :num="counterMap[item.id]"
            :image="item.images[0]"
            ></card>
            </van-list>
          </van-pull-refresh>
      </div>
  </div>
</template>

<script>
import card from '@/components/card.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    card,
  },
  data() {
    return {
      count: 0,
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,

    };
  },
  computed: {
    ...mapState(['goodsList', 'counterMap', 'finish']),
  },
  methods: {
    ...mapMutations(['resetGoodsList', 'setFinsh']),
    ...mapActions(['getGoodsList']),
    changeType(type) {
      if (type === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = type;
      }
    },
    onRefresh() {
      setTimeout(() => {
        // Toast('刷新成功');
        this.isLoading = false;
        this.finished = false;
        this.count += 1;
        this.page = 1;
        this.resetGoodsList();
        this.getGoodsList({ page: 1, sort: this.type });
      }, 500);
    //   this.isLoading = true;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.getGoodsList({ page: this.page, sort: this.type });
      this.loading = false;
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },

  },
};
</script>

<style lang="less">
    .goodsList{
        width: 296px;
        position: fixed;
        top: 135px;
        right: 0;
        bottom: 50px;
        .list-header {
             position: sticky;
             top: 0;
            display: flex;
            justify-content: flex-end;
            height: 25px;
            width: 280px;
            padding: 0 8px;
            margin: 0 auto;
            border-bottom: 1px solid #eee;
            z-index: 100;
            background: #fff;
            font-size: 12px;
            > div {
            height: 25px;
            line-height: 25px;
            width: 50px;
            text-align: center;
            color: #aaa;
            position: relative;
            }
            .active, .price-up, .price-down{
                color: #ff1a90;
                font-weight: bold;
            }
            .price::after {
                content: '';
                border: 4px solid transparent;
                border-top-color: #aaa;
                position: absolute;
                bottom: 4px;
                right: 0;
           }
            .price::before {
                content: '';
                border: 4px solid transparent;
                border-bottom-color: #aaa;
                position: absolute;
                top: 4px;
                right: 0;
            }
            .price-up::before {
                 border-bottom-color: #ff1a90;
            }
             .price-down::after {
                  border-top-color: #ff1a90;
            }
        }
        .list-content{
            width: 296px;
            position: fixed;
            top: 170px;
            right: 0;
            bottom: 50px;
            // height: 100%;
            overflow: auto;
        }
    }
</style>
