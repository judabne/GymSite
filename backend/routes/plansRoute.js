import express from 'express';
import Plan from '../models/planModel';

const router = express.Router();

router.get("/", async (req, res) => {
    const plans = await Plan.find();
    res.send(plans);
});

router.post("/", async (req, res) => {
    const plan = new Plan({
        planName: req.body.name,
        planDuration: req.body.duration,
        planPrice: req.body.price,
        planType: req.body.type,
        planDescription: req.body.planDescription,
        planAvailable: req.body.available
    });
    const newPlan = await plan.save();
    if (newPlan) {
        res.status(201).send({ msg: 'New plan created', data: newPlan })
    }
    return res.status(500).send({ msg: 'Error in creating product' })
})


export default router;

