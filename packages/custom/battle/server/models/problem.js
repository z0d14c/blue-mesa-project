'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Validations
 */


/**
 * User Schema
 */

var ProblemSchema = new Schema({
    Type: String,
    keyNumbers: Array
//    name: {
//        type: String,
//        required: true
//    },
//    email: {
//        type: String,
//        required: true,
//        unique: true,
//        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
//        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
//        validate: [validateUniqueEmail, 'E-mail address is already in-use']
//    },
//    username: {
//        type: String,
//        unique: true,
//        required: true
//    },
//    roles: {
//        type: Array,
//        default: ['authenticated']
//    },
//    hashed_password: {
//        type: String,
//        validate: [validatePresenceOf, 'Password cannot be blank']
//    },
//    provider: {
//        type: String,
//        default: 'local'
//    },
//    avatar: String,
//    class: String,
//    location: String,
//    items: Array,
//    abilities: Array,
//    salt: String,
//    hasAvatar: {
//        type: Boolean,
//        required: true,
//        default: false
//    },
//    experience: {
//        type: Number,
//        required: true,
//        default: 0
//    },
//    resetPasswordToken: String,
//    resetPasswordExpires: Date,
//    facebook: {},
//    twitter: {},
//    github: {},
//    google: {},
//    linkedin: {}
});

/**
 * Virtuals
 */
//UserSchema.virtual('password').set(function (password) {
//    this._password = password;
//    this.salt = this.makeSalt();
//    this.hashed_password = this.hashPassword(password);
//}).get(function () {
//    return this._password;
//});

/**
 * Pre-save hook
 */
//UserSchema.pre('save', function (next) {
//    if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
//        return next(new Error('Invalid password'));
//    next();
//});

/**
 * Methods
 */
ProblemSchema.methods = {

    


};

mongoose.model('Problem', ProblemSchema);
