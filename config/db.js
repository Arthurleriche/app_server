const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/familygang'


const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true  } )
        console.log("mongoDb connected")
    } catch(err) {
        console.log(err.message)
        // exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB