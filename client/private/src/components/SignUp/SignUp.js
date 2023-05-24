import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../../styles/SignUpPage.css';

import { addData } from './action';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    aadharNo: '',
    dob: '',
    pincode: '',
    country: '',
    state: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email address'),
    phoneNumber: Yup.string()
      .required('Required')
      .matches(/^[0-9]{10}$/, 'Invalid phone number'),
    address: Yup.string().required('Required'),
    aadharNo: Yup.string()
      .required('Required')
      .matches(/^[0-9]{12}$/, 'Invalid Aadhar number'),
    dob: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(addData(values, navigate));
    resetForm();
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="text" id="phoneNumber" name="phoneNumber" />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  max={new Date().toISOString().split('T')[0]}
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field type="text" id="address" name="address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="aadharNo">Aadhar Number</label>
                <Field type="text" id="aadharNo" name="aadharNo" />
                <ErrorMessage
                  name="aadharNo"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <Field type="text" id="pincode" name="pincode" />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <Field type="text" id="country" name="country" />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field type="text" id="state" name="state" />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <button type="submit">Signup</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
