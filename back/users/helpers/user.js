import {db} from "../../db.js";

export const omitPassword = (user) => {
    if (typeof user !== 'object') {
        return null;
    }

    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
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

export const findUserById = (id) => {
    if (!id) {
        return null;
    }

    let sqlQuery = 'SELECT * FROM users WHERE id=?';

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, [id], (err, results) => {
            if (err) {
                reject({error: err, user: null});
            }

            resolve(results[0]);
        });
    });
}

export const isUserAdminById = async (id) => {
    if (!id) {
        return false;
    }

    const user = await findUserById(id);

    if (!user) {
        return false;
    }

    if (!user.hasOwnProperty('role')) {
        return false;
    }

    return user.role.toLowerCase() === 'admin'
}
