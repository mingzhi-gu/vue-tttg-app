import Axios from 'axios';

const request = Axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'mingzhi_1612773985649',
  },
});

request.interceptors.response.use((res) => res.data);
const getTwoList = (type) => request.get('/getsidebar', { params: { type } });
const getGoodsList = (type, page, size, sort) => request.get('/getGoodsList', {
  params: {
    type, page, size, sort,
  },
});
const getLikeSearch = (likeValue) => request.get('/likeSearch', { params: { likeValue } });
const getSearch = (type, page, size) => request.get('/search', { params: { type, page, size } });
const getShop = (value) => request.get('/getGoodsByIds', { params: { value } });

export default {
  getTwoList,
  getGoodsList,
  getLikeSearch,
  getSearch,
  getShop,
};
