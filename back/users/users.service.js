import {db} from "../db.js";
import {omitPassword} from "./helpers/user.js";

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

export const retrieveAllUsers = () => {
    let sqlQuery = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [], (err, results) => {
            if (err) {
                reject({error: err, users: null});
            } else if (!Array.isArray(results)) {
                reject({error: 'Database did not return array for users', users: null});
            } else {
                resolve({users: results});
            }
        });
    });
}

export const findUserByEmail = (email) => {
    if (!email) {
        return null;
    }

    let sqlQuery = 'SELECT * FROM users WHERE email=?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [email], (err, results) => {
            if (err) {
                reject({error: err, user: null});
            }

            resolve(results[0]);
        });
    });
}