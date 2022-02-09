import express from 'express';
import Branch from '../models/branchModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const branches = await Branch.find();
    res.send(branches);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    let branch = new Branch();
    saveBranchData(req, res, branch);
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
            saveBranchData(req, res, branch)
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

const saveBranchData = async (req, res, branch) => {
    try {
        branch.branchCity = req.body.city;
        branch.branchDescription = req.body.description;
        branch.branchImage = req.body.image;
        branch.branchLocation = { "coordinates": [req.body.longitude, req.body.latitude] }
        const updatedBranch = await branch.save();
        if (updatedBranch) {
            return res.status(200).send({ message: 'Branch Saved', data: updatedBranch })
        }
    } catch {
        return res.status(500).send({ message: 'Error in saving branch.' })
    }
}

export default router;