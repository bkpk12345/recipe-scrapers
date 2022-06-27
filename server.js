require("dotenv").config();
const express = require("express");
const app = express();
const apiRoutes = express.Router();
const scriptroutes = require("./routes/scripts");

const conn = require("./config/db");
conn();
apiRoutes.use("/scripts", scriptroutes);

app.use("/api", apiRoutes);

const port = process.env.PORT ?? 3001;
app.listen(3001, console.log(`scraping server listening at ${port}`));
