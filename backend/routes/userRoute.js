import express from 'express';
import User from '../models/userModel';

const router = express.Router();

router.post("/signin",async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            firstName: signinUser.firstName,
            lastName: signinUser.lastName,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(user)
        })
    } else {
        res.status(401).send({msg: 'Invalid email or password'})
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

