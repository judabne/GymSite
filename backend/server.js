import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import plansRoute from './routes/plansRoute';
import Plan from './models/planModel';
import { isAuth } from './util';

const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_51JiCwaBQcQnzL9cb9ImcFc4aGZK9TmkfGp6tdbTP7JLQabIZEuHa2xnpcIuAqTOxWDodWRbBvuNQRknxjAyXnLMs00xOnZqz0k');

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

app.get('/api/secret/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const plan = await Plan.findOne({ _id: req.params.id });
        console.log(plan.planPrice)
        const payAmount = plan.planPrice * 100;
        const intent = await stripe.paymentIntents.create({
            amount: payAmount,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        })
        console.log('created intent')
        res.json({ client_secret: intent.client_secret });
    }
    catch {
        res.send("Error in creating payment");
    }
});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") })
