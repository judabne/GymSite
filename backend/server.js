import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import plansRoute from './routes/plansRoute'
const bcrypt = require('bcrypt');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/plans", plansRoute);
app.get("/api/branches", (req, res) => {
    res.send(data.branches);
});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") })
