import mysql from 'mysql';
// rest of your code using mysql package


export const db = mysql.createConnection({
    host: 'localhost',
    database:'cashcore',
    user : 'root',
    password : ''
})