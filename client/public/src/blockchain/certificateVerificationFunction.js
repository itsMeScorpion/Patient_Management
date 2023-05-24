import CONSULTATION_ABI from './Consultation_ABI';

const consultationCertificateVerificationFunction = async ({
  web3,
  certificateNumber,
}) => {
  const tokenAddress = '0xb85987bd100b2b211ad81a785e6a76592fc29b60';

  try {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default consultationCertificateVerificationFunction;
