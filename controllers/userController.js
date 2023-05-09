const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.log_in_get = asyncHandler(async (req, res, next) => {

})

exports.log_in_post = asyncHandler(async (req, res, next) => {

})

exports.create_user_get = asyncHandler(async (req, res, next) => {

})

exports.create_user_post = asyncHandler(async (req, res, next) => {

})

// Make a field on user creation page that allows the user to try and guess the secret key to become an admin

// exports.admin_check_get = asyncHandler(async (req, res, next) => {

// })

// exports.admin_check_post = asyncHandler(async (req, res, next) => {

// })