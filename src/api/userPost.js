import store from '../redux/store';
import instance from '../axios/adminInstance';
const state = store.getState();

const userPost = (accountType, userr) => {
  return new Promise(async (resolve, reject) => {
    const user = {
      name: userr.name,
      lastName: null,
      authType: 'google',
      accountType,
      UID: userr.uid,
      photoURL: userr.photo_url,
    };
    try {
      console.log('UID PROMISE=>', userr.uid);
      const response = await instance.post('user', user);
      //console.log(response);
      resolve(response.data);
    } catch (error) {
      console.error(error.response.data.errorMessage);
      reject(error);
    }
  });
};

export default userPost;
