const Admin = require("../controller/admin-controller")


module.exports = app => {  
    
    
    const router = require("express").Router();  
    router.post("/addAdmin", Admin.createAdmin); 
    router.get("/getAllAdmin",Admin.authentication, Admin.getAllAdmin);
    router.post("/login",Admin.login)
    
    
    app.use('/', router);


  
};