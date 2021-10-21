import express from 'express';
import Plan from '../models/planModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const plans = await Plan.find();
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

export default router;

