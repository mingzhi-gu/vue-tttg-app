<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
      title="购物车"
      right-text="删除"
      @click-right="del"
    />
    </div>
     <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result"  ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <Card
          :id="item.id"
          :title="item.title"
          :desc="item.desc"
          :tags="item.tags"
          :price="item.price"
          :price_off="item.price_off"
          :num="counterMap[item.id]"
          :image="item.images[0]"></Card>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>

</template>

<script>
import Card from '@/components/card.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Card,
  },
  data() {
    return {
      list: [],
      result: [],
      // allMoney: null,
      // totalNum: null,
      checked: false,

    };
  },
  computed: {
    ...mapState(['counterMap']),
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return (Math.round(num * next.price * 100) + prev);
      }, 0);
    },
    totalNum() {
      const num = this.list.filter((item) => this.result.includes(item.id));
      const total = num.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return total;
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async del() {
      console.log(this.$Toast);
      if (this.result.length === 0) {
        this.$Toast('你没有选中商品');
        return;
      }
      try {
        await this.$Dialog.confirm({ message: '您是否要删除已选中商品' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -this.counterMap[id] });
        });
        this.list = this.list.filter(
          (item) => {
            const len = this.result.findIndex(
              (x) => x === item.id,
            );
            if (len === -1) {
              return true;
            }
            this.result.splice(len, 1);
            return false;
          },
        );
        if (this.list.length === 0) {
          this.checked = false;
        }
      } catch (error) {
        this.$Toast('用户点击了取消');
      }
    },
    async getShopList() {
      const result = Object.keys(this.counterMap);
      const value = await this.$axios.getShop(result.join());
      this.list = value.list;
      console.log(value);
      console.log(this.result);
    },
    onSubmit() {

    },
    checkAll() {
      if (!this.$refs.checkboxGroup) {
        this.$Toast('购物车没有任何有效商品');
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  created() {
    this.getShopList();
    console.log('===');
  },
};
</script>

<style lang="less" scoped>
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .shopping {
    background: rgb(255, 255, 255);
    min-height: 100vh;
  }
  .card-none {
    width: 100%;
    position: absolute;
    top: 46px;
    img {
      width: 100%;
    }
  }
  .card-list {
    width: 100%;
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
    display: flex;
    justify-content: center;
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
    }
  }
</style>

<style>
.shopping > .van-submit-bar {
  bottom: 50px;
}
</style>
