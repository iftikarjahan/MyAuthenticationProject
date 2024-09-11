const express=require("express");
const router=express.Router();
const allControllers=require("../controllers/allControllers");
const authControllers=require("../controllers/auth");

router.get("/",allControllers.page1Controller);

router.get("/signin",authControllers.getSignInController);

router.get("/login",authControllers.getLoginController);

router.post("/submit-signin",authControllers.postSignInController);

module.exports=router;