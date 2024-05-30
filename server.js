import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
// Currently listens on local port 3000
const port = 3000;

// Routers
import restaurantRouter from "./src/routes/restaurant.js";
import foodRouter from "./src/routes/food.js";
import templateRouter from "./src/routes/template.js";
import userRouter from "./src/routes/user.js";

// Grabs params from req.query (GET) or req.body (POST, PUT, DELETE)
app.use(express.json());
// Grabs params from URL
app.use(bodyParser.urlencoded({ extended: false }));

// Add url endpoints here
app.use("/api/template", templateRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

// Run node server.js in terminal to run
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
