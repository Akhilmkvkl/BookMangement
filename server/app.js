const express = require("express");
const fs = require('fs');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");



app.use(express.json());
app.use(cors());


const userrouter = require('./routes/userRouter')
const adminrouter = require('./routes/adminRouter')



app.use('/users', userrouter)
app.use('/admin', adminrouter)

const bookData = JSON.parse(fs.readFileSync('../server/data/Books.json'));
const userData = JSON.parse(fs.readFileSync('../server/data/Users.json'));
const books = bookData.Books
console.log(books);

module.exports = {
    books: bookData.Books,
    users: userData.Users
};

const PORT = 4000

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
