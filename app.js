const express = require("express");
const indexRouter = require("./routes/index");
const api = require("./routes/api");
const path = require("node:path");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/api", api);



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})




