let express =  require("express");

let router = express.Router();

let controller = require("./controller")

//list all entries - list a summary for all the entries
router.get("/entries", controller.listEntries)
    
// 4 more routes to come...

//get a specific entry and all its details given an id
router.get("/entries/:id", controller.getEntry);
// add an entry
router.post("/entries", controller.addEntry);
//delete an entry its id
router.delete("/entries/:id", controller.deleteEntry);
//update an entry given its id
router.put("/entries/:id", controller.updateEntry);

module.exports = router;
