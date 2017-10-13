var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 车型列表 */
router.get('/', function(req, res, next) {
    var ids = ['0','0','0','0','0','0'];
    var args = '';
    axios.all([getBrandList(), getCars(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6(), getPromo7()]).then(axios.spread(function(brands, cars, promo1, promo2, promo3, promo4, promo5, promo6, promo7) {
        var data = {};
        data.ids = ids;
        data.keyword = '';
        data.list = true;
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

router.get('/list/:page', function(req, res, next) {
    var page = req.params.page;
    var ids = ['0','0','0','0','0','0'];
    var args = '?carCondition.pageNo=' + page;
    axios.all([getBrandList(), getPage(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6(), getPromo7()]).then(axios.spread(function(brands, cars, promo1, promo2, promo3, promo4, promo5, promo6, promo7) {
        var data = {};
        data.list = true;
        data.keyword = '';
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

/* 筛选车型列表 */
router.get('/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var keyword = req.query.word || '';
    var args = '?carCondition.pageNo=' + ids[6] + '&';
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
        args += 'carCondition.level=' + ids[5] + '&';
    };
    if (keyword) {
        var codeword = encodeURI(keyword);
        args += 'carCondition.car_name=' + codeword;
    };
    axios.all([getBrandList(), getPage(args), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5(), getPromo6(), getPromo7()]).then(axios.spread(function(brands, cars, promo1, promo2, promo3, promo4, promo5, promo6, promo7) {
        var data = {};
        data.ids = ids;
        data.keyword = keyword;
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

/* 车型详情页 */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCar(id), getParams(), getPromo8()]).then(axios.spread(function(car, params, promo8) {
        var data = {};
        data.id = id;
        data.keyword = '';
        data.car = car.data.response.data.Car;
        data.promo8 = promo8.data.response.data.PlaceCars;
        res.render('car', data);
    }));
});

/* 获取车型库数据 */
function getBrandList() {
    return axios.get('http://localhost:8080/ev/brand_listByInital');
}

function getCars(args) {
    var url = 'http://localhost:8080/ev/car_search' + args;
    return axios.get(url);
}

function getPage(args) {
    var url = 'http://localhost:8080/ev/car_skipPage' + args;
    console.log(url);
    return axios.get(url);
}

function getPromo1() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR01');
}

function getPromo2() {
    return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN01');
}

function getPromo3() {
    return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN02');
}

function getPromo4() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR02');
}    

function getPromo5() {
    return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN03');
}

function getPromo6() {
    return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=CN04');
}

function getPromo7() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=LR03');
}   

/* 车型详情页 */
function getCar(id) {
    var url = 'http://localhost:8080/ev/car_singleById?car.id=' + id;
    return axios.get(url);
}

function getParams() {
    return axios.get('http://localhost:8080/ev/param_findParamTables');
}

function getPromo8() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=CDET');
}

module.exports = router;