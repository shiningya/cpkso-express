var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 配件列表 */
router.get('/', function (req, res, next) {
  var args = '';
  axios.all([getParts(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6()]).then(axios.spread(function (parts, promo1, promo2, promo3, promo4, promo5, promo6) {
    var data = {};
    data.ids = ['0','0'];
    data.keyword = '';
    data.list = true;
    data.pageinfo = parts.data.response.data.Parts_condition;
    data.parts = parts.data.response.data.Partss;
    data.promo1 = promo1.data.response.data.PlacePartss;
    data.promo2 = promo2.data.response.data.PlaceArts;
    data.promo3 = promo3.data.response.data.PlaceArts;
    data.promo4 = promo4.data.response.data.PlacePartss;
    data.promo5 = promo5.data.response.data.PlaceArts;
    data.promo6 = promo6.data.response.data.PlaceArts;
    res.render('parts', data);
  }));
});

router.get('/list/:page', function (req, res, next) {
  var page = req.params.page;
  var args = '?partsCondition.pageNo=' + page;
  axios.all([getPage(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6()]).then(axios.spread(function (parts, promo1, promo2, promo3, promo4, promo5, promo6) {
    var data = {};
    data.keyword = '';
    data.list = true;
    data.pageinfo = parts.data.response.data.Parts_condition;
    data.parts = parts.data.response.data.Partss;
    data.promo1 = promo1.data.response.data.PlacePartss;
    data.promo2 = promo2.data.response.data.PlaceArts;
    data.promo3 = promo3.data.response.data.PlaceArts;
    data.promo4 = promo4.data.response.data.PlacePartss;
    data.promo5 = promo5.data.response.data.PlaceArts;
    data.promo6 = promo6.data.response.data.PlaceArts;
    res.render('parts', data);
  }));
});

/* 筛选配件列表 */
router.get('/search/:str', function (req, res, next) {
  var ids = req.params.str.split('-');
  var keyword = req.query.word || '';
  var id = ids[0];
  console.log(ids);
  var args = '?partsCondition.pageNo=' + ids[2] + '&';
  if (ids[0] !== '0') {
    args += 'partsCondition.category_id=' + ids[0] + '&';
    if (ids[1]!=='0') {
      args += 'partsCondition.ct2=' + ids[1] + '&';
    }
  };
  if (keyword) {
    var codeword = encodeURI(keyword);
    args += 'partsCondition.name=' + codeword;
  };
axios.all([getPage(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6()]).then(axios.spread(function (parts, promo1, promo2, promo3, promo4, promo5, promo6) {
    var data = {};
    data.id = id;
    data.keyword = keyword;
    data.ids = ids;
    data.pageinfo = parts.data.response.data.Parts_condition;
    data.parts = parts.data.response.data.Partss;
    data.promo1 = promo1.data.response.data.PlacePartss;
    data.promo2 = promo2.data.response.data.PlaceArts;
    data.promo3 = promo3.data.response.data.PlaceArts;
    data.promo4 = promo4.data.response.data.PlacePartss;
    data.promo5 = promo5.data.response.data.PlaceArts;
    data.promo6 = promo6.data.response.data.PlaceArts;
    res.render('parts', data);
  }));
});

/* 配件详情页 */
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  axios.all([getPart(id), getPromo8()]).then(axios.spread(function (part, promo8) {
    var data = {};
    data.id = id;
    data.keyword = '';
    data.part = part.data.response.data.Parts;
    data.promo8 = promo8.data.response.data.PlacePartss;
    res.render('part', data);
  }));
});

/* 获取配件库数据 */
function getParts(args) {
  var url = 'http://localhost:8080/ev/parts_search' + args;
  return axios.get(url);
}

function getPage(args) {
  var url = 'http://localhost:8080/ev/parts_skipPage' + args;
  console.log(url);
  return axios.get(url);
}

function getPromo1() {
  return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=PL01');
}

function getPromo2() {
  return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN01');
}

function getPromo3() {
  return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN02');
}

function getPromo4() {
  return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=PL02');
}

function getPromo5() {
  return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN03');
}

function getPromo6() {
  return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN04');
}

/* 获取配件数据 */
function getPart(id) {
  var url = 'http://localhost:8080/ev/parts_singleById?parts.id=' + id;
  return axios.get(url);
}

function getPromo8() {
  return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=PDET');
}

module.exports = router;