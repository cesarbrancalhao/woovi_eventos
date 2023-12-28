/* eslint-disable no-var, func-names, prefer-arrow-callback, global-require */
var fs = require('fs');
var path = require('path');

var jsonFile = path.join(__dirname, '../data/schema.json');

// read schema.json only if exists
fs.access(jsonFile, fs.F_OK, function (err) {
  if (!err) module.exports = require('babel-relay-plugin')(require(jsonFile).data);
});
