const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../configs/mysql');

router.route('/registration').post((req, res) => {
    bcrypt.hash(req.body.password, 3).then((hash) => {
        const userInfo = {
            email: req.body.email,
            password: hash,
            clinicname: req.body.clinicname,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
        };
        db.addUser(userInfo)
            .then((response) => {
                res.status(200).json({
                    success: true,
                    message: 'User successfully created!',
                    result: response,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    error: error,
                });
            })
            .catch((err) => res.status(400).json('Error: ' + err));
    });
});

router.route('/login').post((req, res) => {
    db.queryUser(req.body.email)
        .then((rows) => {
            if (rows.length <= 0) {
                return res.send({
                    success: false,
                    message: 'Login Failed',
                    error: 1,
                });
            }
            bcrypt.compare(req.body.password, rows[0].password).then((result) => {
                if (result) {
                    return res.send({
                        success: true,
                        message: 'Login Success',
                        error: null,
                    });
                } else {
                    return res.send({
                        success: false,
                        message: 'Login Failed',
                        error: 2,
                    });
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
