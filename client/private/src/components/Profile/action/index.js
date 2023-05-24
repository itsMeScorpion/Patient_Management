import { getData, patchData, postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const listData = () => async (dispatch) => {
  await getData('/profile').then((e) => {
    console.log(e);
    if (e.data.success === true) {
      dispatch({
        type: 'PROFILE',
        payload: e.data.message,
        disease: e.data.data.diseaseData,
        medicalDetails: e.data.data.medicalData,
      });
    } else {
      toast.error(e.data.message);
    }
  });
};
export const editData = (data) => async () => {
  await patchData('/profile', data).then((e) => {
    console.log(e);
  });
};
// export const editDiseaseData = (data) => async () => {
//   await patchData('/profile-disease', data).then((e) => {
//     console.log(e);
//   });
// };
