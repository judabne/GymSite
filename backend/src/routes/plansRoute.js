import express from 'express';
import Plan from '../models/planModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const plans = await Plan.find();
    res.send(plans);
});

router.get("/active", async (req, res) => {
    const plans = await Plan.find({ planAvailable: true }).sort({ planType: 1 });
    res.send(plans);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    let plan = new Plan();
    savePlanData(req, res, plan)
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
        if (plan) {
            savePlanData(req, res, plan)
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

const savePlanData = async (req, res, plan) => {
    try {
        plan.planName = req.body.name;
        plan.planDuration = req.body.duration;
        plan.planPrice = req.body.price;
        plan.planType = req.body.type;
        plan.planDescription = req.body.description,
        plan.planAvailable = req.body.availability;
        const updatedPlan = await plan.save();
        if (updatedPlan) {
            return res.status(200).send({ message: 'Plan Saved', data: updatedPlan })
        }
    } catch {
        return res.status(500).send({ message: 'Error in saving plan.' })
    }
}

export default router;

