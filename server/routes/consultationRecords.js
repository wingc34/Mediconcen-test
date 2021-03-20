const router = require('express').Router();
const db = require('../configs/mysql');

router.route('/create').post((req, res) => {
    const recordInfo = {
        doctorname: req.body.doctorname,
        patientname: req.body.patientname,
        diagnosis: req.body.diagnosis,
        medication: req.body.medication,
        consultationfee: req.body.consultationfee,
        datetime: req.body.datetime,
        followup: req.body.followup, //0 - false, 1 - true
        userid: req.body.userid,
    };
    db.addRecord(recordInfo)
        .then((response) => {
            res.status(200).json({
                success: true,
                message: 'Record successfully created!',
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

router.route('/').get((req, res) => {
    db.queryRecords(req.query.email)
        .then((rows) => {
            return res.json(rows);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
