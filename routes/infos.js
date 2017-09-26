var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 供求信息列表 */
router.get('/', function(req, res, next) {
    var ids = ['0','0'];
    var args = '';
    axios.all([getInfos(args),getPromo()]).then(axios.spread(function(infos,promo) {
        var data = {};
        data.ids = ids;
        data.pageinfo = infos.data.response.data.Require_condition;
        data.infos = infos.data.response.data.Requires;
        data.promo = promo.data.response.data.PlaceCars;
        res.render('infos', data);
    }));
});

/* 筛选供求信息列表 */
router.get('/infos/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var args = '';
    axios.all([getInfos(args),getPromo()]).then(axios.spread(function(infos,promo) {
        var data = {};
        data.ids = ids;
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

function getPromo() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=RQU');
}   

/* 获取企业首页数据 */
function getInfo(id) {
    var url = 'http://localhost:8080/ev/require_singleById?require.id=' + id;
    return axios.get(url);
}

function getOffers(id) {
    var url = 'http://localhost:8080/ev/offer_findByRequire?require_id=' + id;
    return axios.get(url);
}

module.exports = router;