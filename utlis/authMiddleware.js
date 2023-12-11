const Session = require('../models/Sessions.model');
const authMiddleware = async (req, res, next) => {

  if (process.env.NODE_ENV !== "production") {

    try {

      // find last session record in db
      const sessionRecord = await Session.findOne({});
console.log('step 1', sessionRecord);
      // if session is not found
      // return 401 status and message
      if (!sessionRecord){
        console.log('step 1.1');
        return res.status(401).send({ message: 'You are not authorized' });
      }

      // if session is found, parse it and set user in req.session
      const sessionData = JSON.parse(sessionRecord.session);
      console.log('step 1,3', sessionData);
      req.session.user = {
        login: sessionData.login,
        id: sessionData.userId,
      }
      console.log('step 2', req.session.user);
      next();
    }
    catch (err) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

  }
  else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({ message: 'You are not authorized' });
    }
  }
}

module.exports = authMiddleware;