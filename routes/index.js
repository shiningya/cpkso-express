var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get(['/',/^(\/index)/], function(req, res, next) {
    axios.all([getSliders(), getBanners(), getNewsG(), getHotCar(), getNewCar(), getdsCar(), getcyCar(), getNewParts(), getHotParts(), getStandard(), getAuxiliary(), getCarBody(), getElectric(), getSteering(), getUnderpan(), getSealing(), getInterior(), getCarRequire(), getPartsRequire(), getCarRequirePic(), getPartsRequirePic(), getShows(), getPromo1(), getPromo2(), getPromo3()])
        .then(axios.spread(function(sliders, banners, newsG, hotCar, newCar, dsCar, cyCar, newParts, hotParts, standard, auxiliary, carBody, electric, steering, underpan, sealing, interior, carReq, partsReq, carReqPic, partsReqPic, shows, promo1, promo2, promo3) {
            var data = {};
            data.curnav = 'index';
            data.sliders = sliders.data.response.data.PlaceCars;
            data.banners = banners.data.response.data.PlaceCars;
            data.newsG = newsG.data.response.data.PlaceArts;

            data.hotCar = hotCar.data.response.data.PlaceCars;
            data.newCar = newCar.data.response.data.PlaceCars;
            data.dsCar = dsCar.data.response.data.PlaceCars;
            data.cyCar = cyCar.data.response.data.PlaceCars;

            data.newParts = newParts.data.response.data.PlacePartss;
            data.hotParts = hotParts.data.response.data.PlacePartss;
            data.standard = standard.data.response.data.PlacePartss;
            data.auxiliary = auxiliary.data.response.data.PlacePartss;
            data.carBody = carBody.data.response.data.PlacePartss;
            data.electric = electric.data.response.data.PlacePartss;
            data.steering = steering.data.response.data.PlacePartss;
            data.underpan = underpan.data.response.data.PlacePartss;
            data.sealing = sealing.data.response.data.PlacePartss;
            data.interior = interior.data.response.data.PlacePartss;

            data.carReq = carReq.data.response.data.Requires;
            data.partsReq = partsReq.data.response.data.Requires;
            data.carReqPic = carReqPic.data.response.data.Requires;
            data.partsReqPic = partsReqPic.data.response.data.Requires;
            data.shows = shows.data.response.data.PlaceCompanyMutPics;
            data.promo1 = promo1.data.response.data.PlaceCompanys;
            data.promo2 = promo2.data.response.data.PlaceCompanys;
            data.promo3 = promo3.data.response.data.PlaceCompanys;
            res.render('index', data)
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

function getHotCar() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=HOT');
}

function getNewCar() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=NEW');
}

function getdsCar() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=DSCX');
}

function getcyCar() {
    return axios.get('http://localhost:8080/ev/placeCar_findByAdsUniqueId?ads_unique_id=CYCX');
}

function getNewParts() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=INDNEWP');
}

function getHotParts() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=INDHOTP');
}

function getStandard() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND6');
}

function getAuxiliary() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND7');
}

function getCarBody() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND8');
}

function getElectric() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND9');
}

function getSteering() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND10');
}

function getUnderpan() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND11');
}

function getSealing() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND12');
}

function getInterior() {
    return axios.get('http://localhost:8080/ev/placeParts_findByAdsUniqueId?ads_unique_id=IND13');
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

function getShows() {
    return axios.get('http://localhost:8080/ev/placeCompanyMutPic_findByAdsUniqueId?ads_unique_id=Q');
}

function getPromo1() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=AT01');
}

function getPromo2() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=AT02');
}

function getPromo3() {
    return axios.get('http://localhost:8080/ev/placeCompany_findByAdsUniqueId?ads_unique_id=AT03');
}

module.exports = router;