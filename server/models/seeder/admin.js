const login = require('../login');
const signup = require('../signup');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);
const { passwordHashing } = require('../../modules/passwordhash');

connect(
  'mongodb+srv://scorpion:Lino8547@asvin.fxtkds5.mongodb.net/Patient_Management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    let { salt, newPassword } = await passwordHashing('Admin@123');
    const adminSeed = {
      name: 'Admin123',
      email: 'admin123@gmail.com',
      password: newPassword,
      role: 'Admin',
      phoneNumber: '+91 1234567890',
      salt,
    };
    const existingDoc = await login.findOne({ email: adminSeed.email });
    if (!existingDoc) {
      const loginData = await login.create({
        email: adminSeed.email,
        password: adminSeed.password,
        salt: adminSeed.salt,
      });

      const signupData = await signup.create({
        name: adminSeed.name,
        role: adminSeed.role,
        phoneNumber: adminSeed.phoneNumber,
        loginId: loginData.id,
      });

      console.log(`Admin created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();
