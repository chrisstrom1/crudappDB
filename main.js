let express = require("express");
require("dotenv").config();
let PORT = 8004;

let app = express();
app.use(express.json());

let routes = require("./routes.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("Application started on port", PORT);
})

