const student = require("../controller/student_controller");
const mark = require("../controller/marklist_controller")
const admin = require("../controller/admin-controller")


module.exports = app => {  
    
    
    const router = require("express").Router();  
    router.post("/",admin.authentication, student.createStudent); 
    router.get("/",admin.authentication, student.getAllStudent);
    router.get("/profile",mark.profile )
    router.get("/:id", student.getOneStudent);
    router.put("/:id",student.authenticationStudent, student.updateStudent); 
    router.delete("/:id", student.deleteStudent); 
    
    app.use('/student', router);


  
};