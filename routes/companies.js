var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
    var ids = ['0','0'];
    var args = '';
    axios.all([getCompanies(args)]).then(axios.spread(function(companies) {
        var data = {};
        data.ids = ids;
        data.pageinfo = companies.data.response.data.Company_condition;
        data.companies = companies.data.response.data.Companys;
        res.render('companies', data);
    }));
});

router.get('/companies/search/:str', function(req, res, next) {
    var ids = ['0','0'];
    var args = '';
    axios.all([getCompanies(args)]).then(axios.spread(function(companies) {
        var data = {};
        data.ids = ids;
        data.pageinfo = companies.data.response.data.Company_condition;
        data.companies = companies.data.response.data.Companys;
        res.render('companies', data);
    }));
});

// router.get('/:id', function(req, res, next) {
//     var id = req.params.id;
//     axios.all([getCar(id), getParams(), getPromo8()]).then(axios.spread(function(car, params, promo8) {
//         var data = {};
//         data.id = id;
//         data.car = car.data.response.data.Car;
//         data.promo8 = promo8.data.response.data.PlaceCars;
//         res.render('car', data);
//     }));
// });

/* 车型库 */
function getCompanies(args) {
    var url = 'http://ev.cpkso.com/ev/company_search' + args;
    return axios.get(url);
}   

/* 车型详情页 */
// function getCar(id) {
//     var url = 'http://ev.cpkso.com/car_singleById?car.id=' + id;
//     return axios.get(url);
// }

// function getParams() {
//     return axios.get('http://ev.cpkso.com/param_findParamTables');
// }

// function getPromo8() {
//     return axios.get('http://ev.cpkso.com/placeCar_findByAdsUniqueId?ads_unique_id=CDET');
// }

module.exports = router;