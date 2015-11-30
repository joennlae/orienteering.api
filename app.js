/*
 * Copyright 2015 Simon Raess
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var express = require('express');
var request = require('request');
var compress = require('compression');

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
//app.use(compress());

app.get('/api/events', require('./routes/events'));

app.get('/api/events/solv/:id', require('./routes/solv/event'));

app.get('/api/events/solv/:id/categories', require('./routes/solv/categories'));

app.get('/api/events/solv/:id/categories/:categoryId', require('./routes/solv/category'));

app.get('/api/events/solv/:id/courses', require('./routes/solv/courses'));

app.get('/api/events/solv/:id/courses/:courseId', require('./routes/solv/course'));

app.get('/api/events/solv/:id/legs', require('./routes/solv/legs'));

app.get('/api/events/solv/:id/legs/:legId', require('./routes/solv/leg'));

app.get('/api/events/solv/:id/controls', require('./routes/solv/controls'));

app.get('/api/events/solv/:id/controls/:controlId', require('./routes/solv/control'));

app.get('/api/events/solv/:id/runners', require('./routes/solv/runners'));

app.get('/api/events/solv/:id/starttime', require('./routes/solv/starttime'));

app.get('/api/events/zimaa/:id', require('./routes/zimaa/event').get);

app.put('/api/events/zimaa/:id', require('./routes/zimaa/event').put);

// fallback route -> send to entry point
app.get('/*', function(req, res) {
  res.redirect('/api/events');
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.json({ error: err });
});

module.exports = app;