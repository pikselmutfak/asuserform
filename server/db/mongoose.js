const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://persona:0AyjpAPOj6t47CCZOQoH9WRSf0IcUL9iikN3FI4Is0Y29eNSL8MNePU3mW4AfNEq0wHKWLK6VAf1UaOEXMAfHg==@persona.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@persona@', {
    useNewUrlParser: true,
    socketTimeoutMS: 5000,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.catch((err) => {
    console.log({err})
})

module.exports = {mongoose}