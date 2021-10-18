import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post("/signin",async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            firstName: signinUser.firstname,
            lastName: signinUser.lastname,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
        console.log(getToken(signinUser));
    } else {
        res.status(401).send({msg: 'Invalid email or password'})
    }
})

router.post("/register",async (req, res) => {
    console.log("REQ " + res.body.firstName);
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({msg: 'Invalid user data'})
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            firstname: 'Judabne',
            lastname: 'Judabne',
            email: 'judabne@github.com',
            password: '1234',
            isAdmin: true
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

