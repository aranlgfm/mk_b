const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const dbConn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dkfks0424',
	database: 'write-toy',
});

dbConn.connect(err => {
	if (err) {
		return err;
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: '238834787845-c6cie097d1fbum8ivsdbt2puh1b4jal6.apps.googleusercontent.com',
        clientSecret: 'qtc2LsyhPgxJIgwUVRkSFeSv',
		callbackURL: 'http://localhost:3500/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
			user = profile;
			console.log(profile+'<<<<<>>>>>>>'+user);
			
			// const INSERT_USER = `INSERT INTO user(user_id, user_password, user_status) VALUES('${userId}', '${userPw}', '${userTy}')`;
			// dbConn.query(INSERT_USER, (err, results) => {
			// 	if (err) {
			// 		return res.redirect(err);
			// 	} else {
			// 		return res.redirect('/');
			// 	}
			// });
            return done(null, user);
        });
    }
));


app.get('/auth/google', passport.authenticate('google', { scope:
    ['profile']}));

app.get('/auth/google/callback', passport.authenticate( 'google', { failureRedirect: '/login' }),
    function(req, res) {
            res.redirect('/'); 
});

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


app.get('/', (req, res) => {
	res.send('nothing');
	// res.sendfile('main.html');
});

app.get('/write/del', (req, res) => {
	const { no } = req.query;
	console.log(no);
	const DELETE_WRITE = `DELETE FROM write_table WHERE write_no='${no}'`;
	dbConn.query(DELETE_WRITE, (err, results) => {
		if (err) {
			return res.redirect(err);
		} else {
			return res.redirect('/');
		}
	});
});

app.post('/write/add', (req, res) => {
	console.log(req.body);
	const { title, contents } = req.body;
	const INSERT_WRITE = `INSERT INTO write_table(write_title, write_contents) VALUES('${title}', '${contents}')`;
	dbConn.query(INSERT_WRITE, (err, results) => {
		if (err) {
			return res.redirect(err);
		} else {
			return res.redirect('/');
		}
	});
});

app.get('/write', (req, res) => {
	const SELECT_ALL = 'SELECT * FROM write_table';
	dbConn.query(SELECT_ALL, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results,
			});
		}
	});
});

app.post('/userAdd', (req, res) => {
	console.log(req.body);
	const { userId, userPw, userTy } = req.body;
	const INSERT_USER = `INSERT INTO user(user_id, user_password, user_status) VALUES('${userId}', '${userPw}', '${userTy}')`;
	dbConn.query(INSERT_USER, (err, results) => {
		if (err) {
			return res.redirect(err);
		} else {
			return res.redirect('/');
		}
	});
});

app.listen(3500, () => {
	console.log('server start');
});
