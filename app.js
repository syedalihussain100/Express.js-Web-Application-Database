const express = require('express');
const chalk = require('chalk');
const exphbs  = require('express-handlebars');
const path = require("path");
const bodyParser = require('body-parser')
const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/Demo-Web', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected",function(){
    console.log("mongo db successfully connected");
});

const RecipeSchema = new Schema({
    title: String,
    body: String
})

let Recipes = mongoose.model("recipes",RecipeSchema);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


///// middleware using//////

app.use(function(req,res,next){
    next();
})


////// middleware of static////
app.use( express.static(path.join(__dirname, 'public')))


//// middleware of handlebars////
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.get('/',function(req,res){
  res.render("home");  
})


app.get('/about',function(req,res){
    res.render("about")
})

app.get('/contact',function(req,res){
    res.render("contact")
})

app.get('/add/React',function(req,res){
    res.render("express/add");
})

app.post('/add/React',function(req,res){
    let recipe = {
        title: req.body.title,
         body: req.body.body
    }
    new Recipes(recipe).save(function(err,recipe){
        if(err) console.log(err);
        res.redirect("/");

    })
})




app.listen(3000,function(){
    console.log(chalk.red("Your Server started at 3ooo"));
});