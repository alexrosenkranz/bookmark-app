const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function(next) {
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

UserSchema.methods.isCorrectPassword = function(password) {
  const document = this;
  return new Promise((resolve, reject) => {
    console.log(document);
    bcrypt.compare(password, document.password, function(err, same) {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        resolve(same);
      }
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
