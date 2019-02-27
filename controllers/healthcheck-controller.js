// Require mongoose
let mongoose = require('mongoose')
let ApplicationData = require('../models/healthcheckmodel');
const { each } = require('lodash')


// Save details
exports.save = (req, res, next) => {
  let item = new ApplicationData({
    name: req.body.name,
    discription: req.body.discription,
    checkType: req.body.checkType,
    host: req.body.host
  });

  console.log(item);
  item.save();

  // Redirect back to form
  res.redirect('/')
}
var list = function datalist(callback) {
  ApplicationData.find()
    .then(function (data) {
      callback(null, data);
    });
};
exports.alllist = list;
// Get Details 
exports.detail_list = function detail_list(req, res, next) {
  list(function (err, data) {
    req.items = data
    next();
  });
};





