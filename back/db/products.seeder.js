import {db} from "../db.js";

// Function to generate a random title
function generateRandomTitle() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let title = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        title += chars.charAt(randomIndex);
    }
    return title;
}

// Function to generate a random description
function generateRandomDescription() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let description = '';
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        description += chars.charAt(randomIndex);
    }
    return description;
}

// Function to generate a random price
function generateRandomPrice() {
    return Math.random() * 1000;
}

// Function to generate a random stock status
function generateRandomStockStatus() {
    return Math.random() < 0.5 ? 0 : 1;
}

// Function to generate a random created_by_id and thumbnail_id
function generateRandomId() {
    return 1;
}

// Generate the SQL insert query for each product
const insertQueries = [];
for (let i = 0; i < 10; i++) {
    const title = generateRandomTitle();
    const description = generateRandomDescription();
    const price = generateRandomPrice();
    const inStock = generateRandomStockStatus();
    const createdBy = generateRandomId();
    const thumbnailId = generateRandomId();

    const insertQuery = `INSERT INTO products 
                        (created_by_id, price, title, description, in_stock, thumbnail_id) 
                        VALUES ('${createdBy}', '${price}', '${title}', '${description}', '${inStock}', '${thumbnailId}')`;
    insertQueries.push(insertQuery);
}

insertQueries.forEach(query => {
    db.query(query, [], (err) => {
        console.log(`ran query ${query}. Errors:`);
        console.log(err)
    })
})
