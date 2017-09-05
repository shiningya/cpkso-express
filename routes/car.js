var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    axios.all([getBanner(), getNews(), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news', data);
    }));
});

router.get('/xinche/', function(req, res) {
    axios.all([getBanner(), getNews2(1), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/xinche', data);
    }));
});

router.get('/jishu/', function(req, res) {
    axios.all([getBanner(), getNews2(2), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/jishu', data);
    }));
});

router.get('/hangye/', function(req, res) {
    axios.all([getBanner(), getNews2(3), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/hangye', data);
    }));
});

router.get('/zhengce/', function(req, res) {
    axios.all([getBanner(), getNews2(4), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/zhengce', data);
    }));
});

router.get('/daogou/', function(req, res) {
    axios.all([getBanner(), getNews2(5), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/daogou', data);
    }));
});

router.get('/yongche/', function(req, res) {
    axios.all([getBanner(), getNews2(6), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/yongche', data);
    }));
});

router.get('/pinpai/', function(req, res) {
    axios.all([getBanner(), getNews2(7), getPromo1(), getPromo2(), getPromo3(), getPromo4(), getPromo5()]).then(axios.spread(function(banner, news, promo1, promo2, promo3, promo4, promo5) {
        var data = {};
        data.banner = banner.data.response.data.PlaceArts;
        data.news = news.data.response.data.Articles;
        data.pageinfo = news.data.response.data.Article_condition;
        data.promo1 = promo1.data.response.data.PlaceCars;
        data.promo2 = promo2.data.response.data.PlaceArts;
        data.promo3 = promo3.data.response.data.PlaceCars;
        data.promo4 = promo4.data.response.data.PlaceCars;
        data.promo5 = promo5.data.response.data.PlaceCars;
        res.render('news/pinpai', data);
    }));
});

// router.get('/admin', function(req, res){
//     res.send('admin page');
// });
function getBanner() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=Z01');
}

function getNews() {
    return axios.get('http://ev.cpkso.com/ev/article_search');
}

function getNews2(id) {
    var url = 'http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=' + id;
    return axios.get(url);
}

// function getPage(page) {
//     var url = 'http://ev.cpkso.com/article_skipPage?articleCondition.pageNo=' + page;
//     console.log(url);
//     axios.get(url).then(function(response){
//         console.log(response);
//     })
// }

// function getHangye() {
//     return axios.get('http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=3');
// }

// function getZhengce() {
//     return axios.get('http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=4');
// }

// function getDaogou() {
//     return axios.get('http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=5');
// }

// function getYongche() {
//     return axios.get('http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=6');
// }

// function getPinpai() {
//     return axios.get('http://ev.cpkso.com/ev/article_search?articleCondition.artCt.id=7');
// }

function getPromo1() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=Z02');
}

function getPromo2() {
    return axios.get('http://ev.cpkso.com/ev/placeArt_findByAdsUniqueId?ads_unique_id=Z06');
}

function getPromo3() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=Z03');
}

function getPromo4() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=Z05');
}

function getPromo5() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=Z04');
}


module.exports = router;