import initiateContractTransaction from './initiateContractTransaction';
import { v4 as uuidv4 } from 'uuid';

import Vaccination_ABI from './VACCINE_ABI';

const wrappedTokenWithdraw = async ({ address, web3, values }) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  const smartContract = await new web3.eth.Contract(
    Vaccination_ABI,
    tokenAddress
  );

  const patientName = web3.utils.padRight(
    web3.utils.fromAscii(values?.patientName),
    64
  );
  const certificateNumber = uuidv4();
  const patientUUID = web3.utils.padRight(
    web3.utils.fromAscii(values?.patientUUID),
    64
  );
  const patientRegId = values?.patientRegId;
  const vaccineName = web3.utils.padRight(
    web3.utils.fromAscii(values?.vaccineName),
    64
  );
  const vaccineTakenDatetime = 1684384172;
  const disease = web3.utils.padRight(
    web3.utils.fromAscii(values?.disease),
    64
  );
  const antigen = web3.utils.padRight(
    web3.utils.fromAscii(values?.antigen),
    64
  );
  const issuerName = web3.utils.padRight(
    web3.utils.fromAscii(values?.issuerName),
    64
  );
  const issuerId = web3.utils.padRight(
    web3.utils.fromAscii(values?.issuerId),
    64
  );
  const issuedDateTime = values?.issuedDateTime;

  const createCertificationFunction = smartContract.methods.createCertification(
    certificateNumber,
    patientName,
    patientUUID,
    patientRegId,
    vaccineName,
    vaccineTakenDatetime,
    disease,
    antigen,
    issuerName,
    issuerId,
    issuedDateTime
  );

  const result = await initiateContractTransaction({
    web3,
    contractFunction: createCertificationFunction,
    contractAddress: tokenAddress,
    address,
    tokenDecimals: 18,
    amountValue: 0,
  });

  // console.log('result', result);

  const subscription = await smartContract.events.CertificationEvent({
    fromBlock: result.blockNumber,
  });

  const decodedDataFunction = () =>
    new Promise((resolve) => {
      subscription.on('data', (event) => {
        console.log(event);
        const decodedData = {
          vaccineName: web3.utils.hexToUtf8(event.returnValues.vaccineName),
          vaccineTakenDatetime: event.returnValues.issuedDateTime,
          patientName: web3.utils.hexToUtf8(event.returnValues.patientName),
          certificateNumber: event.returnValues.certificateNumber,
          patientUUID: web3.utils.hexToUtf8(event.returnValues.patientUUID),
          patientRegId: event.returnValues.patientRegId,
          disease: web3.utils.hexToUtf8(event.returnValues.disease),
          antigen: web3.utils.hexToUtf8(event.returnValues.antigen),
          issuerName: web3.utils.hexToUtf8(event.returnValues.issuerName),
          issuerId: web3.utils.hexToUtf8(event.returnValues.issuerId),
          issuedDateTime: event.returnValues.issuedDateTime,
        };

        resolve(decodedData);
      });
    });

  const decodedData = await decodedDataFunction();
  //   console.log('decodedData', decodedData);

  if (result) {
    return { ...decodedData, transactionHash: result.transactionHash };
  } else {
    throw new Error('No results');
  }
};

export default wrappedTokenWithdraw;
