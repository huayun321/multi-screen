var express = require('express');
var router = express.Router();
var config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('qr', { title: 'Multi-screen', serverUrl: config.serverUrl });
});

module.exports = router;
