import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { listData, setVaccinationCertificate } from './action';
import CustomLoader from '../../utils/CustomLoader';

import Web3 from 'web3';
import wrappedTokenWithdraw from '../blockChain/vaccinationCertificate';

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      style={{ width: '200px' }}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);
function VaccinationCertificate() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listData());
  }, []);

  const { vaccination } = useSelector((e) => e.vaccinationCertificateReducer);

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(vaccination);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [vaccination]);

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = vaccination.filter(
    (item) =>
      item.user_details.name &&
      item.user_details.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: 'SI.No',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Name',
      selector: (row) => row.user_details.name,
    },
    {
      name: 'Email',
      selector: (row) => row.user_details.email,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospital_details.hospitalName,
    },
    {
      name: 'Vaccine',
      selector: (row) => row.vaccine_details.name,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Certificate',
      selector: (row) => (
        <button className="btn btn-success" onClick={() => handleAction(row)}>
          Issue Certificate
        </button>
      ),
    },
  ];

  const handleAction = async (item) => {
    try {
      console.log('item', item);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      // const validUser = item;
      const decodedData = await wrappedTokenWithdraw({
        web3,
        address,
        values: {
          patientName: item.user_details?.name,
          patientUUID: item.user_details?.aadharNo,
          patientRegId: item.loginId,
          vaccineName: item.vaccine_details?.name,
          vaccineTakenDatetime: new Date(
            `${item.date.slice(0, 10)} ${
              item.date.slice(0, 2) + ':' + item.date.slice(3, 5) + ':00'
            }`
          ).getTime(),
          disease: item.vaccine_details.disease,
          antigen: item.vaccine_details.antigen,
          issuerName: item.hospital_details.hospitalName,
          issuerId: item.hospital_details.hospitalId,
          issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
        },
      });
      console.log(decodedData);
      dispatch(setVaccinationCertificate(decodedData));
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <div className="container mt-4">
      <DataTable
        title=<h2>Vaccination List</h2>
        columns={columns}
        data={filteredItems}
        paginationResetDefaultPage={resetPaginationToggle}
        progressPending={pending}
        progressComponent={<CustomLoader />}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
      />
    </div>
  );
}

export default VaccinationCertificate;
