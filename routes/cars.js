var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
    var ids = ['0','0','0','0','0','0'];
    var args = '';
    axios.all([getBrandList(), getCars(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6(), getPromo7()]).then(axios.spread(function(brands, cars, promo1, promo2, promo3, promo4, promo5, promo6, promo7) {
        var data = {};
        data.ids = ids;
        data.brands = brands.data.response.data;
        data.cars = cars.data.response.data.Cars;
        data.pageinfo = cars.data.response.data.Car_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceArts;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceArts;
        data.promo6 = promo6.data.response.data.PlaceArts;
        data.promo7 = promo7.data.response.data.PlaceCars;
        res.render('cars', data);
    }));
});

router.get('/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var args = '?';
    if (ids[0] !== '0') {
        args += 'carCondition.category_id=' + ids[0] + '&';
    };
    if (ids[1] !== '0') {
        args += 'carCondition.brand.id=' + ids[1] + '&';
    };
    if (ids[2] !== '0') {
        args += 'carCondition.price=' + ids[2] + '&';
    };
    if (ids[3] !== '0') {
        args += 'carCondition.mile=' + ids[3] + '&';
    };
    if (ids[4] !== '0') {
        args += 'carCondition.energy_type=' + ids[4] + '&';
    };
    if (ids[5] !== '0') {
        args += 'carCondition.level=' + ids[5];
    };
    console.log(args);
    axios.all([getBrandList(), getCars(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6(), getPromo7()]).then(axios.spread(function(brands, cars, promo1, promo2, promo3, promo4, promo5, promo6, promo7) {
        var data = {};
        data.ids = ids;
        data.brands = brands.data.response.data;
        data.cars = cars.data.response.data.Cars;
        data.pageinfo = cars.data.response.data.Car_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceArts;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceArts;
        data.promo6 = promo6.data.response.data.PlaceArts;
        data.promo7 = promo7.data.response.data.PlaceCars;
        res.render('cars', data);
    }));
});

function getBrandList() {
    return axios.get('http://ev.cpkso.com/ev/brand_listByInital');
}

function getCars(args) {
    var url = 'http://ev.cpkso.com/ev/car_search' + args;
    return axios.get(url);
}

function getPromo1() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR01');
}

function getPromo2() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN01');
}

function getPromo3() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN02');
}

function getPromo4() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR02');
}    

function getPromo5() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN03');
}

function getPromo6() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN04');
}

function getPromo7() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR03');
}    

module.exports = router;