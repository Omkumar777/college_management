const password = require('generate-password')
const db = require("../model/connection");
const Student = db.student;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const joi = require("joi");
const { response } = require('express');
const bcrypt = require("bcrypt")


function format(data, status = 200, message = 'ok') {
    return { status, message, data }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omkumar@xponential.digital',
        pass: 'opvlzarbtphyoqbu'
    }
});

function sendmail(toMail, username, password) {
    const mailOptions = {
        from: 'omkumar@xponential.digital',
        to: toMail,
        subject: 'Registered',
        text: `There is your username and password..\n Username : ${username} \n Password : ${password}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

 




const createStudent = async (req, res) => {
    const password1 = password.generate({
        length: 8,
        uppercase: false,
        symbols: false
    })

    const password2 =await bcrypt.hash(password1, 10);

   
    try {
        let student_data = {
            "name": req.body.name,
            "username": req.body.username,
            "password": password2,
            "age": req.body.age,
            "personal_mail": req.body.personal_mail,
            "parent_mail": req.body.parent_mail,
            "mark": req.body.mark,
            "address": req.body.address
        }

        function validate(student_data) {
            const valid = joi.object({
                name: joi.string().required(),
                password: joi.string().required(),
                username: joi.string().email().required(),
                age: joi.number().min(17).max(30).required(),
                personal_mail: joi.string().email().required(),
                parent_mail: joi.string().email().required(),
                mark: joi.number().min(500).max(1200).required(),
                address: joi.string()
            })
            return valid.validate(student_data);

        }

        const responses = validate(student_data);
        if (!responses.error) {

            const student = await Student.create(student_data);
            sendmail(student_data.personal_mail, student_data.username, password1)
            res.status(200).json(format(student));
        }
        else {
            res.status(500).json(format(null, 500, responses.error.details))
        }

    } catch (error) {
        res.status(500).json(format(null, 500, error));
    }
}

const getAllStudent = async (req, res) => {
    try {
        const student = await Student.findAll();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json(format(null,500,error));
    }
}

const getOneStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        res.status(200).json(format(student));
    } catch (error) {
        res.status(404).send(error)
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await Student.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(format(res.params.id + " id is updated"))
    } catch (error) {
        res.status(500).json(format(null,500,error))
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.destroy({ where: { id: req.params.id } });
        res.status(200).send(req.params.id + " Id deleted successfully")
    } catch (error) {
        res.status(404).send(error)
    }
}

const authenticationStudent = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const data = await Student.findOne({ where: { username: user.username, password: user.password } })


        if (data == null) {
            console.log(data);
            res.status(404).send("username or password is incorrect")
        }
        else {
            req.data = data;
            next();
        }

    })
}




module.exports = {
    createStudent,
    getAllStudent, getOneStudent, updateStudent, deleteStudent, authenticationStudent
}