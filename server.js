const express = require('express')
const app = express()

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.static('views'));
app.get('/xxx', function (req, res) {
    res.send('Hello World!')
})

app.get('/', function (req, res) {
    res.send('views')
})

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);



