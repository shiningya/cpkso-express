var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    axios.all([getSliders(), getBanners()]).then(axios.spread(function(sliders, banners) {
        var data = {};
        data.sliders = sliders.data.response.data.PlaceCars;
        data.banners = banners.data.response.data.PlaceCars;
        // data.hotCar = hotCar.data.response.data.PlaceCars;
        // data.hotCar = hotCar.data.response.data.PlaceCars;
        // data.newCar = newCar.data.response.data.PlaceCars;
        // data.dsCar = dsCar.data.response.data.PlaceCars;
        // data.cyCar = cyCar.data.response.data.PlaceCars;
        res.render('users', data)
    }));
});

function getSliders() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=A01');
}

function getBanners() {
    return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=A02');
}
// function getHotCar() {
//   return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=HOT');
// }
// function getHotCar() {
//   return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=HOT');
// }
// function getNewCar() {
//   return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=NEW');
// }
// function getdsCar() {
//   return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=DSCX');
// }
// function getcyCar() {
//   return axios.get('http://ev.cpkso.com/ev/placeCar_findByAdsUniqueId?ads_unique_id=CYCX');
// }

module.exports = router;