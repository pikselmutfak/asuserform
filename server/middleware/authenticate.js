const {Admin} = require('../models/admin');

const authenticate = (req, res, next) => {

    var token = req.header('X-Auth');
  
    Admin.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
  
    }).catch((e) => {

      res.status(401).send(e);
    });
  };

  module.exports = {authenticate};