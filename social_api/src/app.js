const bodyParser = require('body-parser'); // auto parse json body
const cors = require('cors');
require('dotenv').config() //accés aux variables d'environnement

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// const PORT = process.env.PORT;
const uri = `mongodb+srv://admin:admin@cluster0.5rmsluu.mongodb.net/test`;

const apiRouter = require('./Routes')

app.use(cors({
    origin: ['*', 'http://localhost/8081']
  }));
  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//connection database MongoDB
app.use(bodyParser.json());
mongoose.set('strictQuery', false)
mongoose.connect(uri)
.then(() => {
    console.log("Successfully connected")
})
.catch((err) => {
    console.log(err)
})

app.use('/api', apiRouter);


// app.listen(process.env.PORT, function () {
//     console.log(`server start on port ${process.env.PORT}`);
// });
app.listen(5056, function () {
    console.log(`server start on port 5056`);
});