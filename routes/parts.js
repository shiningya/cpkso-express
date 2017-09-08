var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
    var args = '';
    axios.all([getParts(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6()]).then(axios.spread(function(parts, promo1, promo2, promo3, promo4, promo5, promo6) {
        var data = {};
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

router.get('/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var id = ids[0];
    var args = '';
    axios.all([getParts(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6()]).then(axios.spread(function(parts, promo1, promo2, promo3, promo4, promo5, promo6) {
        var data = {};
        data.id = id;
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


router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    axios.all([getPart(id), getPromo8()]).then(axios.spread(function(part, promo8) {
        var data = {};
        data.id = id;
        data.part = part.data.response.data.Parts;
        data.promo8 = promo8.data.response.data.PlacePartss;
        res.render('part', data);
    }));
});

/* 配件库 */
function getParts(args) {
    var url = 'http://ev.cpkso.com/ev/parts_search' + args;
    return axios.get(url);
}

function getPromo1() {
    return axios.get('http://ev.cpkso.com/ev/placeParts_findByAdsUniqueId?ads_unique_id=PL01');
}

function getPromo2() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN01');
}

function getPromo3() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN02');
}

function getPromo4() {
    return axios.get('http://ev.cpkso.com/ev/placeParts_findByAdsUniqueId?ads_unique_id=PL02');
}

function getPromo5() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN03');
}

function getPromo6() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN04');
}

/* 配件详情页 */
function getPart(id) {
    var url = 'http://ev.cpkso.com/parts_singleById?parts.id=' + id;
    return axios.get(url);
}

function getPromo8() {
    return axios.get('http://ev.cpkso.com/ev/placeParts_findByAdsUniqueId?ads_unique_id=PDET');
}

module.exports = router;