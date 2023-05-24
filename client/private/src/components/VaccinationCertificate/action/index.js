import { getData, postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('certificate/vaccination').then((e) => {
    console.log(e);
    if (e.data.success === true) {
      dispatch({
        type: 'GET_VACCINATIONS',
        payload: e.data.message,
      });
    } else {
      toast.error(e.data.message);
    }
  });
};
export const setVaccinationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await postData(
      '/certificate/getVaccinationCertificate',
      formData
    );
    console.log('setVaccinationCertificate', data);
    if (data.success === true) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  };
