import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from './action';

const Contact = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here
    console.log(values);
    dispatch(addData(values, dispatch));
    // resetForm();
  };

  return (
    <Container className="mt-5 mb-5">
      <h3 className="text-center">Contact Us</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          {/* <h2>Contact Us</h2> */}
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              message: Yup.string().required('Message is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label>Email address</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicMessage" className="mt-3">
                  <Form.Label>Message</Form.Label>
                  <Field
                    name="message"
                    as="textarea"
                    rows={5}
                    placeholder="Enter your message"
                    value={values.message}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.message && errors.message ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
