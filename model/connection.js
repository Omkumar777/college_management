const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    
    pool: {
      max: 10,     
      min: 0,     
      idle: 10000
    },
    logging :false,
    
  });

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.student = require("./student" )(sequelize, Sequelize);
  db.admin = require('./admin')(sequelize,Sequelize);
  db.semesterOne =require('./semesterOne')(sequelize,Sequelize);
  db.semesterTwo =require('./semesterTwo')(sequelize,Sequelize);
  db.semesterThree =require('./semesterThree')(sequelize,Sequelize);
  db.semesterFour =require('./semesterFour')(sequelize,Sequelize);
  db.semesterFive =require('./semesterFive')(sequelize,Sequelize);
  db.semesterSix =require('./semesterSix')(sequelize,Sequelize);

  db.semesterOne.belongsTo(db.student,{
    foreignKey : 'studentId'
   
  })
  db.student.hasMany(db.semesterTwo,{
    foreignKey : 'studentId'
  })
  db.student.hasMany(db.semesterThree,{
    foreignKey : 'studentId',
    primarykey : true
  })
  db.student.hasMany(db.semesterFour,{
    foreignKey : 'studentId'
  })
  db.student.hasMany(db.semesterFive,{
    foreignKey : 'studentId'
  })
  db.student.hasMany(db.semesterSix,{
    foreignKey : 'studentId'
  })
  module.exports = db;
