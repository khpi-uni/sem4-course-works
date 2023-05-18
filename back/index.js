const express = require('express');
const mysql = require('mysql');
const {userRouter} = require("./routes/users");

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'database', // This refers to the Docker Compose service name of the MySQL database container
    user: 'db_user',
    password: 'St*TQ9we21m08Qm',
    database: 'app_db',
});

// Endpoint to retrieve users
app.get('/api/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.status(500).json({ error: 'Failed to connect to the database' });
        }

        const query = 'SELECT * FROM users';

        connection.query(query, (error, results) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
                console.error('Error executing MySQL query:', error);
                return res.status(500).json({ error: 'Failed to retrieve users from the database' });
            }

            res.json(results);
        });
    });
});

app.use('/users', userRouter)


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
