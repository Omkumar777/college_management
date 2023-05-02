const db = require("../model/connection");
const password = require('generate-password')
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken")
const joi = require("joi")

const crypt = require("../1.js")
const bcrypt = require("bcrypt")

function format(data, status = 200, message = 'ok') {
    return { status, message, data }
}



const createAdmin = async (req, res) => {

    const password1 = password.generate({
        length: 8,
        uppercase: false,
        symbols: false
    })
    const pass = await bcrypt.hash(password1, 10);



    let admin = {
        "name": req.body.name,
        "username": req.body.username,
        "password": pass
    }

    try {
        const admin1 = await Admin.create(admin)
        res.status(200).json(format(admin1));
    } catch (error) {
        res.status(404).json(format(null, 404, error))
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll();
        res.status(200).json(format(admin))
    } catch (error) {
        res.status(404).json(format(null, 404, error))

    }

}


// const authentication = async (req, res, next) => {

//     const token = req.headers['authorization']
//     if (!token) return res.status(401).json(format(null,401,'Not Authorized'));

//     jwt.verify(token, process.env.TOKEN, async (err, user) => {
//         if (err) {
//             return res.json(format(null,403,err.message));
//         }

//         // const password1 = encrypt(user.password)

//         // const datas = await Admin.findAll();
//         // datas.forEach(async element => {
//         //     console.log(element.password);
//         //   const pass= await crypt.decrypt(element.password)
//         //     console.log(pass);
//         //   const data = await Admin.findOne({ where: { username: user.username, password: pass } })
//         //     if(!(data == null)){
//         //         req.body.admin = user.username  
//         //      console.log(data);
//         //         next(); 
//         //     }
//         //     else{ res.status(404).json(format(null,404,"username or password is incorrect"))}
//         // });
//         // user.password = "bab1d362f168bcc2d91b00d1b2f0f81d f753d172c2712e5f78ef39abb84ee61a"
//         // const pass = decrypt(user.password)
//         // console.log(pass);
//         const data = await Admin.findOne({ where: { username: user.username, password: user.password } })


//         if (data == null) {
//             res.status(404).json(format(null,404,"username or password is incorrect"))
//         }
//         else {       
//             req.body.admin = user.username  

//             next(); 
//         }
//     })
// }

const authentication = async (req, res, next) => {

    const token = req.headers['authorization']
    if (!token) return res.status(401).json(format(null, 401, 'Not Authorized'));

    jwt.verify(token, process.env.TOKEN, async (err, user) => {
        if (err) {
            return res.json(format(null, 403, err.message));
        }
      

            const data = await Admin.findOne({ where: { username: user.username} })
            if(!data){return res.status(404).json(format(null,404,"username is incorrect"))}
            const pass = await bcrypt.compare( user.password , data.password)
          
            if (pass) {
                req.body.admin = user.username
                next();
            }
        else{ 
            res.status(404).json(format(null, 404, "password is incorrect"))}
    })
   
}



const getOne = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json(format(null, 401, 'Not Authorized'));

    jwt.verify(token, process.env.TOKEN, async (err, user) => {
        if (err) {
            return res.status(403).json(format(null, 403, err));
        }
        try {
            const data = await Admin.findOne({ where: { username: user.username, password: user.password } })

            if (data == null) {
                res.status(404).json(format(null, 404, "Username or password is wrong "))
            }
            else {
                res.status(200).json(format(data));
            }
        }
        catch (err) {
            res.status(404).json(format(null, 404, err))
        }
    })
}
const login = async (req, res) => {

    const user = req.body;

    function validate(data) {
        const valid = joi.object({
            username: joi.string().required(),
            password: joi.required()
        })
        return valid.validate(data);

    }
    try {
        const result = validate(user);
        if (!result.error) {
            const access_token = jwt.sign(user, process.env.TOKEN);
            res.json(format(access_token))
        }
        else {
            res.status(404).json(format(null, 404, result.error.details))
        }
    } catch (error) {
    }
}


module.exports = {
    createAdmin, getAllAdmin, authentication, getOne, login
}