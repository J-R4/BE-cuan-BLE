const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()
const axios = require('axios')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const fetchApi = async (req, res) => {
  try {
    const symbol = req.params.symbol

    let api = await axios({
      method: 'get',
      url: `http://api.marketstack.com/v1/eod?access_key=a3973ebb793d184e80baa05ca8d7bb33&symbols=${symbol}`
    })
      
    if(api) {
      res.status(200).json(api.data)      
    } else {
      res.status(404).json({message: 'Data not found'})
    }
  } catch (err) {
    res.status(500).json({message: err})
  }
}

app.use('/:symbol', fetchApi)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})