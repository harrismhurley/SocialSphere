require("dotenv").config();

const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize('postgresql://challenge_deploy_user:qVDwatUOLM7ZJ1cHUecY8j8lvwzueYHY@dpg-cpvpfqaju9rs73aip3a0-a/challenge_deploy')

console.log('DB_URL:', process.env.DB_URL);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PW:', process.env.DB_PW);

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

module.exports = sequelize;
