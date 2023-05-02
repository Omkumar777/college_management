const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require("./model/connection.js");
db.sequelize.sync();

require("./router/studentRouter.js")(app);
require("./router/Marklist.js")(app);
require("./router/adminrouter.js")(app);




const PORT = 8080;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});

