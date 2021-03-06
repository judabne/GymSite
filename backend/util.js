import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
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

const isAuth = (req, res, next) => {
    console.log("isAuth")
    console.log(req.user);
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        })
    } else {
        return res.status(401).send({ msg: "Token is not supplied." })
    }
}

const isAdmin = (req, res, next) => {
    console.log(req.user.firstname)
    if (req.user && req.user.isAdmin) {
        return next(); // accpet this request
    }
    return res.status(401).send({ msg: 'Admin Token is not valid.' })
}

export {
    getToken, isAuth, isAdmin
}