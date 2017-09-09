var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 企业列表 */
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

/* 筛选企业列表 */
router.get('/companies/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var args = '';
    axios.all([getCompanies(args)]).then(axios.spread(function(companies) {
        var data = {};
        data.ids = ids;
        data.pageinfo = companies.data.response.data.Company_condition;
        data.companies = companies.data.response.data.Companys;
        res.render('companies', data);
    }));
});

/* 企业首页 */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComCars(id), getComNews(id)]).then(axios.spread(function(company, comCars, comNews) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.comCars = comCars.data.response.data.Cars;
        data.comNews = comNews.data.response.data.Article;
        res.render('company', data);
    }));
});

/* 获取企业库数据 */
function getCompanies(args) {
    var url = 'http://ev.cpkso.com/ev/company_search' + args;
    return axios.get(url);
}   

/* 获取企业首页数据 */
function getCompany(id) {
    var url = 'http://ev.cpkso.com/ev/company_singleById?company.id=' + id;
    return axios.get(url);
}

function getComCars(id) {
    var url = 'http://ev.cpkso.com/ev/car_findByCompanyIdF?company_id=' + id;
    return axios.get(url);
}

function getComNews(id) {
    var url = 'http://ev.cpkso.com/ev/article_findByCompanyId?company_id=' + id;
    return axios.get(url);
}

module.exports = router;