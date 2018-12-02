var express = require('express')
var router = express.Router()
var dbConn = require('./dbConn')
const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    const SELECT_ALL = `SELECT * FROM mark_toy.mark_lines`;
    dbConn.query(SELECT_ALL, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results,
            });
        }
    });
})

router.post('/add', (req, res) => {
    console.log(req.body);
    const {
        comment,
        date,
        feeling
    } = req.body;
    const INSERT_WRITE = `INSERT INTO mark_toy.mark_lines(mark_comment, mark_date, mark_feeling) VALUES('${comment}', '${date}', '${feeling}')`;
    dbConn.query(INSERT_WRITE, (err, results) => {
        if (err) {
            return res.redirect(err);
        } else {
            return res.json({
                data: results,
            });
        }
    });
});

router.get('/del', (req, res) => {
    const {
        date
    } = req.body;
    const DELETE_WRITE = `DELETE FROM mark_toy.mark_lines WHERE mark_date='${date}'`;
    dbConn.query(DELETE_WRITE, (err, results) => {
        if (err) {
            return res.redirect(err);
        } else {
            return res.json({
                data: results,
            });
        }
    });
});

router.post('/update', (req, res) => {
    const {
        date,
        comment,
        feeling
    } = req.body;
    const UPDATE_WRITE = `UPDATE mark_toy.mark_lines SET mark_comment='${comment}', mark_feeling='${feeling}' WHERE mark_date='${date}'`;
    dbConn.query(UPDATE_WRITE, (err, results) => {
        if (err) {
            return res.redirect(err)
        } else {
            return res.json({
                data: results,
            });
        }
    })
})

router.get('/getOne', (req, res) => {
    const {
        date
    } = req.body;
    const FIND_WRITE = `SELECT * FROM mark_toy.mark_lines WHERE mark_date='${date}'`
    dbConn.query(FIND_WRITE, (err, results) => {
        if (err) {
            return res.redirect(err)
        } else {
            return res.json({
                data: results,
            });
        }
    })
})

module.exports = router;