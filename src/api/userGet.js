import instance from '../axios/adminInstance';

const userGet = user => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('UID PROMISE', user.uid);
      const response = await instance.get(`user?UID=${user.uid}`);
      console.log('RESOLVE DATA', response.data);
      resolve(response.data);
    } catch (error) {
      console.error(error.response.data.errorMessage);
      reject(error);
    }
  });
};

export default userGet;
