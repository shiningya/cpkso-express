var express = require('express');
var axios = require('axios');
var router = express.Router();

/* 企业列表 */
router.get('/', function(req, res, next) {
    var ids = ['0','0'];
    var args = '';
    axios.all([getCompanies(args)]).then(axios.spread(function(companies) {
        var data = {};
        data.list = true;
        data.ids = ids;
        data.pageinfo = companies.data.response.data.Company_condition;
        data.companies = companies.data.response.data.Companys;
        res.render('companies', data);
    }));
});

router.get('/list/:page', function (req, res, next) {
    var page = req.params.page;
    var ids = ['0','0'];
    var args = '?companyCondition.pageNo=' + page;
    axios.all([getPage(args)]).then(axios.spread(function(companies) {
        var data = {};
        data.list = true;
        data.ids = ids;
        data.pageinfo = companies.data.response.data.Company_condition;
        data.companies = companies.data.response.data.Companys;
        res.render('companies', data);
    }));
});  

/* 筛选企业列表 */
router.get('/search/:str', function(req, res, next) {
    var ids = req.params.str.split('-');
    var args = '?companyCondition.pageNo=' + ids[2];
    if (ids[0] !== '0') {
        args += '&companyCondition.province=' + ids[0];
    }
    if (ids[1]!=='0') {
        args += '&companyCondition.category_id=' + ids[1];
    }
    axios.all([getPage(args)]).then(axios.spread(function(companies) {
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
        data.prodsData = comProds.data.response.data;
        data.comNews = comNews.data.response.data.Articles;
        res.render('company', data);
    }));
});
/* 企业介绍 */
router.get('/:id/intro', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id)]).then(axios.spread(function(company) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        res.render('intro', data);
    }));
});
/* 供应产品 */
router.get('/:id/products', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComProds(id)]).then(axios.spread(function(company, comProds) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.prodsData = comProds.data.response.data;
        res.render('products', data);
    }));
});
/* 企业动态 */
router.get('/:id/trend', function(req, res, next) {
    var id = req.params.id;
    axios.all([getCompany(id), getComNews(id)]).then(axios.spread(function(company, comNews) {
        var data = {};
        data.id = id;
        data.company = company.data.response.data.Company;
        data.comNews = comNews.data.response.data.Articles;
        res.render('trend', data);
    }));
});

/* 获取企业库数据 */
function getCompanies(args) {
    var url = 'http://localhost:8080/ev/company_search' + args;
    return axios.get(url);
}   

/* 获取企业首页数据 */
function getCompany(id) {
    var url = 'http://localhost:8080/ev/company_singleById?company.id=' + id;
    return axios.get(url);
}

function getPage(args) {
    var url = 'http://localhost:8080/ev/company_skipPage' + args;
    return axios.get(url);
}
  
function getComProds(id) {
    var url = 'http://localhost:8080/ev/car_findByCompanyIdF?company_id=' + id;
    return axios.get(url);
}

function getComNews(id) {
    var url = 'http://localhost:8080/ev/article_findByCompanyId?company_id=' + id;
    return axios.get(url);
}

module.exports = router;