( function() {
		'use strict';

		var express = require('express');
		var router = express.Router();
		var mongojs = require('mongojs');
		var mysql = require('mysql');
		var db = mongojs('meanTodo', ['thing']);
		var databaseCredentials = require('./database-credentials');

		//GET home page
		router.get('/', function(req, res) {
			res.render('index');
		});

		router.get('/api/thing', function(req, res) {
			var connection = mysql.createConnection({
				host : databaseCredentials.host,
				port : databaseCredentials.port,
				user : databaseCredentials.user,
				password : databaseCredentials.password,
				database : databaseCredentials.database
			});

			connection.connect(function(error) {
				if(error) {
					console.erroror('erroror connecting: ' + error.stack);
					return;
				}
				
				console.log('connected as id: ' + connection.threadId);
			});

			connection.query('CALL ' + databaseCredentials.database + '.Thing_SelectAll', function(error, rows, fields) {
				if (!error) {
					res.json(rows);
				} else {
					res.json(error);
				}
			});
			
			connection.end(function(error) {
				if(error) {
					console.log(error);
				}
			});
		});

		router.post('/api/thing', function(req, res) {
			db.thing.insert(req.body, function(error, data) {
				res.json(data);
			});
		});

		router.put('/api/thing', function(req, res) {
			db.thing.update({
				_id : mongojs.ObjectId(req.body._id)
			}, {
				isCompleted : req.body.isCompleted,
				todo : req.body.todo
			}, {}, function(error, data) {
				res.json(data);
			});
		});

		router.delete('/api/thing:_id', function(req, res) {
			db.thing.remove({
				_id : mongojs.ObjectId(req.params._id)
			}, '', function(error, data) {
				res.json(data);
			});
		});

		module.exports = router;
	}());
