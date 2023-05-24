import VACCINATION_ABI from './Vaccination_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  try {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();

    // console.log(response);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;
