const express = require('express')
const app = express()

app.use(express.static('views'));
app.get('/xxx', function (req, res) {
    res.send('Hello World!')
})

app.get('/', function (req, res) {
    res.send('views')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})