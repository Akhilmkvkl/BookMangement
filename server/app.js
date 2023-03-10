const express = require("express");

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");



app.use(express.json());
app.use(cors());


const userrouter = require('./routes/userRouter')
const adminrouter = require('./routes/adminRouter')



app.use('/users', userrouter)
app.use('/admin', adminrouter)



const PORT = 4000

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
