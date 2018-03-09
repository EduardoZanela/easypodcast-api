var request = require('sync-request');
var xml2js = require('xml2js');
var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var isAuthenticated = require('../policies/isAuthenticated')

router.post('/', function(req, res, next){req.giaco = true; next(); }, users.create);

router.get('/', function(req, res, next){req.giaco = true; next(); }, isAuthenticated, users.findAll);

router.post('/subscribe', function(req, res, next){req.giaco = true; next(); }, isAuthenticated, users.subscribe);

module.exports = router;