exports.page1Controller=(req,res,next)=>{
    res.render("page1");
}

exports.getAfterLoginController=(req,res,next)=>{
    if(req.session.isLoggedIn){
        res.render("afterLogin",{
            isAutheticated: req.session.isLoggedIn,
            userName: req.session.user.name,
            userEmail: req.session.user.email
        });
    }
    else{
        res.render("login");
    }
}