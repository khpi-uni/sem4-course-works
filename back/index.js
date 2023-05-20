import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import {localLogin} from "./auth/helpers/jwt.js";
import {jwtLogin} from "./auth/helpers/jwt.js";
import {authRouter} from "./auth/auth.controller.js";
import {usersRouter} from "./users/users.controller.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize({}));

passport.use('local', localLogin);
passport.use('jwt', jwtLogin);

// Our simple "database":
const port = 3000;

const globalRouter = express.Router()
globalRouter.use('/users', usersRouter);
globalRouter.use('/auth', authRouter);

app.use('/api', globalRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
