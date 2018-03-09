var request = require('sync-request');
var xml2js = require('xml2js');
var express = require('express');
var router = express.Router();
var podcasts = require('../controllers/podcasts');
var isAuthenticated = require('../policies/isAuthenticated')

router.post('/', podcasts.create);

module.exports = router;