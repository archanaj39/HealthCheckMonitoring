var mongoose = require('mongoose'); 

var  ApplicationDataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    discription: String,
    checkType: String,
    host:String
  }, {collection: 'applicationDeatils'});


// Export the model
module.exports = mongoose.model('ApplicationData', ApplicationDataSchema); 
