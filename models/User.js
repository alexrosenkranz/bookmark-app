const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\../, 'A valid email address must be used!']
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true
  },
  full_name: {
    type: String
  },
  bookmarks: []
});

UserSchema.pre('save', function createPassword(next) {
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
        console.log(err)
        reject(err);
      } else {
        resolve(same);
      }
    });
  });
};

UserSchema.methods.setFullName = function setFullName() {
  this.full_name = `${this.first_name} ${this.last_name}`;
  return this.full_name;
};

module.exports = mongoose.model('User', UserSchema);
