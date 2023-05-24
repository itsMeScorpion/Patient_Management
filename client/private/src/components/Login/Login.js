import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/LoginPage.css';

import { addData } from './action';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addData(values, navigate));
    resetForm();
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <h1>Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit">Login</button>
            </Form>
          </Formik>
          <Link to="/auth/signup">New? Register Here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
