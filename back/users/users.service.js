import {findUserByEmail, omitPassword, retrieveAllUsers} from "./helpers/user.js";
import {db} from "../db.js";

export const getUsers = async (req, res) => {
    const usersObj = await retrieveAllUsers();

    if (usersObj.hasOwnProperty('error') && usersObj.error) {
        res.statusCode(500).send({
            error: usersObj.error,
            users: null
        })

        return;
    }

    const usersWithoutPassword = usersObj.users.map(user => omitPassword(user));

    res.send({users: usersWithoutPassword})
}

export const deleteUser = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).send({
            error: 'Please provide email of user that has to be deleted'
        })

        return;
    }

    const candidate = await findUserByEmail(email);

    if (!candidate) {
        res.status(400).send({
            error: 'User with this email does not exist'
        })

        return;
    }

    let sqlQuery = 'DELETE FROM users WHERE email=?';

    db.query(sqlQuery, [email], (err, results) => {
        if(err) {
            res.status(400).send({error: err});
            return;
        }

        res.send({
            success: true,
            message: 'successfully deleted the user'
        })
    })
}
