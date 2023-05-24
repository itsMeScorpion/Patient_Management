import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { listData, setconsultationCertificate } from './action';
import CustomLoader from '../../utils/CustomLoader';

import Web3 from 'web3';
import wrappedTokenDeposit from '../blockChain/consultationCertificate';

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

function ConsultationCertificate() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listData());
  }, []);
  const { consultation } = useSelector((e) => e.consultationCertificateReducer);
  console.log(consultation);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(consultation);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [consultation]);

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = consultation.filter(
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
      selector: (row) => row.hospital,
    },
    {
      name: 'Depatment',
      selector: (row) => row.department,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctor,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
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

  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('Selected Row:', row);
    // dispatch(getConsultation(row));
    // if (true) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);

    const certificationValues = {
      patientName: row.user_details.name,
      patientUUID: row.user_details.aadharNo,
      patientRegId: row.loginId,
      doctorName: row.doctor,
      consultationTime: row.time,
      departmentName: row.department,
      hospitalName: row.hospital,
      issuerName: row.hospital,
      issuerId: '2',
      issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
    };
    console.log('certificationValuesMainPage', certificationValues);
    const wrapper = await wrappedTokenDeposit({
      web3,
      address: accounts[0],
      netVer,
      certificationValues,
    });
    console.log('wrapper', wrapper);
    dispatch(setconsultationCertificate(wrapper));
    // }
  };

  return (
    <div className="container mt-4">
      <DataTable
        title=<h2>Consultation List</h2>
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

export default ConsultationCertificate;
