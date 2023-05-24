import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import '../../styles/vaccination.css';

import { addData, listData } from './action';

function Vacciantion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vaccineData, hospitalData } = useSelector(
    (e) => e.vaccinationReducer
  );

  const [hospital, setHospital] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(listData());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};
    if (!hospital) errors.hospital = 'Please select a hospital';
    if (!vaccine) errors.vaccine = 'Please select a vaccination';
    if (!date) errors.date = 'Please enter a date';
    if (!time) errors.time = 'Please select a time ';

    // Check for errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Submit the form
      const values = {
        hospital: hospital,
        vaccine: vaccine,
        date: date,
        time: time,
      };

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
        console.log();
        dispatch(addData({ values, result }, navigate));
      } else {
        console.log('error');
      }
      // Reset form fields and errors
      setHospital('');
      setVaccine('');
      setDate('');
      setFormErrors({});
    }
  };

  return (
    <form className="vaccination-form" onSubmit={handleSubmit}>
      <h2>Vaccination Form</h2>
      <div className="form-group">
        <label htmlFor="hospital">Hospital:</label>
        <select
          id="hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          className={formErrors.hospital ? 'error' : ''}
        >
          <option selected>Select a hospital</option>
          {hospitalData.map((item, index) => (
            <option key={index} value={item._id}>
              {item.hospitalName}
            </option>
          ))}
        </select>
        {formErrors.hospital && (
          <span className="error-message">{formErrors.hospital}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="vaccine">Vaccination:</label>
        <select
          id="vaccine"
          value={vaccine}
          onChange={(e) => setVaccine(e.target.value)}
          className={formErrors.vaccine ? 'error' : ''}
        >
          <option value="">Select a vaccination</option>
          {vaccineData.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {formErrors.vaccine && (
          <span className="error-message">{formErrors.vaccine}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={formErrors.date ? 'error' : ''}
        />
        {formErrors.date && (
          <span className="error-message">{formErrors.date}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <select
          className={formErrors.date ? 'error' : ''}
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
        {formErrors.date && (
          <span className="error-message">{formErrors.time}</span>
        )}
      </div>
      <button type="submit" style={{ width: '14vh' }}>
        Submit
      </button>
    </form>
  );
}

export default Vacciantion;
