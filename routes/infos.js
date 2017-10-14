var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 供求信息列表 */
router.get('/', function(req, res, next) {
    var ids = ['0','0'];
    var args = '';
    axios.all([getProvinces(),getInfos(args),getPromo()]).then(axios.spread(function(provinces,infos,promo) {
        var data = {};
        data.list = true;
        data.ids = ids;
        data.provinces = provinces.data.response.data;
        data.pageinfo = infos.data.response.data.Require_condition;
        data.infos = infos.data.response.data.Requires;
        data.promo = promo.data.response.data.PlaceCars;
        res.render('infos', data);
    }));
});

router.get('/list/:page', function (req, res, next) {
    var page = req.params.page;
    var ids = ['0','0'];
    var args = '?requireCondition.pageNo=' + page;
    axios.all([getProvinces(),getPage(args),getPromo()]).then(axios.spread(function(provinces,infos,promo) {
        var data = {};
        data.list = true;
        data.ids = ids;
        data.provinces = provinces.data.response.data;
        data.pageinfo = infos.data.response.data.Require_condition;
        data.infos = infos.data.response.data.Requires;
        data.promo = promo.data.response.data.PlaceCars;
        res.render('infos', data);
    }));
});  

/* 筛选供求信息列表 */
router.get('/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var args = '?requireCondition.pageNo=' + ids[2];
    if (ids[0] !== '0') {
        args += '&province=' + ids[0];
    }
    if (ids[1]!=='0') {
        args += '&require.category.type=' + ids[1];
    }
    axios.all([getProvinces(),getPage(args),getPromo()]).then(axios.spread(function(provinces,infos,promo) {
        var data = {};
        data.ids = ids;
        data.provinces = provinces.data.response.data;
        data.pageinfo = infos.data.response.data.Require_condition;
        data.infos = infos.data.response.data.Requires;
        data.promo = promo.data.response.data.PlaceCars;
        res.render('infos', data);
    }));
});

/* 供求信息详情 */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    axios.all([getInfo(id), getOffers(id), getPromo()]).then(axios.spread(function(info, offers, promo) {
        var data = {};
        data.id = id;
        data.info = info.data.response.data.Require;
        data.offers = offers.data.response.data.Offers;
        data.promo = promo.data.response.data.PlaceCars;
        res.render('info', data);
    }));
});

/* 获取供求信息数据 */
function getInfos(args) {
    var url = 'http://localhost:8080/ev/require_search' + args;
    return axios.get(url);
}   

function getProvinces() {
    var url = 'http://localhost:8080/ev/province_listByInitial';
    return axios.get(url);
}

function getPage(args) {
    var url = 'http://localhost:8080/ev/require_skipPage' + args;
    return axios.get(url);
}
  
  function getPromo() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=RQU');
}   

/* 获取供求信息详情数据 */
function getInfo(id) {
    var url = 'http://localhost:8080/ev/require_singleById?require.id=' + id;
    return axios.get(url);
}

function getOffers(id) {
    var url = 'http://localhost:8080/ev/offer_findByRequire?require_id=' + id;
    return axios.get(url);
}

module.exports = router;