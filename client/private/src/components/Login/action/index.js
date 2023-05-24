import { postData } from '../../../api/service';
import { toast } from 'react-toastify';

export const addData = async (data, navigate) => {
  await postData('/auth/login', data).then((e) => {
    console.log(e);
    if (e.data.success === true) {
      localStorage.setItem('role', e.data.data.role);
      localStorage.setItem('accesstoken', e.data.data.accessToken);
      localStorage.setItem('refreshtoken', e.data.data.refreshTocken);
      toast.success(e.data.message);
      navigate('/dashboard');
      window.location.reload();
    } else {
      toast.error(e.data.message);
    }
  });
};
