var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get(['/',/^(\/index)/], function(req, res, next) {
    axios.all([getSliders(), getBanners(), getNewsG(), getNewCar(), getNewParts(), getCarRequire(), getPartsRequire(), getCarRequirePic(), getPartsRequirePic(), getNewsN(), getNewsB(), getShows(), getVips(), getPromo1(), getPromo2()])
        .then(axios.spread(function(sliders, banners, newsG, newCar, newParts, carReq, partsReq, carReqPic, partsReqPic, newsN, newsB, shows, vips, promo1, promo2) {
            var data = {};
            data.curnav = 'index';
            data.sliders = sliders.data.response.data.PlaceCars;
            data.banners = banners.data.response.data.PlaceCars;
            data.newsG = newsG.data.response.data.PlaceArts;

            data.newCar = newCar.data.response.data.PlaceCars;
            data.newParts = newParts.data.response.data.PlacePartss;

            data.carReq = carReq.data.response.data.Requires;
            data.partsReq = partsReq.data.response.data.Requires;
            data.carReqPic = carReqPic.data.response.data.Requires;
            data.partsReqPic = partsReqPic.data.response.data.Requires;

            data.newsN = newsN.data.response.data.Articles;
            data.newsB = newsB.data.response.data.Articles;
            data.shows = shows.data.response.data.PlaceCompanyMutPics;
            data.vips = vips.data.response.data.PlaceCompanys;
            data.promo1 = promo1.data.response.data.PlaceCompanys;
            data.promo2 = promo2.data.response.data.PlaceCompanys;

            res.render('index', data);
        }));
});

function getSliders() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=A01');
}

function getBanners() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=A02');
}

function getNewsG() {
    return axios.get('http://localhost:8080/ev/placeArt_findByAdsUniqueId?ads_unique_id=D');
}

function getNewCar() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=NEW');
}

function getNewParts() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=INDNEWP');
}

function getCarRequire() {
    return axios.get('http://localhost:8080/ev/require_listByTenderI?require.category.type=1');
}

function getPartsRequire() {
    return axios.get('http://localhost:8080/ev/require_listByTenderI?require.category.type=2');
}

function getCarRequirePic() {
    return axios.get('http://localhost:8080/ev/require_listByTypeI?require.category.type=1');
}

function getPartsRequirePic() {
    return axios.get('http://localhost:8080/ev/require_listByTypeI?require.category.type=2');
}

function getNewsN() {
    return axios.get('http://localhost:8080/ev/article_search_front');
}

function getNewsB() {
    return axios.get('http://localhost:8080/ev/article_search_brand?articleCondition.artCt.id=7');
}

function getShows() {
    return axios.get('http://localhost:8080/ev/placeCompanyMutPic_findByAdsUniqueId?ads_unique_id=Q');
}

function getVips() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=MIVIP');
}

function getPromo1() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=AT01');
}

function getPromo2() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=AT02');
}

module.exports = router;