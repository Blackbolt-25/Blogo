import express from "express";
import pg from "pg";

//Const terms
const __dirname = import.meta.dirname;
const port=3000;
var app = express();
const pool = new pg.Pool({
  user:"sharodhrao",
  password:"shashi24",
  database:"sharodhrao",
  host:"localhost",
});


//App Specific constants
var username;
var password;
var posts;

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.get("/",async(req,res)=>{
  const client=await pool.connect();
  const result=await client.query("SELECT * FROM posts");
  posts=result.rows;
  if(username && password)
    res.render("home.ejs",{"username":username,data:result.rows});
  else
    res.render("home.ejs",{data:result.rows});
});

app.get("/login",(req,res)=>{
  res.render("login.ejs");
})

app.get("/login/signup",(req,res)=>{
  res.render("login.ejs",{signup:1}); 
});

app.post("/login", async (req,res)=>{
  try{
    const client=await pool.connect();
    const result=await client.query(`SELECT * from users WHERE username='${req.body.username}';`);
    client.release();
    if(result.rowCount && result.rows[0].password == req.body.password)
    {
      username=req.body.username;
      password=req.body.password;
      res.render("home.ejs",{once:1 ,username:username,data:posts});
    }
    else
      res.render("login.ejs",{once:1});
  } 
  catch(error){
    console.log(error);
  }
});

app.post("/login/signup",async (req,res)=>{
  try{
    const client=await pool.connect();
    const result=await client.query(`INSERT INTO public.users (username,password) VALUES ('${req.body.username}','${req.body.password}');`);
    client.release();
    res.redirect("/");
    console.log(result);
  }
  catch(error){
    console.log(error);
  }
});

app.post("/post/submit",async(req,res)=>{
  const header=req.body.Header;   
  const blog=req.body.Blog;
  console.log("Yo");
  try{
    const client=await pool.connect();
    const result=await client.query(`INSERT INTO public.posts VALUES ('${username}','${header}','${blog}');`);
    client.release();
    console.log(result);
    res.redirect("/");
  }
  catch(error){
    console.log(error);
  }
});

app.get("/logout",async(req,res)=>{
  username=null; 
  password=null;
  res.redirect("/");
});

app.get("/post",(req,res)=>{
  res.render("new.ejs",{username:username});
});


app.listen(port,(res)=>{
  console.log("Listening on port no ",port);
});
