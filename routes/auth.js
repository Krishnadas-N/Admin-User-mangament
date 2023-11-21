// var express = require('express');
// var router = express.Router();


// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });

// // module.exports = router;
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
// const UserModel = require("../models/User");
// var crypto = require('crypto')
//  var db = require('../models')

//  passport.use(new LocalStrategy(function(username, password, cb) {
//   UserModel.findOne({ email: email }, function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'hex'), hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// }));


