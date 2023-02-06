const express = require('express')
const app = express()
const port = 5000
const connectDatabase = require('./database/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')
const DisplayData = require('./routes/DisplayData')

connectDatabase()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', UserRoutes)
app.use('/display', DisplayData)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})