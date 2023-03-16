const mongoose = require('mongoose');
const Project = require('./projectModel');
// near the top is a good place to group our imports
const bcrypt = require('bcrypt');
// this should go after 


const UserSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required: [true, "First name is required"]
  },
  lastName:{
    type : String,
    required : [true,"Last name is required"]
  },
  email:{
    type: String,
    required: [true, "Email address is required"],
    unique:true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password:{
    type: String,
    required: [true,"Password is required"],
    minlength:[8,"Password must be 8 characters or longs"]
  },
  role:{
    type:String,
    required:[true, "A role is required"]
  },
}, {timestamps:true});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    user.password = hashedPassword;
    next();
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;