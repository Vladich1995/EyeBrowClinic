const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const procedureRoutes = require("./routes/procedure-routes");
const aboutRoutes = require("./routes/about-routes");
const scheduleRoutes = require("./routes/schedule-routes");

app.use(bodyParser.json({limit: '50mb'}));

app.use("/register", userRoutes);
app.use("/login", userRoutes);
app.use("/procedure", procedureRoutes);
app.use("/certificate", aboutRoutes);
app.use("/portfolio", aboutRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/schedule", scheduleRoutes);


app.listen(3000, function () {
    console.log("Server started on port 3000");
});