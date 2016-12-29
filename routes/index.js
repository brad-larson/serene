var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres@0.0.0.0:5432/postgres';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

router.post('/api/v1/example', (req, res, next) => {
  var results = [];
  // Data from the request is available at in req.body
  console.log(req.body);
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    client.query(
      'INSERT INTO example(text) values($1)',
      ['Serene!']
    );
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM example ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/example', (req, res, next) => {
  var results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM example ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
