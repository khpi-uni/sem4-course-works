import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";
import {comparePasswords} from "./password.js";
import {findUserByEmail, findUserById, isUserAdminById} from "../../users/helpers/user.js";

dotenv.config({path: '.env'});

export const passportJWT = (req, res, next) => {
    passport.authenticate('jwt', {session: false})(req, res, next);
};

export const passportAdminJWT = (req, res, next) => {
    passport.authenticate('jwt-admin', {session: false})(req, res, next);
};

export const localLogin = new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    const user = await findUserByEmail(email);

    if (!user) return done('User with this email does not exist', false);

    const passwordIsValid = comparePasswords(password, user.password);

    if (!passwordIsValid) return done('Incorrect password', false);

    return done(null, user);
});

export const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SALT,
    },
    async (payload, done) => {
        const user = await findUserById(payload.user_id);

        if (!user) {
            return done('Incorrect user, please log in again', false);
        }

        return done(null, user);
    }
);

export const jwtAdminLogin  = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SALT,
    },
    async (payload, done) => {
        const user = await findUserById(payload.user_id);

        if (!user) {
            return done('Incorrect user, please log in again', false);
        }

        const isAdmin = await isUserAdminById(payload.user_id);

        if(!isAdmin) {
            return done('User must be an admin to access this endpoint', false);
        }

        return done(null, user);
    }
)