import {db} from "../db.js";
import {hashPassword} from "../auth/helpers/password.js";

// Function to generate a random email address
function generateRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        email += chars.charAt(randomIndex);
    }
    return email + '@example.com';
}

// Function to generate a random address
function generateRandomAddress() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let address = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        address += chars.charAt(randomIndex);
    }
    return address;
}

// Generate the hashed password using bcrypt
const hashedPassword = hashPassword('test');

// Generate the SQL insert query for each user
const insertQueries = [];
for (let i = 0; i < 10; i++) {
    const email = generateRandomEmail();
    const shippingAddress = generateRandomAddress();
    const billingAddress = generateRandomAddress();

    const insertQuery = `INSERT INTO users (email, password, shipping_address, billing_address) 
                       VALUES ('${email}', '${hashedPassword}', '${shippingAddress}', '${billingAddress}')`;
    insertQueries.push(insertQuery);
}

insertQueries.forEach(query => {
    db.query(query, [], (err) => {
        console.log(`ran query ${query}. Errors:`);
        console.log(err)
    })
})
