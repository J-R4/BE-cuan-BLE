const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()
const router = require('./routes')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})