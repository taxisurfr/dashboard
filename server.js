const express = require('express')
const app = express()

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

app.use(express.static('views'));
app.get('/xxx', function (req, res) {
    res.send('Hello World!')
})

app.get('/', function (req, res) {
    res.send('views')
})

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);



