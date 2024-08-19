const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username: "Science College",
        message: "Consistency is the key of success",
    },
    {
        id: uuidv4(),
        username: "Roshan surya",
        message: "sigma male",
    },
    {
        id: uuidv4(),
        username: "Alex dev",
        message: "This is the class of REST",
    },
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req,res)=>{
    let {username, message} = req.body;
    let id = uuidv4();
    posts.push({ id,  username, message});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id=== p.id);
    console.log(post);
    if(post){
        res.render("id.ejs", {post, id});
    }else{
        res.render("error.ejs");
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newMessage = req.body.message;
    let post = posts.find((P) => id === P.id);
    post.message = newMessage;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id=== p.id);
    res.render("edit.ejs" , { post });
});

app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`Listening port on ${port}`);
});