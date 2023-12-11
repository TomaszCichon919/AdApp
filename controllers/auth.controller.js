const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/Sessions.model');
const getImageFileType = require('../utlis/getImageFileType');
const fs = require('fs');


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
    res.status(200).send({login: req.session.login})

}
exports.logout = async (req, res) => {
    if (process.env.NODE_ENV !== "production")
        await Session.deleteMany({});
    try {
        if (req.session) {
            const sessionId = req.session.id; 
            await req.session.destroy();

   
            await req.sessionStore.clear({
                _id: sessionId, 
            });

            res.status(200).send({ message: 'Logged out successfully' });
        } else {
            res.status(400).send({ message: 'No active session' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};