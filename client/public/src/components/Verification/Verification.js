import React, { useState } from 'react';
import Web3 from 'web3';
import consultationCertificateVerificationFunction from '../../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../../blockchain/vaccinationCertificateVerify';

const Verification = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [vaccineCert, setVaccineCert] = useState('');
  const [result, setResult] = useState('');
  // verify consultation certificate
  const verifyConsultation = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const consultationData = await consultationCertificateVerificationFunction({
      web3,
      certificateNumber,
    });
    console.log(consultationData);
  };
  // verify vaccineation certificate

  const handleCertificateNumberChange = (e) => {
    console.log(e.target.value);
    setCertificateNumber(e.target.value);
  };

  const verifyVaccination = async (e) => {
    e.preventDefault();
    console.log(vaccineCert);

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();

    const vaccinationData = await certificateVerificationFunction({
      web3,
      certificateNumber: vaccineCert,
    });
    console.log(vaccinationData);
    const startTimestamp = vaccinationData.issuedDateTime; // Example start timestamp
    const endTimestamp = vaccinationData.vaccineTakenDatetime;
    const startDate = new Date(startTimestamp * 1000);
    const endDate = new Date(endTimestamp * 1000);
    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startAMPM = startHours >= 12 ? 'PM' : 'AM';
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const returnedCertificates = {
      certificateNumber: vaccinationData.certificateNumber,
      patientName: web3.utils.hexToUtf8(vaccinationData.patientName),
      patientUUID: web3.utils.hexToUtf8(vaccinationData.patientUUID),
      patientRegId: vaccinationData.patientRegId,
      vaccineName: web3.utils.hexToUtf8(vaccinationData.vaccineName),
      vaccineTakenDatetime: endHours + ':00' + endAMPM,
      disease: web3.utils.hexToUtf8(vaccinationData.disease),
      antigen: web3.utils.hexToUtf8(vaccinationData.antigen),
      issuerName:
        web3.utils.hexToUtf8(vaccinationData.issuerName) + 'Hospitals',
      issuerId: web3.utils.hexToUtf8(vaccinationData.issuerId),
      issuedDateTime: startHours + ':00' + startAMPM,
    };
    // setCode(returnedCertificates);
    console.log('data', returnedCertificates);
    setResult(returnedCertificates);
  };
  const handleVaccinationChange = (e) => {
    setVaccineCert(e.target.value);
  };

  return (
    <div id="certificate" className="p-5 mt-5 mb-5 container">
      <div className="text-center text-green">
        <h2 className="text-decoration-underline">CERTIFICATE</h2>
      </div>
      <form className="form-search" onSubmit={verifyVaccination}>
        <div className="mt-5">
          <h6 className="fw-bold">Verify vaccine certification</h6>
        </div>
        <div className="d-flex">
          <input
            className="mt-3 form-control"
            type="search"
            name="search"
            placeholder="search your certificate no.."
            onChange={handleVaccinationChange}
            value={vaccineCert}
          />
          <button
            type="submit"
            className="btn btn-primary ml-2"
            style={{ height: '50px' }}
          >
            Search
          </button>
        </div>
      </form>
      {/* <form className="form-search" onSubmit={verifyConsultation}>
        <div className="mt-5">
          <h6 className="fw-bold">Verify consultation certificate</h6>
        </div>
        <input
          className="mt-3"
          type="search"
          name="search"
          placeholder="search your certificate no.."
          value={certificateNumber}
          onChange={handleCertificateNumberChange}
        />
        <button type="submit">Search</button>
      </form> */}
      <div className="container mt-4 d-flex justify-content-center">
        <div class="card" style={{ width: '18rem' }}>
          <div class="card-body">
            <h5 class="card-title">Patient Name:{result?.patientName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Vaccine Name:{result?.vaccineName}
              <br />
              Time:{result?.vaccineTakenDatetime}
            </h6>
            <p class="card-text">
              Certificate Number:{result?.certificateNumber}
            </p>
            <p class="card-text">Issuer:{result?.issuerName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
