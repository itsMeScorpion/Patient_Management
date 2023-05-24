import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import CustomLoader from '../../utils/CustomLoader';

import { listData } from './action';

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

function Transaction() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listData());
  }, []);
  const { transaction } = useSelector((e) => e.transactionReducer);

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(transaction);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [transaction]);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = transaction.filter(
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
      name: 'Appointment Type',
      selector: (row) => row.appointmentType,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Transaction',
      selector: (row) => row.transactionHash,
    },
  ];

  return (
    <div className="container mt-4">
      <DataTable
        title=<h2>Transaction List</h2>
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

export default Transaction;
