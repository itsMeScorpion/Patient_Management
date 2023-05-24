const disease = require('../../models/diseases');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://scorpion:Lino8547@asvin.fxtkds5.mongodb.net/Patient_Management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    const diseaseData = [
      {
        name: 'fever',
      },
      {
        name: 'vomiting',
      },
      {
        name: 'headache',
      },
      {
        name: 'cough',
      },
      {
        name: 'sore throat',
      },
      {
        name: 'runny nose',
      },
      {
        name: 'fatigue',
      },
      {
        name: 'diarrhea',
      },
      {
        name: 'body aches',
      },
      {
        name: 'chills',
      },
      {
        name: 'shortness of breath',
      },
      {
        name: 'loss of taste',
      },
      {
        name: 'loss of smell',
      },
      {
        name: 'nausea',
      },
      {
        name: 'dizziness',
      },
      {
        name: 'stomach pain',
      },
      {
        name: 'rash',
      },
      {
        name: 'chest pain',
      },
      {
        name: 'high blood pressure',
      },
      {
        name: 'diabetes',
      },
    ];

    const existingDoc = await disease.find();
    if (existingDoc >= 0) {
      await disease.insertMany(diseaseData);
      console.log(`Data created successfully`);
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
