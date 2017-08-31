var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.all([getHotCar(), getNewCar(), getdsCar(), getcyCar()]).then(axios.spread(function (hotCar, newCar, dsCar, cyCar){
    var data = {};
    console.log(dsCar);
    data.hotCar = hotCar.data.response.data.PlaceCars;
    data.newCar = newCar.data.response.data.PlaceCars;
    data.dsCar = dsCar.data.response.data.PlaceCars;
    data.cyCar = cyCar.data.response.data.PlaceCars;
    res.render('users', data)
  }));
});

function getHotCar() {
  return axios.get('http://localhost:8080/cpkso/ev/placeCar_findByAdsUniqueId?ads_unique_id=HOT');
}
function getNewCar() {
  return axios.get('http://localhost:8080/cpkso/ev/placeCar_findByAdsUniqueId?ads_unique_id=NEW');
}
function getdsCar() {
  return axios.get('http://localhost:8080/cpkso/ev/placeCar_findByAdsUniqueId?ads_unique_id=DSCX');
}
function getcyCar() {
  return axios.get('http://localhost:8080/cpkso/ev/placeCar_findByAdsUniqueId?ads_unique_id=CYCX');
}

module.exports = router;
