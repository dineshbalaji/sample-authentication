let Express = require("express");
let Session = require("express-session");

let Path = require("path");
let Api = require("./api");

let App = Express();

// middleware for json response parsing
App.use(Express.json())


/**
 * Middleware for create session to identify user login
 * 
 * check link for more detail about resave, saveUnintialized 
 * https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session 
 * 
 * TODO:
 * by default, ExpressJs use server memmory to store Session info, however i would like to use DB to store it.
 */

App.use(Session({
    secret: "Cat in Wall",  // key for cookie encreption 
    resave: false,
    saveUninitialized: false,
    rolling:true, // enabled for reset expire time on every server request
    cookie: { maxAge: 1000 * 60 * 2 }
}));


App.get("/", (req, res) => {
    res.redirect("/login");
});

App.get('/login', (req, res) => {
    res.sendFile("login.html", { root: Path.join(__dirname, "./pages") });
});


// added Api.verfiyAuth to avoid dashboard access without login
App.get('/dashboard', Api.verifyAuth, (req, res) => {  
    res.sendFile("dashboard.html", { root: Path.join(__dirname, "./pages") });
});

App.use("/api", Api);

App.listen(4200, () => {
    console.log('Server started to Listen');
});


/**
 *  i perpare another server hosting to host 'fishing.html' 
 */

 let hackApp = Express();
 hackApp.get('/',(req,res) =>{
    res.sendFile("hacking.html", { root: Path.join(__dirname) });
 })
 hackApp.listen('4202',()=>{
     console.log('hack server started')
 })
