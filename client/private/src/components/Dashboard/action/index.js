import { getData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  const role = localStorage.getItem('role');
  if (role === 'Patient') {
    await getData('/dashboard/patient').then((e) => {
      console.log(e);
      if (e.data.success === true) {
        dispatch({
          type: 'GET_COUNTERS',
          payload: e.data.message,
        });
      } else {
        toast.error(e.data.message);
      }
    });
  } else {
    await getData('/dashboard/admin').then((e) => {
      console.log(e);
      if (e.data.success === true) {
        dispatch({
          type: 'GET_COUNTERS',
          payload: e.data.message,
        });
      } else {
        toast.error(e.data.message);
      }
    });
  }
};
