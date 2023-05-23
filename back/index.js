import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from "cors";

import {jwtAdminLogin, localLogin} from "./auth/helpers/jwt.js";
import {jwtLogin} from "./auth/helpers/jwt.js";
import {authRouter} from "./auth/auth.controller.js";
import {usersRouter} from "./users/users.controller.js";
import {productRouter} from "./products/products.controller.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize({}));
app.use(cors());

passport.use('local', localLogin);
passport.use('jwt', jwtLogin);
passport.use('jwt-admin', jwtAdminLogin);

// Our simple "database":
const port = 3000;

const globalRouter = express.Router()
globalRouter.use('/user', usersRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/product', productRouter);

app.use('/api', globalRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
