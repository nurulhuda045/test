const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');
const bookRouter = require('./router/book')
const cors = require('cors')


const port = 3001;
const app = express();

app.use(cors())
app.use(express.json());
app.use(userRouter);
app.use(bookRouter);



app.get("/", async (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
});