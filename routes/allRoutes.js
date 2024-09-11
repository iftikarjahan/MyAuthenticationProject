const express=require("express");
const router=express.Router();
const allControllers=require("../controllers/allControllers");
const authControllers=require("../controllers/auth");

router.get("/",allControllers.page1Controller);

router.get("/signin",authControllers.getSignInController);

router.get("/login",authControllers.getLoginController);

router.post("/submit-login",authControllers.postLoginController);

router.post("/submit-signin",authControllers.postSignInController);

router.get("/after-login-page",allControllers.getAfterLoginController);

router.post("/logout",authControllers.postLogoutController);

module.exports=router;