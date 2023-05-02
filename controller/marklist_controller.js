const db = require("../model/connection");
const Student = db.student;
const SemesterOne = db.semesterOne;
const semesterTwo = db.semesterTwo;
const semesterThree = db.semesterThree;
const semesterFour = db.semesterFour;
const semesterFive = db.semesterFive;
const semesterSix = db.semesterSix;
const nodemailer = require('nodemailer');
const PDFGenerator = require('pdfkit')
const fs = require('fs');
const { throws } = require("assert");
const { error } = require("console");
const jwt = require("jsonwebtoken")
const joi = require("joi");
const path = require('path');
const multer = require('multer');
const xlsx = require("xlsx")




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omkumar@xponential.digital',
    pass: 'opvlzarbtphyoqbu'
  }
});

function format(data, status = 200, message = 'ok') {
  return { status, message, data }
}

function sendmail(toMail, toparent, mark1, mark2, mark3, mark4, mark5, mark6, total, sem) {
  const mailOptions = {
    from: 'omkumar@xponential.digital',
    to: `${toMail},${toparent}`,
    subject: 'Marklist ',
    text: `Here is a Marklist for your semester - ${sem} \n Mark1 : ${mark1} \n Mark2 : ${mark2} \n Mark3 : ${mark3} \n Mark4 : ${mark4} \n Mark5 : ${mark5} \n Mark6 : ${mark6} \n Total : ${total}`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
function sendTc(mail) {

  const mailOptions1 = {
    from: 'omkumar@xponential.digital',
    to: mail,
    subject: 'Transfer certificate   ',
    text: `Tc`,
    attachments: [{
      filename: 'Tc.pdf',
      path: "./Tc.pdf",
      contentType: 'application/pdf'
    }],
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function validate(data) {
  const valid = joi.object({
    mark1: joi.number().min(0).max(100).required(),
    mark2: joi.number().min(0).max(100).required(),
    mark3: joi.number().min(0).max(100).required(),
    mark4: joi.number().min(0).max(100).required(),
    mark5: joi.number().min(0).max(100).required(),
    mark6: joi.number().min(0).max(100).required(),
    studentId: joi.number().required(),
    modifiedBy: joi.string()
  })
  return valid.validate(data)
}
function validateForUpdate(data) {
  const valid = joi.object({
    mark1: joi.number().min(0).max(100).optional(),
    mark2: joi.number().min(0).max(100).optional(),
    mark3: joi.number().min(0).max(100).optional(),
    mark4: joi.number().min(0).max(100).optional(),
    mark5: joi.number().min(0).max(100).optional(),
    mark6: joi.number().min(0).max(100).optional(),
    studentId: joi.number().required(),
  })
  return valid.validate(data)
}

const createSemOne = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details))

    const stu = await Student.findByPk(info.studentId);

    const sem1 = await SemesterOne.findOne({ where: { studentId: info.studentId } })

    if (!(sem1 == null)) return res.json(format(null, 500, 'Student completed degree'))

    const mark = await SemesterOne.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
    res.json(format(mark, 200, 'ok'))


  }

  catch (error) {
    res.json(format(null, 500, error)).status(500);
  }


}
const createSemTwo = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details))
    const stu = await Student.findByPk(info.studentId);
    const sem2 = await semesterTwo.findOne({ where: { studentId: info.studentId } })

    if (!(sem2 == null)) return res.json(format(null, 500, 'Student mark already added'))

    const mark = await semesterTwo.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 2);
    res.json(format(mark, 200, 'ok'));

  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}
const createSemThree = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details));

    const stu = await Student.findByPk(info.studentId);
    const sem3 = await semesterThree.findOne({ where: { studentId: info.studentId } })

    if (!(sem3 == null)) return res.json(format(null, 500, 'Student mark already added'))
    
    const mark = await semesterThree.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 3);
    res.json(format(mark, 200, 'ok'))
  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}
const createSemFour = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details));
    const stu = await Student.findByPk(info.studentId);
    const sem4 = await semesterFour.findOne({ where: { studentId: info.studentId } })

    if (!(sem4 == null)) return res.json(format(null, 500, 'Student mark already added'))


    const mark = await semesterFour.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 4);
    res.json(format(mark, 200, 'ok'))

  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}
const createSemFive = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details));
    const stu = await Student.findByPk(info.studentId);
    const sem5 = await semesterFive.findOne({ where: { studentId: info.studentId } })

    if (!(sem5 == null)) return res.json(format(null, 500, 'Student mark already added'))

    const mark = await semesterFive.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 5);
    res.json(format(mark, 200, 'ok'))

  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}
const createSemSix = async (req, res) => {
  try {
    let info = {
      mark1: req.body.mark1,
      mark2: req.body.mark2,
      mark3: req.body.mark3,
      mark4: req.body.mark4,
      mark5: req.body.mark5,
      mark6: req.body.mark6,
      studentId: req.body.studentId,
      modifiedBy: req.body.admin
    }

    const result = validate(info);

    if (result.error) return res.json(format(null, 404, result.error.details));
    const stu = await Student.findByPk(info.studentId);

    const sem6 = await semesterSix.findOne({ where: { studentId: info.studentId } })

    if (!(sem6 == null)) return res.json(format(null, 500, 'Student mark already added'))

    const mark = await semesterSix.create(info);
    sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 6);
    res.json(format(mark, 200, 'ok'))

  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}

const updateSemOne = async (req, res) => {
  let info = req.body;
  const result = validateForUpdate(info);

  if (result.error) return res.json(format(null, 500, result.error.details))

  const mark = await SemesterOne.update(info, { where: { studentId: info.studentId } })
  res.json(format(info)).status(200)

}

const getSemOne = async (req, res) => {
  try {
    const semOne = await SemesterOne.findAll({ include: { model: Student } });
    res.json(format(semOne, 200, null)).status(200);
  } catch (error) {

    res.status(404).json(format(null,404,error))
  }
}


const giveTc = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { id: req.params.id } });


    const sem1 = await SemesterOne.findOne({ where: { studentId: student.id } })
    const sem2 = await semesterTwo.findOne({ where: { studentId: student.id } })
    const sem3 = await semesterThree.findOne({ where: { studentId: student.id } })
    const sem4 = await semesterFour.findOne({ where: { studentId: student.id } })
    const sem5 = await semesterFive.findOne({ where: { studentId: student.id } })
    const sem6 = await semesterSix.findOne({ where: { studentId: student.id } })

    if (sem1 != null && sem2 != null && sem3 != null && sem4 != null && sem5 != null && sem6 != null) {


      const sem1_cgpa = (sem1.mark1 + sem1.mark2 + sem1.mark3 + sem1.mark4 + sem1.mark5 + sem1.mark6) / 60;
      const sem2_cgpa = (sem2.mark1 + sem2.mark2 + sem2.mark3 + sem2.mark4 + sem2.mark5 + sem2.mark6) / 60;
      const sem3_cgpa = (sem3.mark1 + sem3.mark2 + sem3.mark3 + sem3.mark4 + sem3.mark5 + sem3.mark6) / 60;
      const sem4_cgpa = (sem4.mark1 + sem4.mark2 + sem4.mark3 + sem4.mark4 + sem4.mark5 + sem4.mark6) / 60;
      const sem5_cgpa = (sem5.mark1 + sem5.mark2 + sem5.mark3 + sem5.mark4 + sem5.mark5 + sem5.mark6) / 60;
      const sem6_cgpa = (sem6.mark1 + sem6.mark2 + sem6.mark3 + sem6.mark4 + sem6.mark5 + sem6.mark6) / 60;
      const total_cgpa = ((sem1_cgpa + sem2_cgpa + sem3_cgpa + sem4_cgpa + sem5_cgpa + sem6_cgpa) / 6).toFixed(1);



      const generateTc = new PDFGenerator

      generateTc.pipe(fs.createWriteStream('Tc.pdf'))

      generateTc.text(`\n ABC College of Arts and Science \n\n\n\n\n\n Transfer certificate for  ${student.name} \n\n\n\n Semester one \n Subject one - ${sem1.mark1} \n Subject two - ${sem1.mark2} \n Subject three - ${sem1.mark3} \n Subject four - ${sem1.mark4} \n Subject five - ${sem1.mark5} \n  Subject six - ${sem1.mark6} \n \n
  Semester two \n Subject one - ${sem2.mark1} \n Subject two - ${sem2.mark2} \n Subject three - ${sem2.mark3} \n Subject four - ${sem2.mark4} \n Subject five - ${sem2.mark5} \n  Subject six - ${sem2.mark6} \n \n
  Semester three \n Subject one - ${sem3.mark1} \n Subject two - ${sem3.mark2} \n Subject three - ${sem3.mark3} \n Subject four - ${sem3.mark4} \n Subject five - ${sem3.mark5} \n  Subject six - ${sem3.mark6} \n \n
  Semester four \n Subject one - ${sem4.mark1} \n Subject two - ${sem4.mark2} \n Subject three - ${sem4.mark3} \n Subject four - ${sem4.mark4} \n Subject five - ${sem4.mark5} \n  Subject six - ${sem4.mark6} \n \n
  Semester five \n Subject one - ${sem5.mark1} \n Subject two - ${sem5.mark2} \n Subject three - ${sem5.mark3} \n Subject four - ${sem5.mark4} \n Subject five - ${sem5.mark5} \n  Subject six - ${sem5.mark6} \n \n
  Semester six \n Subject one - ${sem6.mark1} \n Subject two - ${sem6.mark2} \n Subject three - ${sem6.mark3} \n Subject four - ${sem6.mark4} \n Subject five - ${sem6.mark5} \n  Subject six - ${sem6.mark6} \n \n \n \n 
    Total cgpa = ${total_cgpa}
  `, {
        bold: true,
        align: 'center'
      })


      generateTc.end();
      sendTc(student.personal_mail);
      res.status(200).json(format(null,200,"Tc generated and sent "))
    }
    else {
      res.status(404).json(format(null,404,"Student didn't complete degree"))
    }
  } catch (error) {
    res.status(404).json(format(null,404,error))
  }
}

const profile = async (req, res,) => {
  const token = req.headers['authorization']
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN, async (err, user) => {
    if (err) {
      return res.status(403).json(format(null,403,err));
    }
    try {

      const data = await Student.findOne({ where: { username: user.username, password: user.password } })

      
      if (data == null) return res.status(404).json(format(null, 404, "username or password is incorrect"))


      const sem1 = await SemesterOne.findOne({ where: { studentId: data.id } })
      const sem2 = await semesterTwo.findOne({ where: { studentId: data.id } })
      const sem3 = await semesterThree.findOne({ where: { studentId: data.id } })
      const sem4 = await semesterFour.findOne({ where: { studentId: data.id } })
      const sem5 = await semesterFive.findOne({ where: { studentId: data.id } })
      const sem6 = await semesterSix.findOne({ where: { studentId: data.id } })




      res.status(200).json(format({ data, sem1, sem2, sem3, sem4, sem5, sem6 }));

    }
    catch (err) {
      res.status(500).json(format(null, 500,err))
    }


  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {


    cb(null, 'uploads')
  },
  filename:
    function (req, file, cb) {
      cb(null, "excel1" + path.extname(file.originalname))
    }
})
let maxSize = 20 * 1000 * 1000

let upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {

    let filetypes = /xlsx|sheet|csv/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the following filetypes: " + filetypes)

  }
}).single("mark")

const uploadSemOneMarklist = async (req, res) => {
  
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")
    
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        let info = {
          mark1: result.mark1,
          mark2: result.mark2,
          mark3: result.mark3,
          mark4: result.mark4,
          mark5: result.mark5,
          mark6: result.mark6,
          studentId: result.studentId
        }
      
        const stu = await Student.findByPk(info.studentId);
        if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))

        const mark = await SemesterOne.create(info);
        sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
      })
      res.json(format(null, 200, 'upload successfully'))

      
    })
  }
  catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}

const uploadSemTwoMarklist = async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")
      // let data = []
      // const sheets = file.SheetNames;
      // console.log(sheets.length);
      // for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        let info = {
          mark1: result.mark1,
          mark2: result.mark2,
          mark3: result.mark3,
          mark4: result.mark4,
          mark5: result.mark5,
          mark6: result.mark6,
          studentId: result.studentId
        }


        const stu = await Student.findByPk(info.studentId);
        if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))

        const mark = await semesterTwo.create(info);
        sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
        console.log(info);
        // res.status(200).json(format(datas))



      })
      res.json(format(null, 200, 'upload successfully'))

      // }
    })
  } catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}

const uploadSemThreeMarklist = async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")
      // let data = []
      // const sheets = file.SheetNames;
      // console.log(sheets.length);
      // for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        let info = {
          mark1: result.mark1,
          mark2: result.mark2,
          mark3: result.mark3,
          mark4: result.mark4,
          mark5: result.mark5,
          mark6: result.mark6,
          studentId: result.studentId
        }


        const stu = await Student.findByPk(info.studentId);
        if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))

        const mark = await semesterThree.create(info);
        sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
        console.log(info);
        // res.status(200).json(format(datas))



      })
      res.json(format(null, 200, 'upload successfully'))

      // }
    })
  }
  catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}
const uploadSemFourMarklist = async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")
      // let data = []
      // const sheets = file.SheetNames;
      // console.log(sheets.length);
      // for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        let info = {
          mark1: result.mark1,
          mark2: result.mark2,
          mark3: result.mark3,
          mark4: result.mark4,
          mark5: result.mark5,
          mark6: result.mark6,
          studentId: result.studentId
        }


        const stu = await Student.findByPk(info.studentId);
        if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))

        const mark = await semesterFour.create(info);
        sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
        console.log(info);
        // res.status(200).json(format(datas))



      })
      res.json(format(null, 200, 'upload successfully'))

      // }
    })
  } catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}

const uploadSemFiveMarklist = async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")
      // let data = []
      // const sheets = file.SheetNames;
      // console.log(sheets.length);
      // for (let i = 0; i < sheets.length; i++) {
      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        let info = {
          mark1: result.mark1,
          mark2: result.mark2,
          mark3: result.mark3,
          mark4: result.mark4,
          mark5: result.mark5,
          mark6: result.mark6,
          studentId: result.studentId
        }


        const stu = await Student.findByPk(info.studentId);
        if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))

        const mark = await semesterFive.create(info);
        sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
        console.log(info);
        // res.status(200).json(format(datas))



      })
      res.status(200).json(format(null, 200, 'upload successfully'))
      // }
    })
  } catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}


const uploadSemSixMarklist = async (req, res) => {
  try {

    // upload(req, res, function (err) {
    // if (err) return res.send("e" + err);
    const admin = await req.body.admin;
    
    const file = xlsx.readFile("./uploads/excel1.xlsx")

    const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

    temp.forEach(async (result) => {
      let info = {
        mark1: result.mark1,
        mark2: result.mark2,
        mark3: result.mark3,
        mark4: result.mark4,
        mark5: result.mark5,
        mark6: result.mark6,
        studentId: result.studentId,
        modifiedBy: req.body.admin
      }


      const stu = await Student.findByPk(info.studentId);
      // if (stu == null) return res.status(500).json(format(null, 500, "Student not available with id " + info.studentId))
     
      const mark = await semesterSix.create(info);
      sendmail(stu.personal_mail, stu.parent_mail, mark.mark1, mark.mark2, mark.mark3, mark.mark4, mark.mark5, mark.mark6, mark.Total, 1);
      
      // res.status(200).json(format(datas))



    })

    res.status(200).json(format(null, 200, 'upload successfully'))

    // })
  } catch (error) {
    res.status(500).json(format(null, 500, error))
  }
}

const checkmarklist = async (req, res, next) => {
  var a = 0;
  try {
    upload(req, res, function (err) {
      if (err) return res.send("e" + err);

      const file = xlsx.readFile("./uploads/excel1.xlsx")

      const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

      temp.forEach(async (result) => {
        const stu = await Student.findByPk(result.studentId);
        var valid = validate(result);
        if (valid.error) {
          a = 1;
          return res.status(500).json(format(null, 500, valid.error.details))
        }
        else if (stu == null) {

          a = 1;
          return res.status(500).json(format(null, 500, "Student not available with id " + result.studentId))

        }
      }
      )
    })
    console.log(a);
    if (a == 0) { return next() }


  } catch (error) {
    res.status(500).json(format(null, 500, error))

  }
}







module.exports = {
  createSemOne,
  createSemTwo,
  createSemThree,
  createSemFour,
  createSemFive,
  createSemSix,
  getSemOne,
  giveTc, profile, updateSemOne,uploadSemOneMarklist,
  uploadSemTwoMarklist,
  uploadSemThreeMarklist,
  uploadSemFourMarklist,
  uploadSemFiveMarklist,
  uploadSemSixMarklist, // checkmarklist
}