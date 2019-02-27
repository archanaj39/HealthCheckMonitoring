const ping = require('ping')

function makePingRequest(start,requestObj ) { 
  const promisifiedXhr = new Promise(function (resolve, reject) { 
    const pingResponse = ping.promise.probe("172.217.16.68")

    function success(response) {
      
      const alivestatus = response.alive 
      const logz = { 
          name: requestObj.name,
          color: alivestatus ? 'green':'red',
          host:requestObj.host,
          checkType: requestObj.checkType,
          status: alivestatus ? 'Alive' : 'Dead', 
          duration: time.mstoHMS(Date.now() - start) 
      }  
      resolve(logz);
    }
    function failure() {  
   
      const logz = { 
          name: requestObj.name,
          color: 'red',
          host:requestObj.host,
          checkType: requestObj.checkType,
          status: 'Dead', 
          duration: time.mstoHMS(Date.now() - start)
      }  
      resolve(logz);
  
    }
    pingResponse.then(success).catch(failure)
  })
  return promisifiedXhr
  .catch(err => { 
    console.log("catch Exception:"+err);
    return err
  })
}

module.exports = makePingRequest
