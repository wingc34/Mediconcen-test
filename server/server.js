const express = require('express');
const cors = require('cors');

//init express
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

//router connection
const usersRouter = require('./routes/users');
const RecordsRouter = require('./routes/consultationRecords');

app.use('/users', usersRouter);
app.use('/consultation-records', RecordsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
