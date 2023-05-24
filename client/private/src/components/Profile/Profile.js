import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../../styles/Profile.css';

import { listData, editData } from './action';

function Profile() {
  const dispatch = useDispatch();
  const { userData, deseaseData, medicalDetails } = useSelector(
    (e) => e.profileReducer
  );
  console.log('medicalData', medicalDetails);
  const [healthEdit, setHealthEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // console.log(userData);
  useEffect(() => {
    dispatch(listData());
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      maxWidth: '90%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      animation: 'modal-fade 0.3s',
    },
  };

  // Custom keyframes for modal animation
  const keyframes = `
  @keyframes modal-fade {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

  // Add the keyframes to the document head
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  const validationSchemaHealth = Yup.object().shape({
    bloodGroup: Yup.string().required('Blood Group is required'),
    height: Yup.number().required('Height is required'),
    weight: Yup.number().required('Weight is required'),
    gender: Yup.string().required('Gender is required'),
  });
  const validationSchemaDisease = Yup.object().shape({
    diseaseName: Yup.string().required('Disease Name is required'),
    startDate: Yup.date().required('Start Date is required'),
    remarks: Yup.string().required('Remarks are required'),
  });

  const initialValuesHealth = {
    bloodGroup: '',
    height: '',
    weight: '',
    gender: '',
  };
  const initialValuesDisease = {
    diseaseName: '',
    startDate: '',
    remarks: '',
  };

  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genderOptions = ['Male', 'Female'];

  const handleSubmitHealth = (values) => {
    // Handle form submission logic here
    console.log(values);
    dispatch(editData(values));
    setHealthEdit(false);
  };
  const handleSubmitDisease = (values) => {
    // Handle form submission logic here
    console.log(values);
    dispatch(editData(values));
    setModalOpen(false);
  };
  const columns = [
    {
      name: 'Disease',
      selector: (row) => row.diseaseName,
    },
    {
      name: 'Start Date',
      selector: (row) => row.startDate,
    },
    {
      name: 'Remarks',
      selector: (row) => row.remarks,
    },
    {
      name: 'Action',
      selector: (row) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash text-danger"
          viewBox="0 0 16 16"
          style={{ cursor: 'pointer' }}
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
      ),
    },
  ];
  return (
    <div
      className="page-content page-container"
      id="page-content"
      style={{ height: '90vh' }}
    >
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12" style={{ width: '60%' }}>
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h4 className="f-w-600">{userData?.name}</h4>
                    <p>{userData?.role}</p>
                    <div>
                      <div className="d-flex justify-content-center">
                        <h6 className="f-w-600 mr-2 mb-3">Health Info</h6>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                          onClick={() => setHealthEdit(!healthEdit)}
                          style={{ cursor: 'pointer' }}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                      {healthEdit === true ? (
                        <div>
                          <Formik
                            initialValues={initialValuesHealth}
                            validationSchema={validationSchemaHealth}
                            onSubmit={handleSubmitHealth}
                          >
                            <Form>
                              <div>
                                <label htmlFor="bloodGroup">Blood Group</label>
                                <Field
                                  as="select"
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="bloodGroup"
                                >
                                  <option selected>Blood Group</option>
                                  {bloodGroupOptions?.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Field>
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="bloodGroup"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>
                              <div>
                                <label htmlFor="height">Height</label>
                                <Field
                                  type="number"
                                  name="height"
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="height"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>
                              <div>
                                <label htmlFor="weight">Weight</label>
                                <Field
                                  type="number"
                                  name="weight"
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="weight"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>
                              <div>
                                <label htmlFor="gender">Gender</label>
                                <Field
                                  as="select"
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="gender"
                                >
                                  <option selected>Gender</option>
                                  {genderOptions?.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Field>
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>
                              <button type="submit" className="mt-2">
                                Submit
                              </button>
                            </Form>
                          </Formik>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center flex-column">
                          {medicalDetails === null ? null : (
                            <>
                              <span>Gender:{medicalDetails?.gender}</span>
                              <span>
                                blood Group:{medicalDetails?.bloodGroup}
                              </span>
                              <span>Height:{medicalDetails?.height}cm</span>
                              <span>Weight:{medicalDetails?.weight}kg</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">
                          {userData?.email}
                        </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phone</p>
                        <h6 className="text-muted f-w-400">
                          {userData?.phoneNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">State</p>
                        <h6 className="text-muted f-w-400">
                          {userData?.state}
                        </h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Country</p>
                        <h6 className="text-muted f-w-400">
                          {userData?.country}
                        </h6>
                      </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      Diseases
                    </h6>
                    <div>
                      <div className="col-sm-6">
                        <button className="f-w-400" onClick={handleOpenModal}>
                          add disease
                        </button>
                        <Modal
                          isOpen={modalOpen}
                          onRequestClose={handleCloseModal}
                          style={customStyles}
                        >
                          <h2>Add Disease</h2>
                          <Formik
                            initialValues={initialValuesDisease}
                            validationSchema={validationSchemaDisease}
                            onSubmit={handleSubmitDisease}
                          >
                            <Form>
                              <div>
                                <label htmlFor="diseaseName">
                                  Disease Name
                                </label>
                                <Field
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="diseaseName"
                                  as="select"
                                >
                                  <option selected>disease</option>
                                  {deseaseData.map((item, index) => (
                                    <option key={index} value={item?.name}>
                                      {item?.name}
                                    </option>
                                  ))}
                                </Field>
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="diseaseName"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>

                              <div>
                                <label htmlFor="startDate">Start Date</label>
                                <Field
                                  type="date"
                                  name="startDate"
                                  max={new Date().toISOString().split('T')[0]}
                                />
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="startDate"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>

                              <div>
                                <label htmlFor="remarks">Remarks</label>
                                <Field as="textarea" name="remarks" />
                                <span className="text-danger">
                                  <ErrorMessage
                                    name="remarks"
                                    component="div"
                                    className="error"
                                  />
                                </span>
                              </div>

                              <button type="submit">Submit</button>
                            </Form>
                          </Formik>
                        </Modal>
                      </div>
                      <DataTable
                        columns={columns}
                        data={
                          medicalDetails === null
                            ? []
                            : medicalDetails?.diseases
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
