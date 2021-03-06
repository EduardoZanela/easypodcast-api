var request = require('sync-request');
var xml2js = require('xml2js');
var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var isAuthenticated = require('../policies/isAuthenticated')

router.post('/', users.create);

router.get('/', function(req, res, next){req.giaco = true; next(); }, isAuthenticated, users.findAll);

router.put('/subscribe', function(req, res, next){req.giaco = true; next(); }, isAuthenticated, users.subscribe);

router.delete('/subscribe', function(req, res, next){req.giaco = true; next(); }, isAuthenticated, users.unsubscribe);

module.exports = router;