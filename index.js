const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile( __dirname + '/public/html/Page1.html')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
