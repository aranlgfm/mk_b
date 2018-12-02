const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cors());

// router
var lines = require('./lines');
app.use('/lines', lines);

// app.get('/', (req, res) => {
// 	res.send('nothing');
// });

app.listen(3500, () => {
	console.log('server start');
});