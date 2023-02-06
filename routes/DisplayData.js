const express = require('express')
const router = express.Router()

router.post('/foodData', (req, res) => {

    try {
        res.send([global.foodItem, global.foodCategory])
    } catch(err) {
        res.send('Server error')
        console.log(err)
    }
    
})

module.exports = router