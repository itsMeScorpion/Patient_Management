const consultation = require('../../models/consultation');
const vaccination = require('../../models/vaccination');
const consultationCertificate = require('../../models/ConsultationCertificate');
const transaction = require('../../models/transaction.js');
const vaccineCertificate = require('../../models/vaccinationCertificate');

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

const { initiateTask, startTask } = require('../../modules/cron');
const Web3 = require('web3');

module.exports = {
  getConsultationData: async (req, res) => {
    try {
      const consultationData = await consultation.aggregate([
        {
          $lookup: {
            from: 'signups',
            localField: 'loginId',
            foreignField: 'loginId',
            as: 'user_details',
          },
        },
        {
          $unwind: {
            path: '$user_details',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return res.send({
        success: true,
        message: consultationData,
      });
    } catch (e) {
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  getVaccinationData: async (req, res) => {
    try {
      const vaccinationData = await vaccination.aggregate([
        {
          $lookup: {
            from: 'signups',
            localField: 'loginId',
            foreignField: 'loginId',
            as: 'user_details',
          },
        },
        {
          $unwind: {
            path: '$user_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'vaccines',
            localField: 'vaccineId',
            foreignField: '_id',
            as: 'vaccine_details',
          },
        },
        {
          $unwind: {
            path: '$vaccine_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospitalId',
            foreignField: '_id',
            as: 'hospital_details',
          },
        },
        {
          $unwind: {
            path: '$hospital_details',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return res.send({
        success: true,
        message: vaccinationData,
      });
    } catch (e) {
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  consultationCertificate: async (req, res) => {
    try {
      console.log('req.body', req.body);
      const data = await consultationCertificate.create(req.body);
      res.send({
        success: true,
        msg: 'Certificate Generated Successfully',
      });
      generatePDF(req.body);
    } catch (e) {
      console.log('Error', e);
      return res.send({
        success: false,
        msg: e.message,
      });
    }
  },
  vaccinationCertificate: async (req, res) => {
    try {
      console.log('body', req.body);
      const vaccinedata = req.body;

      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/sh0O3KIIpiWKveWzICcnkOoGsq8TikcN'
      );

      const response = await web3.eth.getTransactionReceipt(
        vaccinedata.transactionHash
      );

      const vaccineCert = await vaccineCertificate.create({
        certificateNumber: vaccinedata.certificateNumber,
        patientName: vaccinedata.patientName,
        patientUUID: vaccinedata.patientUUID,
        patientRegId: vaccinedata.patientRegId,
        vaccineName: vaccinedata.vaccineName,
        vaccineTakenDatetime: vaccinedata.vaccineTakenDatetime,
        disease: vaccinedata.disease,
        antigen: vaccinedata.antigen,
        issuerName: vaccinedata.issuerName,
        issuerId: vaccinedata.issuerId,
        issuedDateTime: vaccinedata.issuedDateTime,
      });
      const transactions = await transaction.create({
        transactionHash: vaccinedata.transactionHash,
        appointmentType: 'vaccineCertification',
        loginId: vaccinedata.patientRegId,
        amount: '0.01',
      });
      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          if (response.status === true) {
            const data = await transaction
              .updateOne({ _id: transactions.id }, { status: true })
              .exec();
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
          res.send({
            success: false,
            msg: e.message,
          });
        }
      });
      generatePDF(req.body);
      async function generatePDF(data) {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Add a new page
        const page = pdfDoc.addPage();

        // Set the font and font size
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.setFont(font);
        page.setFontSize(14);

        // Set the content on the page using the provided data
        page.drawText('MEDICAL CERTIFICATE', {
          x: 50,
          y: page.getHeight() - 50,
          size: 18,
          underline: true,
        });

        page.drawText(`Certificate Number: ${data.certificateNumber}`, {
          x: 50,
          y: page.getHeight() - 100,
          size: 12,
        });

        page.drawText(`Patient Name: ${data.patientName}`, {
          x: 50,
          y: page.getHeight() - 140,
          size: 12,
        });

        page.drawText(`Vaccination Name: ${data.vaccineName}`, {
          x: 50,
          y: page.getHeight() - 180,
          size: 12,
        });

        page.drawText(`Issuer Name: ${data.issuerName}`, {
          x: 50,
          y: page.getHeight() - 220,
          size: 12,
        });

        page.drawText(`Disease: ${data.disease}`, {
          x: 50,
          y: page.getHeight() - 260,
          size: 12,
        });

        page.drawText(`Antigen: ${data.antigen}`, {
          x: 50,
          y: page.getHeight() - 300,
          size: 12,
        });

        page.drawText(`Issuer ID: ${data.issuerId}`, {
          x: 50,
          y: page.getHeight() - 340,
          size: 12,
        });

        page.drawText(`Issued Date and Time: ${data.issuedDateTime}`, {
          x: 50,
          y: page.getHeight() - 380,
          size: 12,
        });

        // Save the PDF to a file
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(`${data.patientName}_vaccination.pdf`, pdfBytes);
      }
      return res.send({
        success: true,
        msg: 'Certificate Issued',
      });
    } catch (e) {
      console.log('Error', e);
      return res.send({
        success: false,
        msg: e.message,
      });
    }
  },
};

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const allConsultations = await consultation.find({
      Status: 'pending',
      date: { $lte: new Date() }, // Filter consultations where the date is less than or equal to the current date
    });
    console.log('allConsultations', allConsultations);
    const currentTime = new Date();

    for (const consultations of allConsultations) {
      const endTime = calculateEndTime(consultations.time);

      if (currentTime >= endTime) {
        await consultation.updateOne(
          { _id: consultations._id },
          { Status: 'completed' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

function calculateEndTime(startTime) {
  const [hour, minute, meridiem] = startTime
    .match(/^(\d+).(\d+)(\w+)/)
    .slice(1);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date();
  endTime.setHours(hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}

async function generatePDF(data) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(14);

  // Set the content on the page using the provided data
  page.drawText('MEDICAL CERTIFICATE', {
    x: 50,
    y: page.getHeight() - 50,
    size: 18,
    underline: true,
  });

  page.drawText(`Certificate Number: ${data.certificateNumber}`, {
    x: 50,
    y: page.getHeight() - 100,
    size: 12,
  });

  page.drawText(`Patient Name: ${data.patientName}`, {
    x: 50,
    y: page.getHeight() - 140,
    size: 12,
  });

  page.drawText(`Doctor Name: ${data.doctorName}`, {
    x: 50,
    y: page.getHeight() - 180,
    size: 12,
  });

  page.drawText(`Consultation Time: ${data.consultationTime}`, {
    x: 50,
    y: page.getHeight() - 220,
    size: 12,
  });

  page.drawText(`Hospital Name: ${data.hospitalName}`, {
    x: 50,
    y: page.getHeight() - 260,
    size: 12,
  });

  page.drawText(`Issuer Name: ${data.issuerName}`, {
    x: 50,
    y: page.getHeight() - 300,
    size: 12,
  });

  page.drawText(`Issuer ID: ${data.issuerId}`, {
    x: 50,
    y: page.getHeight() - 340,
    size: 12,
  });

  page.drawText(`Issued Date and Time: ${data.issuedDateTime}`, {
    x: 50,
    y: page.getHeight() - 380,
    size: 12,
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`${data.patientName}_consultation.pdf`, pdfBytes);
}

// async function generatePDF(data) {
//   // Load the background image
//   const backgroundImageUrl = url(
//     'https://st4.depositphotos.com/3930503/19991/i/450/depositphotos_199910082-stock-photo-light-blue-gradient-background-blue.jpg'
//   );

//   const backgroundImgData = fs.readFileSync(backgroundImageUrl);

//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();

//   // Set the background image on all pages
//   const pages = pdfDoc.getPages();
//   for (const page of pages) {
//     page.drawImage(backgroundImgData, {
//       x: 0,
//       y: 0,
//       width: page.getWidth(),
//       height: page.getHeight(),
//     });
//   }

//   // Set the font and font size
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontSize = 14;

//   // Add a new page
//   const page = pdfDoc.addPage();

//   // Set the font and font size for the page
//   page.setFont(font);
//   page.setFontSize(fontSize);

//   // Set the content on the page using the provided data
//   page.drawText('MEDICAL CONSULTATION CERTIFICATE', {
//     x: 50,
//     y: page.getHeight() - 50,
//     size: 18,
//     underline: true,
//     color: rgb(1, 0, 0), // Red color
//   });

//   const startY = page.getHeight() - 100;
//   const lineHeight = fontSize + 4;
//   const xOffset = 50;

//   const drawTextLine = (text, y) => {
//     page.drawText(text, {
//       x: xOffset,
//       y,
//       size: fontSize,
//     });
//   };

//   // Draw the certificate details
//   drawTextLine(`Certificate Number: ${data.certificateNumber}`, startY);
//   drawTextLine(`Patient Name: ${data.patientName}`, startY - lineHeight);
//   drawTextLine(`Doctor Name: ${data.doctorName}`, startY - 2 * lineHeight);
//   drawTextLine(
//     `Consultation Time: ${data.consultationTime}`,
//     startY - 3 * lineHeight
//   );
//   drawTextLine(`Hospital Name: ${data.hospitalName}`, startY - 4 * lineHeight);
//   drawTextLine(`Issuer Name: ${data.issuerName}`, startY - 5 * lineHeight);
//   drawTextLine(`Issuer ID: ${data.issuerId}`, startY - 6 * lineHeight);
//   drawTextLine(
//     `Issued Date and Time: ${data.issuedDateTime}`,
//     startY - 7 * lineHeight
//   );

//   // Save the PDF to a file
//   const pdfBytes = await pdfDoc.save();
//   fs.writeFileSync('Certificate.pdf', pdfBytes);
// }
