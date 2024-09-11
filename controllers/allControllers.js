exports.page1Controller = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render("page1", {
            isAuthenticated: req.session.isLoggedIn,
            userName: req.session.user.name,
            userEmail: req.session.user.email,
        });
    }
    else{
        res.render("page1",{
            isAuthenticated:false
        });
    }
};

exports.getAfterLoginController = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.render("afterLogin", {
      isAuthenticated: req.session.isLoggedIn,
      userName: req.session.user.name,
      userEmail: req.session.user.email,
    });
  } else {
    res.render("login");
  }
};
