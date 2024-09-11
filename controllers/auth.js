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

exports.postLoginController=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    // console.log(req.session);
    
    /*
    ->If the email is already present in the users collection, only then login the user
    ->if email not present, redirect to the signIn page
    */ 
   const db=getDb();
   db.collection("users").findOne({email:email}).then(userDoc=>{
    if(!userDoc){
        return res.redirect("/signin");
    }
    else{
        // if I get the user, the I first need to confirm the password
        bcrypt.compare(password,userDoc.password).then(result=>{
            if(result){//password matched->create a new session for the user
                req.session.isLoggedIn=true;
                req.session.user=userDoc;
                //now save the session in db
                req.session.save(err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/after-login-page");
                    }
                })

            }else{
                return res.redirect("/login");
            }
        }).catch(err=>{
            console.log(err);
        })
    }
   }).catch(err=>{
    console.log(err);
   })
}

exports.postLogoutController=(req,res,next)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err);
        }
        else{
            res.clearCookie('connect.sid');  //clearing the cookie explicitly
            res.redirect("/");
        }
    })
}