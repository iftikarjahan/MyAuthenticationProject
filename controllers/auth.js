const getDb=require("../util/database").getDb;
const bcrypt=require("bcrypt");
const User=require("../model/user");


exports.getSignInController=(req,res,next)=>{
    res.render("signIn");
}

exports.getLoginController=(req,res,next)=>{
    res.render("login");
}

exports.postSignInController=(req,res,next)=>{
    console.log(req.body);
    
    // extracting the user credentials
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    /*
    ->Once you have extracted the user credintials, create a database user
        ->If user already exists, redirect to signin page
        ->if not, craete a new document
    */ 
    const db=getDb();
    db.collection("users").findOne({email:email}).then(user=>{
        if(user){
            return res.redirect("/signIn");
        }
        else{
            return bcrypt.hash(password,12).then(hashedPassword=>{
                // using this hashed password, I need to create the user and store in db
                const newUser=new User(name,email,hashedPassword);
                return newUser.save();   //save() method returns a promise
            }).then(result=>{
                res.redirect("/login");
            })
        }
    }).catch(err=>{
        console.log(err);
    })
    
}