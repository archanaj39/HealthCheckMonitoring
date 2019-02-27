const https = require('https')
const http = require('http')
const time = require('./helper')
function makeHttpRequest(start, requestObj) {
  const httpMethod = https;
  const { host, port, path } = requestObj

  const promisifiedXhr = new Promise(function (resolve, reject) { 
    const request = httpMethod.get("https://"+host+"/", (res) => {
      const isStatusExpected = res.statusCode == 200; 
      const logz = { 
        name: requestObj.name,
        color: (JSON.stringify(res.statusCode) == 200) ? 'green' : 'red',
        host: requestObj.host,
        checkType: requestObj.checkType,
        status: JSON.stringify(res.statusCode),
        statusMessage: res.statusMessage,
        duration: time.mstoHMS(Date.now() - start) 
      } 
      resolve(logz)
     
    });
     
    function error(err) {
      const logz = {
        name: requestObj.name,
        color: (JSON.stringify(res.statusCode) == 200) ? 'green' : 'red',
        host: requestObj.host,
        checkType: requestObj.checkType,
        status: JSON.stringify(res.statusCode),
        statusMessage: res.statusMessage,
        duration: time.mstoHMS(Date.now() - start) 
      } 
      reject(logz)
    } 
    request.on('error', function (err) {
      return error(err)
    })
  }); 
  return promisifiedXhr
    .catch(err => { 
      console.log("catch Exception:"+err);
      return err
    })
}

module.exports = makeHttpRequest
