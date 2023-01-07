const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require("cors");

const connection = mysql.createConnection({
    user: "uvmyzfiv7n6mmo9h",
    host: "b5uf5p85y0a91d1pqulb-mysql.services.clever-cloud.com",
    password: "Ogp4IWpylMYijL5WI5wT",
    database: "b5uf5p85y0a91d1pqulb"
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/blogs', (request, response) => {
    const { title, content } = request.body;
    const sql = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
    connection.query(sql, [title, content], (error, result) => {
        if (error) throw error;
        response.send({
            message: 'Blog post created successfully.',
            data: result
        });
    });
});


app.get('/api/blogs/:id', (request, response) => {
    const sql = `SELECT * FROM blogs WHERE id = ${request.params.id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        response.send(result[0]);
    });
});

app.get('/api/blogsposts', (request, response) => {
  const sql = 'SELECT * FROM blogs';
  connection.query(sql, (error, result) => {
    if (error) throw error;
    response.send({
        message: 'Blog posts fetched successfully.',
        data: result
    });
  });
});

app.put('/api/blogs/:id', (request, response) => {
    const { title, content } = request.body;
    const sql = `UPDATE blogs SET title = ?, content = ? WHERE id = ?`;
    connection.query(sql, [title, content, request.params.id], (error, result) => {
        if (error) throw error;
        response.send({
            message: 'Blog post updated successfully.',
            data: result
        });
    });
});


app.delete('/api/blogs/:id', (request, response) => {
    const sql = `DELETE FROM blogs WHERE id = ?`;
    connection.query(sql, [request.params.id], (error, result) => {
        if (error) throw error;
        response.send({
            message: 'Blog post deleted successfully.',
            data: result
        });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
