const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/StudentDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Add this option for the latest versions of Mongoose
        });
        console.log('Connection succeeded');
    } catch (err) {
        console.log('Error in connection ' + err);
    }
}

module.exports = connectToDatabase;