`const express = require("express");
const cors = require("cors");
const {itemRoute,supplierRoute} = require("./routes/routes");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('uploads'))
app.use(cors());

dbConnection();
app.use("/",supplierRoute);
app.use("/",itemRoute);
app.listen(process.env.PORT, () => {
  console.log("server is running on 4000");
});
`