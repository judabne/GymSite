import express from 'express';
import Plan from '../models/planModel';

const router = express.Router();

router.get("/plans", async (req, res) => {
    const plans = await Plan.find();
    res.send(plans);
});


export default router;

