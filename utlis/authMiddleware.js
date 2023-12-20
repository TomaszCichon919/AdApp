const Session = require('../models/Sessions.model');
const authMiddleware = async (req, res, next) => {

  if (process.env.NODE_ENV !== "production") {
    try {
      const sessionRecord = await Session.findOne({});

      if (!sessionRecord) {
        return res.status(401).send({ message: 'You are not authorized' });
      }


      const sessionData = JSON.parse(sessionRecord.session);
      req.session.user = {
        login: sessionData.login,
        id: sessionData.userId,
      }
 console.log('login process');
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
      console.log('outside base')
      res.status(401).send({ message: 'You are not authorized' });
    }
  }
}

module.exports = authMiddleware;