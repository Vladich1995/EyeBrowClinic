const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");

app.use(bodyParser.json());

app.use("/register", userRoutes);
app.use("/login", userRoutes);


app.listen(3000, function () {
    console.log("Server started on port 3000");
});