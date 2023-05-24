import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

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

function ConsultationList() {
  const dispatch = useDispatch();

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows();
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return <div>ConsultationList</div>;
}

export default ConsultationList;
