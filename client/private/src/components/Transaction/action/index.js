import { getData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('/transaction-history').then((e) => {
    console.log(e);
    if (e.data.success === true) {
      dispatch({
        type: 'GET_TRANSACTION',
        payload: e.data.message,
      });
    } else {
      toast.error(e.data.message);
    }
  });
};
