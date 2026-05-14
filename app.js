const express = require("express");
const indexRouter = require("./routes/index");
const path = require("node:path");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));


app.use("/", indexRouter);



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})




