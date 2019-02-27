const { each } = require('lodash')
const pingHealthCheck = require('../utils/pingHealthCheck')
const httpHealthCheck = require('../utils/urlHealthCheck')
const heathcheckcontroller = require('../controllers/healthcheck-controller') 
const logger = require('../utils/logger') 
const config = require('../config.local')
 

const { loopTime } = config
const HealthCheckContainer = []
exports.runHealthChecks=function runHealthChecks(start,callback) { 
	heathcheckcontroller.alllist(function (err, data) { 
		each(data, item => {  
			switch (item.checkType) {
				case "http":
					HealthCheckContainer.push(httpHealthCheck(start, item))
					break
				//case "ping":
				//	HealthCheckContainer.push(pingHealthCheck(start, item))
				//	break
			}
		}) 
	});
 
	Promise.all(HealthCheckContainer).then((data) => {
		callback(null,data);
		console.log("onsuccess:" + (data)) 
	}).catch(error => {
		console.log('error', "Error Found :" + error)

	})

} 

 
 