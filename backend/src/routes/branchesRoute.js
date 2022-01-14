import express from 'express';
import Branch from '../models/branchModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const branches = await Branch.find();
    res.send(branches);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const branch = new Branch({
            branchCity: req.body.city,
            branchDescription: req.body.description,
            branchImage: req.body.image,
        });
        const newBranch = await branch.save();
        if (newBranch) {
            return res.status(201).send({ message: 'New Branch Created', data: newBranch })
        }
    } catch {
        return res.status(500).send({ message: 'Error in creating branch.' })
    }
})

router.get('/:id', async (req, res) => {
    const branch = await Branch.findOne({ _id: req.params.id });
    if (branch) {
        res.send(branch);
    } else {
        res.status(404).send({ message: 'Branch Not Found.' });
    }
});


router.put("/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findById(branchId);
        if (branch) {
            branch.branchCity = req.body.city;
            branch.branchDescription = req.body.description;
            branch.branchImage = req.body.image;
            const updatedBranch = await branch.save();
            if (updatedBranch) {
                return res.status(200).send({ message: 'Branch Updated', data: updatedBranch })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error })
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedBranch = await Branch.findById(req.params.id);
    if (deletedBranch) {
        await deletedBranch.remove();
        res.send({ message: "Branch Deleted" });
    } else {
        res.send("Error in deletion")
    }
});

export default router;