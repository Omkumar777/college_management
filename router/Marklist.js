const mark = require("../controller/marklist_controller")
const admin = require("../controller/admin-controller");


module.exports = app => {  
    
    
    const router = require("express").Router();  
    router.post("/addSemOneMark",admin.authentication,mark.createSemOne);
    router.post("/addSemTwoMark",admin.authentication,mark.createSemTwo);
    router.post("/addSemThreeMark",admin.authentication,mark.createSemThree);
    router.post("/addSemFourMark",admin.authentication,mark.createSemFour);
    router.post("/addSemFiveMark",admin.authentication,mark.createSemFive);
    router.post("/addSemSixMark",admin.authentication,mark.createSemSix);
    router.post("/semOneMark",admin.authentication, mark.updateSemOne)
    // router.get("/",mark.getSemOne),
    
   
    router.post("/uploadSemOne",admin.authentication,mark.uploadSemOneMarklist);
    router.post("/uploadSemTwo",admin.authentication,mark.uploadSemTwoMarklist);
    router.post("/uploadSemThree",admin.authentication,mark.uploadSemThreeMarklist);
    router.post("/uploadSemFour",admin.authentication,mark.uploadSemFourMarklist);
    router.post("/uploadSemFive",admin.authentication,mark.uploadSemFiveMarklist);
    router.post("/uploadSemSix",admin.authentication,mark.uploadSemSixMarklist);
    router.post("/:id",admin.authentication,mark.giveTc)


    app.use('/marklist', router);


  
};