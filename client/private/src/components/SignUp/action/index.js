import { postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const addData = async (data, navigate) => {
  await postData('/auth/signup', data).then((e) => {
    console.log(e);
    if (e.data.success === true) {
      toast.success(e.data.message);
      navigate('/auth/login');
    } else {
      toast.error(e.data.message);
    }
  });
};
