let express = require("express");
let static = express.static("public")

require("dotenv").config();
let PORT = 8004;

let app = express();
app.use(express.json());
app.use(static)
let routes = require("./routes.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("Application started on port", PORT);
})
