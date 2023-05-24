import { getData, postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('/certificate/consultation').then((e) => {
    console.log(e);
    if (e.data.success === true) {
      dispatch({
        type: 'GET_CONSULTATION',
        payload: e.data.message,
      });
    } else {
      toast.error(e.data.message);
    }
  });
};
export const setconsultationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await postData(
      '/certificate/getConsultationCertificate',
      formData
    );
    console.log('setconsultationCertificate', data);
    toast.success('Transaction Completed');
  };
