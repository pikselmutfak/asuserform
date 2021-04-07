const mongoose = require('mongoose')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  displayName: {
    type: String
  },
  givenName: {
    type: String
  },
  surname: {
    type: String
  },
  userPrincipalName: {
    type: String
  },
  jobTitle: {
    type: String
  },
  mail: {
    type: String
  },
  mobilePhone: {
    type: String
  },
  officeLocation: {
    type: String
  },
  preferredLanguage: {
    type: String
  },
  department: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
}, { 
  usePushEach: true,
  toObject: {virtuals:true},
  toJSON: {virtuals:true} 
})

UserSchema.methods.toJSON = function () {
  var o = this;
  var obj = o.toObject();

  return _.pick(obj, ['_id', 'id', 'displayName', 'givenName', 'surname', 'surname', 'userPrincipalName', 'jobTitle', 'mail', 'mobilePhone', 'officeLocation', 'preferredLanguage', 'department']);
}

UserSchema.pre('save', function (next) {

  var user = this

  if (user.isNew) {
    user.createdAt = new Date().toISOString()
    user.updatedAt = user.createdAt
  }

  else {
    user.updatedAt = new Date().toISOString()
  }

  next()
})

var User = mongoose.model('User', UserSchema)

module.exports = {User}