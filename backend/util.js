import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    console.log("user " + user.firstname);
    return jwt.sign({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '168h'
    })
}

export {
    getToken
}