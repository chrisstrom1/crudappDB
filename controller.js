let db = require("./db");

let listEntries = function(req, res){

    let sql = "SELECT id, label, done FROM entries;"

    db.query(sql, function(error, results){
    // what to do once query results come back
    // if something went wrong then;
    //print the error in the logs to help us debug and return the status code 500

    //if nothing went wrong, then return the results on the response

    if(error){
        console.error("Failed to get items: ", error);
        res.sendStatus(500);
    } else {
        res.json(results);
    }
        // console.log(results);
        // res.json(results);
});

    

}

//sql: select * from entries where id = 5

let getEntry = function(req, res){
// get the id from the request
// create the sql query we want to send to the db

// once the query is done running
// - check if the error object is empty, if not return a status 500
// - in no error then
// check if the results array has size 0 - then return null
// check if the results array has size greater than 1 - then return status 500
// otherwise, it must mean that i have a result of size 1, return the entry not the array


let id = req.params.id;
let sql = "select * from entries where id = ?"; 
let params = (id);


db.query(sql, params, function(error, results){
if(error){
    console.error("Could not fetch entry", error);
    res.sendStatus(500);
}else if(results.length == 0) {
    res.json(undefined);
}else if (results.length > 1){
    console.error("fetched more than 1 results for id", id);
    res.sendStatus(500);
 }else{
    res.json(results[0]);
 }


});




}

let addEntry = function(req, res){

    let label = req.body.label;
    let note = req.body.note;

    let sql = "insert into entries(label, entries) value (?, ?)";
    let params = [label, note];

    db.query(sql, params, function(){
        if(error){
            console.error("Did not add entry to database", error);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);

        }
        });
}


let deleteEntry = function(req, res){
    let id = req.params.id;
    let sql = "delete from entries where id = ?"
    let params = [id];

    db.query(sql, params, function(error, result){
       if(error){
        console.error("Could not delete entry", error);
        res.sendStatus(500);
       } else {
        res.sendStatus(204);
       
       }
    });
}
    
let updateEntry = function(req, res){
    // we want to get the id from the request path param
    // we want the label, note and done flag from the body

    let id = req.params.id;
    let label = req.body.label;
    let note = req.body.note;
    let done = (req.body.done == true)  // we do this to accept true for true, or false for literally anything else

    let sql = "update entries set lable = ?, done = ?, where id = ?"
    let params = [label, note, done, id];

    db.query(sql, params, function(error, results){
       if(error){
        console.error("Could not update an entry", error);
        res.sendStatus(500);

       } else {
        res.sendStatus(204);
       
       }
    });
}

module.exports = {
 listEntries,
 getEntry,
 deleteEntry,
 addEntry,
 updateEntry
}
