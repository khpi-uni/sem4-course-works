import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";
import {findUserByEmail} from "../../users/users.service.js";
import {comparePasswords} from "./password.js";

dotenv.config({path: '.env'});

export const passportJWT = (req, res, next) => {
    passport.authenticate('jwt', {session: false})(req, res, next);
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
    (payload, done) => {
        console.log(payload, done)
        const user = users.find(user => user.id === payload.user_id);

        if (!user) return done(null, false);

        return done(null, user);
    }
);

