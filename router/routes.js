let express = require('express')
let Route = express()
let data = require('../controllers/healthcheck-controller')

let automationdata = require('../controllers/automation-controller')

// Get index.hbs
Route.get('/', (req, res, next) => {
  res.render('./index') 
})
 
// Get healthcheck required data 
Route.get('/getdata', data.detail_list, function (req, res, next) {
  console.log(req.items);
  res.render('./MonitorData/applicationdetails', { items: req.items })
})
// Get healthcheck required data 
 
Route.get('/dashboard',function (req, res, next) { 
  res.render('./MonitorData/dashboard')
})
 
// Get adddata.hbs  
Route.get('/adddata', (req, res, next) => {
  res.render('./MonitorData/adddata')
})

// Post request for form data
Route.post('/adddata', data.save);

module.exports = Route
