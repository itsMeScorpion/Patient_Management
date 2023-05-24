import { getData, postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('/vaccination').then((e) => {
    console.log(e);
    if (e.data.success === true) {
      dispatch({
        type: 'GET_VACCINATION',
        payload: e.data.message,
      });
    } else {
      toast.error(e.data.message);
    }
  });
};

export const addData = (data) => async () => {
  await postData('/vaccination', data).then((e) => {
    console.log(e);
    if (e.data.success === true) {
      toast.success(e.data.message);
    } else {
      toast.error(e.data.message);
    }
  });
};
