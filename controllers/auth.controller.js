const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/Sessions.model');
const getImageFileType = require('../utlis/getImageFileType');
const fs = require('fs');

const activeSessions = new Map();

exports.register = async (req, res) => {
    try {
        const { login, password, phone } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if (login && typeof login === 'string' && password && typeof password === 'string' && phone && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            const userWithLogin = await User.findOne({ login })
            if (userWithLogin) {
                if (req.file) {
                    fs.unlinkSync('./public/uploads/' + req.file.filename);
                }
                return res.status(409).send({ message: 'User with this login arleady exists' })
            }
            const user = new User({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone });
            await user.save();
            res.status(201).send({ message: 'User created ' + user.login })
        } else {
            if (req.file) {
                fs.unlinkSync('./public/uploads/' + req.file.filename);
            }
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            console.log(user)
            if (!user) {
                res.status(400).send({ message: 'User or password are incorrect' });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.userId = user._id; 
                    req.session.login = user.login;
                    activeSessions.set(req.session.id, user.login);
                    res.status(200).send({ message: 'Login successful' });
                } else {
                    res.status(400).send({ message: 'User or password are incorrect' });
                }
            }
        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    const user = Array.from(activeSessions.values());
    res.status(200).send({ user });

}
exports.logout = async (req, res) => {
    try {
        if (process.env.NODE_ENV !== "production") {
            // Delete all sessions (for development/testing purposes)
            await Session.deleteMany({});
            res.status(200).send({ message: 'All sessions deleted (development only)' });
        } else {
            if (req.session && req.session.id) {
                // Destroy the session if it exists
                await req.session.destroy();
                
                // Remove the session ID from any external session management
                // activeSessions.delete(req.session.id); // Adjust as per your actual implementation

                res.status(200).send({ message: 'Logged out successfully' });
            } else {
                res.status(400).send({ message: 'No active session' });
            }
        }
    } catch (err) {
  
        console.error('Error during logout process:', err);
        res.status(500).send({ message: 'Error during logout process' });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
      const sessions = await Session.find();
  
      const formattedSessions = sessions.map((session) => {
        const sessionData = JSON.parse(session.session);
        const { login, userId } = sessionData;
        return { login, userId };
      });
  
      res.json(formattedSessions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };