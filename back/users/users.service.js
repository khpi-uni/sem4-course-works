import {findUserByEmail, omitPassword, retrieveAllUsers} from "./helpers/user.js";
import {db} from "../db.js";
import {hashPassword} from "../auth/helpers/password.js";
import {
    processOrdersOfUser,
    processOrderWithProducts,
    retrieveAllOrdersForUserById,
    retrieveOrdersWithItemsByUserId
} from "../orders/helpers/order.js";

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

    db.query(sqlQuery, [email], (err) => {
        if (err) {
            res.status(400).send({error: err});
            return;
        }

        res.send({
            success: true,
            message: 'successfully deleted the user'
        })
    })
}


export const editUser = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).send({
            error: 'email is required'
        })

        return;
    }

    const candidate = await findUserByEmail(email);

    if (!candidate) {
        res.status(400).send({
            error: 'user with this email does not exist'
        });

        return;
    }

    let {
        newEmail,
        password: newPassword,
        shippingAddress: newShippingAddress,
        billingAddress: newBillingAddress,
        role: newRole,
        blacklistStatus: newBlacklistStatus
    } = req.body;

    // additional validation
    if (newRole !== 'admin' && newRole !== 'client') {
        newRole = null;
    }

    const newUser = {
        email: newEmail ?? candidate.email,
        password: newPassword ? hashPassword(newPassword) : candidate.password,
        shippingAddress: newShippingAddress ?? candidate.shipping_address,
        billingAddress: newBillingAddress ?? candidate.billing_address,
        role: newRole ?? candidate.role,
        blacklistStatus: newBlacklistStatus ?? candidate.is_blacklisted
    };

    let sqlQuery = 'UPDATE users SET email = ?, password = ?, shipping_address = ?, billing_address = ?, role = ?, is_blacklisted = ? WHERE id = ?';

    db.query(sqlQuery, [...Object.values(newUser), candidate.id], (err, results) => {
        if (err) {
            res.status(400).send({
                error: err
            })

            return;
        }

        res.send({
            message: 'user was successfully edited',
            newUser: omitPassword(newUser),
            results
        })
    })
}

export const getCurrentUser = async (req, res) => {
    if (!req.user) {
        res.status(400).send({
            error: 'Invalid token, user with such id does not exist'
        })

        return;
    }

    res.send({
        ...omitPassword(req.user),
        orders: await retrieveAllOrdersForUserById(req.user.id)
    })
}

export const addUserToBlacklist = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).send({
            error: 'Email is required'
        });

        return;
    }

    const candidate = await findUserByEmail(email);

    if (!candidate) {
        res.status(400).send({
            error: 'user with this email does not exist'
        });

        return;
    }

    let sqlQuery = 'UPDATE users SET is_blacklisted = 1 WHERE email = ?';

    db.query(sqlQuery, [email], (err) => {
        if (err) {
            res.status(400).send({
                error: err
            });

            return;
        }

        res.status(200).send({
            status: 'success',
            message: 'user was successfully blacklisted'
        })
    })
}

export const removeUserFromBlacklist = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).send({
            error: 'Email is required'
        });

        return;
    }

    const candidate = await findUserByEmail(email);

    if (!candidate) {
        res.status(400).send({
            error: 'user with this email does not exist'
        });

        return;
    }

    let sqlQuery = 'UPDATE users SET is_blacklisted = 0 WHERE email = ?';

    db.query(sqlQuery, [email], (err) => {
        if (err) {
            res.status(400).send({
                error: err
            });

            return;
        }

        res.status(200).send({
            status: 'success',
            message: 'user was successfully removed from blacklist'
        })
    })
}

export const getOrdersOfUser = async (req, res) => {
    const {id} = req.query;

    if (!id) {
        res.status(400).send({
            error: 'id is required'
        })

        return;
    }

    const response = await retrieveOrdersWithItemsByUserId(id);

    if(!response.orders) {
        res.status(400).send({
            orders: null
        })

        return;
    }

    res.send(processOrdersOfUser(response.orders))
}