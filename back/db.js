import mysql from "mysql";

export const db = mysql.createPool({
    host: 'database', // This refers to the Docker Compose service name of the MySQL database container
    user: 'db_user',
    password: 'St*TQ9we21m08Qm',
    database: 'app_db',
});