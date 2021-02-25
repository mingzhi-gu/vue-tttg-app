<template>
  <div class="oneBar">
      <router-link class="searchBar" tag="div" :to="{name: 'Search'}">
          <van-icon name="search" />
          <span>搜索</span>
      </router-link>
      <topbar />
      <template v-if="loading">
        <van-loading type="spinner" size="1rem" color="#0094ff" vertical/>
      </template>
      <twobar />
      <goods-list />

  </div>
</template>

<script>
import topbar from '@/components/topbar.vue';
import twobar from '@/views/page/TwoBar.vue';
import goodsList from '@/components/goodsList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    topbar,
    twobar,
    goodsList,
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>

<style lang="less" scoped>
    .oneBar{
         width: 100%;
  min-height: 100vh;
  position: absolute;
  font-size: 14px;
        .searchBar{
            width: 355px;
            height: 33px;
            line-height: 33px;
            background-color: #eee;
            margin-top: 11px;
            margin: 11px auto 0;
            font-size: 14px;
            color: #a1a1a1;
            border-radius: 20px;
            text-align: center;
            >*{
                vertical-align: middle;
            }
        }

    }
</style>
