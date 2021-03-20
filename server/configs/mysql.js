const mysql = require('mysql');

const user = 'root';
const password = 'test1234';
const database = 'codetestdb';

const db = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: password,
    database: database,
});

db.connect((err) => {
    if (err) {
        console.log('connection err', err);
        return;
    }
    console.log('connection success');
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'codetestdb',
});

const queryUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const addUser = (userInfo) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO users (email, password, clinicname, phonenumber, address) VALUES ('${userInfo.email}', '${userInfo.password}', '${userInfo.clinicname}', '${userInfo.phonenumber}', '${userInfo.address}')`,
            (err, rows, fields) => {
                if (err) reject(err);
                else resolve('success');
            },
        );
    });
};

const queryRecords = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT doctorname, patientname, diagnosis, medication, consultationfee, datetime, followup FROM consultationrecord LEFT JOIN users ON consultationrecord.userid=users.userid WHERE users.email='${email}'`,
            (err, rows, fields) => {
                if (err) console.log(err);
                else resolve(rows);
            },
        );
    });
};
const addRecord = (recordInfo) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO consultationrecord (doctorname, patientname, diagnosis, medication, consultationfee, datetime, followup, userid) VALUES ('${recordInfo.doctorname}', '${recordInfo.patientname}', '${recordInfo.diagnosis}', '${recordInfo.medication}', '${recordInfo.consultationfee}', '${recordInfo.datetime}', '${recordInfo.followup}', '${recordInfo.userid}')`,
            (err, rows, fields) => {
                if (err) reject(err);
                else resolve('success');
            },
        );
    });
};
module.exports = { queryUser, addUser, queryRecords, addRecord };

//user: root password: test1234
