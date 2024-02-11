const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res) => {
    const sql = `SELECT * FROM data`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
});

app.post('/data', (req, res) => {
    const { name, occupation, salary } = req.body;
    const sql = `INSERT INTO data (name, occupation, salary) VALUES (?, ?, ?)`;
    db.query(sql, [name, occupation, salary], (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Data added successfully');
    });
});

app.put('/data/:id', (req, res) => {
    const id = req.params.id;
    const { name, occupation, salary } = req.body;
    const sql = `UPDATE data SET name=?, occupation=?, salary=? WHERE id=?`;
    db.query(sql, [name, occupation, salary, id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Data updated successfully');
    });
});

app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM data WHERE id=?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Data deleted successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});