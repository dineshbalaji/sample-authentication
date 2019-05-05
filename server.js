let Express = require("express");
let App = Express();
let Session = require("express-session");

App.use(Express.json())

https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session
//TODO:session store into DB instead of server memmory
App.use(Session({
    secret: "Cat in Wall",
    resave: false,
    saveUninitialized: false,
    rolling:true,
    cookie: { maxAge: 1000 * 60 * 1 }
}));

let Path = require("path");
let api = require("./api");


App.get("/", (req, res) => {
    res.redirect("/login");
});

App.get('/login', (req, res) => {
    res.sendFile("login.html", { root: Path.join(__dirname, "./pages") });
});


App.get('/dashboard', api.verifyAuth, (req, res) => {
  
    res.sendFile("dashboard.html", { root: Path.join(__dirname, "./pages") });
    
});



App.use("/api", api);

App.listen(4200, () => {
    console.log('Server started to Listen');
});
