import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import plansRoute from './routes/plansRoute';
import Plan from './models/planModel';
import User from './models/userModel';
import Payment from './models/paymentModel';
import { isAuth } from './util';
const stripe = require('stripe')(config.STRIPE_SK);

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

app.get('/api/secret/:id', isAuth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.id });
        const payAmount = plan.planPrice * 100;
        const intent = await stripe.paymentIntents.create({
            amount: payAmount,
            currency: 'usd',
            metadata: {
                integration_check: 'accept_a_payment',
                plan: req.params.id,
                user: req.user._id
            },
        })
        console.log('created intent')
        res.json({ client_secret: intent.client_secret });
    }
    catch {
        res.send("Error in creating payment");
    }
});

app.put('/api/payment/:pi', async (req, res) => {
    const paymentIntent = await Payment.findOne({ paymentIntent: req.params.pi });
    if (paymentIntent) {
        res.status(200).send({ message: "This payment was already processed." })
    }
    else {
        try {
            const paymentDetails = await stripe.paymentIntents.retrieve(req.params.pi)
            const user = await User.findById(paymentDetails.metadata.user);
            const plan = await Plan.findById(paymentDetails.metadata.plan);
            const payment = new Payment({
                paymentIntent: req.params.pi,
                paymentUser: paymentDetails.metadata.user,
                paymentPlan: paymentDetails.metadata.plan,
                paymentPlanType: plan.planType,
                paymentPlanDur: plan.planDuration,
                paymentDate: new Date(),
            });
            const newPayment = await payment.save();
            let existingPlan = user.plans.findIndex(obj => obj.planType === payment.paymentPlanType);
            if (existingPlan === -1) {
                let currDate = new Date();
                currDate.setMonth(currDate.getMonth() + plan.planDuration);
                user.plans.push({ planType: payment.paymentPlanType, expiry: currDate });
            } else {
                let expDate = user.plans[existingPlan].expiry;
                if (expDate < new Date()) { // expired membership
                    expDate = new Date();
                }
                expDate.setMonth(expDate.getMonth() + plan.planDuration);
                expDate.setHours(23,59,59,999);
                user.plans[existingPlan].expiry = expDate;
                // otherwise it wont recognize that these were modified
                user.markModified('plans');
            }
            const userUpdate = await user.save();
            res.status(200).send(payment);
        } catch (e) {
            console.log("error " + e);
            res.status(202).send({ message: 'Your payment was received but did not completely process yet. Do not worry we will take care of it' })
        }
    }

});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") })
