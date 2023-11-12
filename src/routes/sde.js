const express = require('express');

const crypted = require('../data/crypted.json');
const uData = require('../data/users.json');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('sde');
});

router.get('/users', (req, res) => {
    if (req.query.vulnerability === 'enabled') {
        return res.render('sdeUsers', {
            vulnerability: req.query.vulnerability,
            users: crypted
        });
    } else if (req.query.vulnerability === 'disabled') {
        const users = uData.map(user => {
            return { id: user.id, username: user.username, email: user.email };
        });
        return res.render('sdeUsers', {
            vulnerability: req.query.vulnerability,
            users
        });
    }
    return res.sendStatus(400);
});

module.exports = router;
