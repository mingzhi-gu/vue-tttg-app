<template>
  <div class="search-wrapper">
     <div class="search-head">
            <van-icon name="arrow-left" class="arr-left"
            @click.stop="$router.goback()"></van-icon>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
        autofocus
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)">搜索</div>
        </template>
         <template #action v-else>
          <router-link tag="div" class="shop-car" id="shoping-card" to="/home/shopping">
            <van-icon name="shopping-cart-o" :badge="badge"/>
          </router-link>
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="searchList.length && showList">
      <van-list>
        <van-cell v-for="item in searchList" :key="item" :title="item" @click="onSearch(item)" >
          <template #title>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
       <div class="goods-card" v-if="!showList">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      >
      <Card v-for="(item, i) in list" :key="i"
        :id="item.id"
        :title="item.title"
        :desc="item.desc"
        :tags="item.tags"
        :price="item.price"
        :price_off="item.price_off"
        :num="counterMap[item.id]"
        :image="item.images[0]"
        ></Card>
    </van-list>
    </div>
    <div class="history" v-if="searchList.length <= 0 && showList">
       <History :hisList="hisList" @search="onSearch"></History>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/card.vue';
import History from '@/components/history.vue';

export default {
  components: {
    Card,
    History,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      showList: true,
      timer: null,
      searchList: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      total: 0,
      hisList: [],

    };
  },
  methods: {
    addCounter() {

    },
    async onLoad() {
      if (this.finished) {
        return;
      }
      const value = await this.$axios.getSearch(this.value, this.page, this.size);
      this.list = [...this.list, ...value.list];
      this.loading = false;
      this.total = value.total;
      if (this.list.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    onSearch(val) {
      this.showList = false;
      if (val) {
        this.value = val;
      } else {
        this.value = this.place;
      }
      this.page = 1;
      this.finished = false;
      this.list = [];
      this.onLoad();
      const result = this.hisList.find((item) => this.value === item.value);
      if (result) {
        result.time = new Date().getTime();
        this.hisList.sort((a, b) => b.time - a.time);
      } else {
        this.hisList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.hisList.length >= 11) {
          this.hisList.pop();
        }
      }
      localStorage.setItem('hisList', JSON.stringify(this.hisList));
    },
    input() {
      if (!this.value) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.showList = true;
      this.timer = setTimeout(async () => {
        const value = await this.$axios.getLikeSearch(this.value);
        this.searchList = value.result;
        console.log(this.searchList);
        clearTimeout(this.timer);
      }, 300);
    },
    focus() {
      this.showList = true;
    },
    formatHTML(value) {
      const reg = new RegExp(this.value, 'g');
      return value.replace(reg, this.value.fontcolor('red'));
    },
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
  created() {
    this.hisList = JSON.parse(localStorage.getItem('hisList')) || [];
  },
};
</script>

<style lang="less">
    .search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
  }
  .like-search {
    top: 50px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
   .goods-card {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
