import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
    });
    if (signinUser) {
        const validPassword = await bcrypt.compare(req.body.password, signinUser.password)
        if (validPassword) {
            console.log("right pwd")
            res.send({
                _id: signinUser.id,
                firstName: signinUser.firstname,
                lastName: signinUser.lastname,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                expiry: signinUser.expiry,
                token: getToken(signinUser)
            })
            console.log(getToken(signinUser));
        } else {
            console.log("auth failed");
            res.status(401).send({ msg: 'Invalid email or password' });
        }
    } else {
        console.log("auth failed")
        res.status(401).send({ msg: 'Invalid email or password' })
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
            res.send({
                _id: newUser.id,
                firstName: newUser.firstname,
                lastName: newUser.lastname,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                expiry: newUser.expiry,
                token: getToken(newUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalid user data' })
        }
    } catch {
        res.status(401).send({ msg: 'Invalid user data' })
    }
})

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

export default router;

