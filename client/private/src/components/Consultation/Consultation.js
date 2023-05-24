import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listData, addData } from './action';
import Web3 from 'web3';

const Consultation = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctor, department, hospital } = useSelector(
    (e) => e.consultationReducer
  );

  useEffect(() => {
    dispatch(listData());
  }, []);
  // console.log('doctor###', doctor);
  useEffect(() => {
    if (selectedDepartment && selectedHospital) {
      const doctors = doctor.filter(
        (doctor) =>
          doctor?.department_details[0]?.departmentName ===
            selectedDepartment &&
          doctor?.hospital_details[0]?.hospitalName === selectedHospital
      );
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment, selectedHospital, doctor]);

  const hospitalData = hospital?.map((data, index) => (
    <option value={data.hospitalName} key={index}>
      {data.hospitalName}
    </option>
  ));

  const departmentData = department?.map((data, index) => (
    <option value={data.departmentName} key={index}>
      {data.departmentName}
    </option>
  ));

  const doctorData = filteredDoctors?.map((data, index) => (
    <option value={data.doctorName} key={index}>
      {data.doctorName}
    </option>
  ));

  const [formData, setFormData] = useState({
    date: '',
    hospital: '',
    department: '',
    doctor: '',
    time: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (
      !formData.date ||
      !formData.hospital ||
      !formData.department ||
      !formData.doctor ||
      !formData.time
    ) {
      alert('Please fill in all the fields');
      return;
    }
    // Handle form submission
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();

    const tokenAddress = '0xEDdFDECD8120a6bB59155F58f18546c56c10BD61';

    const toWei = async (web3, amount, decimals) => {
      return await web3.utils.toWei(
        parseFloat(amount).toFixed(decimals).toString(),
        'ether'
      );
    };
    const getGasPrice = async (web3) => {
      const gasPrice = await web3.eth.getGasPrice();
      return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
    };
    const AmountInWei = await toWei(web3, 0.001, 18);
    console.log('AmountInWei', AmountInWei);
    const GetGasPricesss = await getGasPrice(web3);
    const result = await web3.eth.sendTransaction({
      from: accounts[0],
      to: tokenAddress,
      value: AmountInWei,
      GetGasPricesss,
    });
    console.log('result', result);

    if (result) {
      console.log('formData', formData);
      dispatch(addData({ formData, result }, navigate));
    } else {
      console.log('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setSelectedDepartment(value);
    } else if (name === 'hospital') {
      setSelectedHospital(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className="consultation-container container mt-5"
      style={{ width: '40vh' }}
    >
      <h1>Consultation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label>Date:</label>
          <input
            className="form-select"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <label>Choose Hospital:</label>
          <select
            className="form-select"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            {hospitalData}
          </select>
        </div>
        <div className="mt-2">
          <label>Choose Department:</label>
          <select
            className="form-select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departmentData}
          </select>
        </div>
        <div className="mt-2">
          <label>Choose Doctor:</label>
          <select
            className="form-select"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctorData}
          </select>
        </div>
        <div className="mt-2">
          <label>Time:</label>
          <select
            className="form-select"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select Time</option>
            <option value="9:00am-10:00am">9:00am - 10:00am</option>
            <option value="10:00am-11:00am">10:00am - 11:00am</option>
            <option value="11:00am-12:00pm">11:00am - 12:00pm</option>
            <option value="12:00pm-1:00pm">12:00pm - 1:00pm</option>
            <option value="2:00pm-3:00pm">2:00pm - 3:00pm</option>
            <option value="3:00pm-4:00pm">3:00pm - 4:00pm</option>
            <option value="4:00pm-5:00pm">4:00pm - 5:00pm</option>
          </select>
        </div>
        <button className="mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Consultation;
