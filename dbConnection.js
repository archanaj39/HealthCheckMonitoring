
 
// Require MongoDB
let mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Start connection
mongoose.connect('localhost:27017/MonitorData').then((e) => {
	console.log('Connected to MongoDB!')
}).catch((e) => {
	console.error('Failed to connect to MongoDB!')
})
