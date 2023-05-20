import passport from "passport";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {findUserByEmail} from "../users/users.service.js";
import {hashPassword} from "./helpers/password.js";
import {db} from "../db.js";

dotenv.config({path: '.env'});

export const login = (req, res) => {
    passport.authenticate('local', {session: false, failureMessage: true}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            });
        }

        // Generate the token
        const token = jwt.sign({user_id: user.id}, process.env.JWT_SALT, {
            expiresIn: process.env.JWT_LIFETIME
        });

        // Respond with token
        return res.json({token});
    })(req, res);
}

export const signup = async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        res.status(400).send({error: 'Email is required'});
        return;
    }

    if (!password) {
        res.status(400).send({error: 'Password is required'});
        return;
    }

    const candidate = await findUserByEmail(email);

    if (candidate) {
        res.status(400).send({error: 'User with this email is already registered'});
        return;
    }

    const hashedPassword = hashPassword(password);

    const sqlQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

    db.query(sqlQuery, [email, hashedPassword], (err, results) => {
        if (err) {
            res.status(400).send({error: err});
            return;
        }

        const newUserId = results.insertId;

        // Generate the token
        const token = jwt.sign({user_id: newUserId}, process.env.JWT_SALT, {
            expiresIn: process.env.JWT_LIFETIME
        });

        res.send({token})
    })
}