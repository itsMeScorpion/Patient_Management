import instance from './instance';

export const postData = (url, data) => instance.post(url, data);
export const getData = (url) => instance.get(url);
export const patchData = (url, data) => instance.patch(url, data);
export const deleteData = (url) => instance.delete(url);