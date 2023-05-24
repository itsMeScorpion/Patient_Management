import { getData, postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('/consultation').then((e) => {
    console.log(e);
    dispatch({
      type: 'CONSULTATION_DETAILS',
      payload: e.data.message,
    });
  });
};
export const addData = (data) => async () => {
  await postData('/consultation', data).then((e) => {
    console.log(e);
    if (e.data.success === true) {
      toast.success(e.data.message);
    } else {
      toast.error(e.data.message);
    }
  });
};
