const axios = require('axios')

class Controller {
  static fetchApi = async (req, res) => {
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
}

module.exports = Controller