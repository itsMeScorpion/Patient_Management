import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { listData } from './action';
import CustomLoader from '../../utils/CustomLoader';

function Feedback() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listData());
  }, []);
  const { feedback } = useSelector((e) => e.feedbackReducer);

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(feedback);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  const columns = [
    {
      name: 'SI.No',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
    },
  ];
  return (
    <div className="container mt-4">
      <DataTable
        title="Feedbacks"
        columns={columns}
        data={rows}
        progressPending={pending}
        progressComponent={<CustomLoader />}
        pagination
      />
    </div>
  );
}

export default Feedback;
