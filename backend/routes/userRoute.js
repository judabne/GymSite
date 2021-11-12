import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
    });
    if (signinUser) {
        const validPassword = await bcrypt.compare(req.body.password, signinUser.password)
        if (validPassword) {
            sendUserJson(signinUser, res)
            console.log(getToken(signinUser));
        } else {
            console.log("auth failed");
            res.status(401).send({ msg: 'Invalid email or password' });
        }
    } else {
        console.log("didn't find email")
        res.status(401).send({ msg: 'Email does not exist' })
    }
})

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log("REQ " + req.body.firstname + " hashedPassword " + hashedPassword);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
        });
        const newUser = await user.save();
        if (newUser) {
            sendUserJson(newUser, res)
        } else {
            res.status(401).send({ msg: 'Invalid user data' })
        }
    } catch {
        res.status(401).send({ msg: 'Invalid user data' })
    }
});

router.get("/reload", isAuth, async (req, res) => {
    console.log("reloading user")
    try {
        const signinUser = await User.findOne({ _id: req.user._id });
        if (signinUser) {
            sendUserJson(signinUser, res)
        }
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get("/createadmin", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("1234", salt);
    try {
        const user = new User({
            firstname: 'Judabne',
            lastname: 'Judabne',
            email: 'judabne@github.com',
            password: hashedPassword,
            isAdmin: true,
            expiry: "12-12-2021"
        });
        console.log(user);
        const newUser = await user.save();
        res.send(newUser);
        console.log("saved");
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.get("/:id", isAuth, async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found.' });
    }
});

const sendUserJson = (user, res) => {
    res.send({
        _id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin,
        plans: user.plans,
        token: getToken(user)
    })
}

export default router;
