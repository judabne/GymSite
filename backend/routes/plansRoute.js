import express from 'express';
import Plan from '../models/planModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    console.log("sending all")
    const plans = await Plan.find();
    res.send(plans);
});

router.get("/active", async (req, res) => {
    const plans = await Plan.find({ planAvailable: true }).sort({ planType: 1 });
    res.send(plans);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const plan = new Plan({
            planName: req.body.name,
            planDuration: req.body.duration,
            planPrice: req.body.price,
            planType: req.body.type,
            planDescription: req.body.description,
            planAvailable: req.body.availability
        });
        console.log(plan);
        const newPlan = await plan.save();
        if (newPlan) {
            return res.status(201).send({ message: 'New Plan Created', data: newPlan })
        }
    } catch {
        return res.status(500).send({ message: 'Error in creating plan.' })
    }
})

router.get('/:id', async (req, res) => {
    const plan = await Plan.findOne({ _id: req.params.id });
    if (plan) {
        res.send(plan);
    } else {
        res.status(404).send({ message: 'Plan Not Found.' });
    }
});


router.put("/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const planId = req.params.id;
        const plan = await Plan.findById(planId);
        console.log(plan);
        if (plan) {
            plan.planName = req.body.name;
            plan.planDuration = req.body.duration;
            plan.planPrice = req.body.price;
            plan.planType = req.body.type;
            plan.planDescription = req.body.description,
                plan.planAvailable = req.body.availability;
            const updatedPlan = await plan.save();
            if (updatedPlan) {
                return res.status(200).send({ message: 'Plan Updated', data: updatedPlan })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error })
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedPlan = await Plan.findById(req.params.id);
    if (deletedPlan) {
        await deletedPlan.remove();
        res.send({ message: "Plan Deleted" });
    } else {
        res.send("Error in deletion")
    }
});

// router.get("/buy/:id", isAuth, async (req, res) => {
//     console.log(req.user)
//     try {
//         const user = await User.findOne({ _id: req.user.id })
//         const email = user.email;
//         const plan = await Plan.findOne({ _id: req.params.id1 });
//         const payAmount = plan.planPrice * 100;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: payAmount,
//             currency: 'usd',
//             metadata: { integration_check: 'accept_a_payment' },
//             recepient_email: email
//         })

//         var currentDate = new Date();
//         var futureDate = new Date(currentDate);
//         futureDate.setMonth(futureDate.getMonth() + 1);

//         user.expiry = futureDate;

//         res.json({ 'client_secret': paymentIntent['client_secret'] });
//     } catch {
//         res.send("Error in processing payment");
//     }
// })

export default router;

