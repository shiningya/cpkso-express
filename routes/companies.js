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
router.get('/:id/', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComProds(id), getComNews(id)]).then(axios.spread(function(company, comProds, comNews) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.comProds = comProds.data.response.data.Cars?comProds.data.response.data.Cars:comProds.data.response.data.Partss;
        data.comNews = comNews.data.response.data.Article;
        res.render('company', data);
    }));
});

router.get('/:id/intro', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id)]).then(axios.spread(function(company) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        res.render('intro', data);
    }));
});

router.get('/:id/products', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComProds(id)]).then(axios.spread(function(company, comProds) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.comProds = comProds.data.response.data.Cars?comProds.data.response.data.Cars:comProds.data.response.data.Partss;
        res.render('products', data);
    }));
});

router.get('/:id/trend', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComNews(id)]).then(axios.spread(function(company, comNews) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.comNews = comNews.data.response.data.Article;
        res.render('trend', data);
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

function getComProds(id) {
    var url = 'http://ev.cpkso.com/ev/car_findByCompanyIdF?company_id=' + id;
    return axios.get(url);
}

function getComNews(id) {
    var url = 'http://ev.cpkso.com/ev/article_findByCompanyId?company_id=' + id;
    return axios.get(url);
}

module.exports = router;