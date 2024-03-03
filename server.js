const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Currently listens on local port 3000
const port = 3000;

// Grabs params from req.query (GET) or req.body (POST, PUT, DELETE)
app.use(bodyParser.json());
// Grabs params from URL
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
const restaurantRouter = require("./src/routes/restaurant");
const foodRouter = require("./src/routes/food");

// Add url endpoints here
app.use("/api/restaurant", restaurantRouter);
app.use("/api/food", foodRouter);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
