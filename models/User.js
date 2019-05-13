const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { Schema } = mongoose;

const BookmarkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\../, 'A valid email address must be used!']
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  fullName: {
    type: String
  },
  bookmarks: [BookmarkSchema]
});

UserSchema.pre('save', function createUser(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  const document = this;
  return new Promise((resolve, reject) => {
    console.log(document);
    bcrypt.compare(password, document.password, function compareCallback(err, same) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(same);
      }
    });
  });
};

UserSchema.methods.setFullName = function setFullName() {
  this.fullName = `${this.firstName} ${this.lastName}`;
  return this.fullName;
};

module.exports = mongoose.model('User', UserSchema);
