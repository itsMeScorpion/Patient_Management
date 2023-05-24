import { postData } from '../../../api/service';
import { toast } from 'react-toastify';
// import customToast from '../../../utils/customToast';

export const addData = (data) => async (dispatch) => {
  console.log('in the action', data);
  await postData('/contact-us', data).then((e) => {
    console.log(e.data);
    // alert(e.data.message);
    if (e.data.success === true) {
      // alert(e.data.message);
      toast.success(e.data.message);
      // customToast(e.data.message, 'success');
    } else {
      toast.error(e.data.message);
      // customToast(e.data.message, 'error');
    }
  });
};
