var Express = require("express");
var db = require("./DBconnection");

var api = Express.Router();

api.post("/login", (req, res) => {
    let data = req.body;

    db.getUser(data.userId).then((row) => {

        if (!row) {
            res.statusCode = 404;
        }
        else if (data.password !== row.password) {
            res.statusCode = 204;
        } else {
            req.session.loggedIn = true;
            req.session.userId = data.userId;
            res.statusCode = 200;
        }

        res.send();
    }, error => {
        res.statusCode = 500;
        res.send();
    });
});
api.get("/logout",(req,res)=>{

    req.session.destroy((err)=>{
        if(err) {
            res.statusCode = 500;
        }

        res.statusCode = 200;
        res.send();
    });
})

// Middleware 
api.verifyAuth = function (req, res, next) {
    if (req.session.loggedIn) { next(); }
    else {
        res.redirect("/login");
    }
}



module.exports = api;