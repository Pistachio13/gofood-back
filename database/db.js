const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://gofood:gofood@gofood.rx60b8f.mongodb.net/gofood'

const mongoDBConfig = {
    autoIndex: true,
    useNewUrlParser: true
}

mongoose.set('strictQuery', false)

async function connectDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, mongoDBConfig)
        console.log('Connected MongoDB')
        const fetch_data = await mongoose.connection.db.collection('foodItem')
        fetch_data.find({}).toArray(async (err, data) => {
            const foodCategory = await mongoose.connection.db.collection('foodCategory')
            foodCategory.find({}).toArray((err, catData) => {
                if (err) {
                    console.log(err)
                } else {
                    global.foodItem = data
                    global.foodCategory = catData
                }
            })
            /* if (err) {
                console.log(err)
            } else {
                global.foodItem = data
                console.log(global.foodItem)
            } */
        })

    } catch (err) {
        console.log('Error connecting to database', err)
    }

}

module.exports = connectDatabase