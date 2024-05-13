const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = 2900;
const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
})

app.post('/signup', (req, res) => {
    const {userName, email, password} = req.body
    db.execute(`
    insert into users (name, email, password) 
    values ('${userName}', '${email}', '${password}')
    `)
    res.json({message: 'added successfully'})
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    db.execute(
        `select * from users where email='${email}' and password='${password}'`,
        (err, data) => {
            if(err) {
                res.json({error: "error", err})
            }
            if(data.length > 0) {
                res.json({message: "Success"})
            } else {
                res.json({message: "faile"})
            }
        }
        )
})

app.listen(port, () => console.log(`Server is Running on ${port} ....`))