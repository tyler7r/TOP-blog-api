const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.log_in_post = asyncHandler(async (req, res, next) => {
    try {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    info
                })
            }
        req.login(user, { session: false }, (err) => {
            if (err) {
                next(err)
            }
            const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '1d'});
            return res.status(200).json({ token, user });
        })
    })(req, res, next);
    } catch (err) {
        res.status(403).json({
            err
        })
    }
})

exports.signup_post = [
    body('username').trim().isLength({ min: 2, max: 15 }).withMessage('Username must be between 2 and 15 characters').escape(),
    body('password', 'Password must be specified').trim().isLength({ min: 3 }).escape(),
    check('confirm_password').trim().isLength({ min: 2 }).withMessage('Password must be at least 3 characters long')
        .custom(async (confirmPassword, {req}) => {
            const password = req.body.password
            if (password !== confirmPassword) {
                throw new Error('Passwords must match')
            }
        }).escape(),
    body('admin').trim().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        })
        if (req.body.admin === process.env.ADMIN_PASSWORD) {
            user.admin = true;
        } else {
            user.admin = false;
        }
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'Sign Up!',
                errors: errors.array()
            })
        } else {
            const userExists = await User.findOne({ username: req.body.username}).exec();
            if (userExists) {
                throw new Error('Username already Exists');
            } else {
                bcrypt.hash(user.password, 10, async(err, hashedPassword) => {
                    if (err) {
                        return new Error('Hashing Issue')
                    } else {
                        user.password = hashedPassword;
                        await user.save();
                        res.status(200).json({
                            message: 'User create successfully',
                            user: user,
                        })
                    }
                })
            }
        }
    })
]
