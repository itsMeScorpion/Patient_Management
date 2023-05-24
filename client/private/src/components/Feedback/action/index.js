import { getData } from '../../../api/service';

export const listData = () => async (dispatch) => {
  await getData('/contact-us').then((e) => {
    dispatch({
      type: 'FEEDBACK',
      payload: e.data.message,
    });
  });
};
