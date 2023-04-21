const express = require("express");
const path = require("path");
const hbs = require("hbs");
const crypto  = require("crypto")
const app = express();

require("./db/conn");

const Register = require("./models/register");
const User = require("./models/user")
const Contact = require("./models/register");
const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

const authTokens = {};
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// const requireAuth = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.render('login');
//     }
// };
app.get("/",(req, res)=>{
   res.render("login")
});

app.post("/",(req, res)=>{
    res.render("index")
 });

app.get("/index",(req, res)=>{
    res.render("index")
});
app.get("/logout",(req,res)=>{
    res.clearCookie("AuthToken")
    res.render("index")
})
app.post('/register', async (req, res) => {
    console.log("register post")
    const { email, name ,password } = req.body; 
    console.log(email,name,password)
    // Check if the password and confirm password fields match
   
     
        // Check if user with the same email is also registered
        // if (User.find({email : email})) {
        //         console.log("user already exist")
        //     res.render('register', {
        //         message: 'User already registered.',
        //         messageClass: 'alert-danger'
        //     });

        //     return;
        // }

       

        // Store user into the database if you are using one
        const newUser = new User(req.body);
  const user = await newUser.save()
        
        res.render('login');
   
});
app.get("/register",(req,res)=>{
    console.log("register get")
    res.render("register")
})
app.get("/learning", (req, res)=>{
    res.render("learning")
});
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login", (req, res)=>{
    const { email, password } = req.body;
    const user = User.find({email : email, password : password});

    
    if (user) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);
          
        // Redirect user to the protected page
        res.render('index');
    } 
    res.redirect("/error")
});

app.post("/contact", async (req,res) =>{
    try {
        const addcontact = new Contact(req.body)
        console.log(req.body);
        const contact= await addcontact.save(); 
        res.status(201).render("index");
    } catch (e) {
        res.status(400).send(e)
    }
})
app.listen(port, () =>{
    console.log(`server is running at prot no ${port} `);
});