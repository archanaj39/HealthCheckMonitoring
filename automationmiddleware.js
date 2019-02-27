const healthcheck = require('./controllers/automation-controller')
const config = require('./config.local')
const logger = require('./utils/logger') 
const { appPort, loopTime } = config 

 
module.exports=function startLoop() {
  const start = Date.now()
  setInterval(() => healthcheck.runHealthChecks(start,function(){}), loopTime)
  //healthcheck.runHealthChecks(start,function(err,data){})
 }

function stopLoop() {
 // clearInterval(looper)
}

 
