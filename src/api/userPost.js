import instance from '../axios/adminInstance';

const userPost = (user) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('USER POST=>', user);
      const response = await instance.post('user', user);
      // console.log(response);
      resolve(response.data);
    } catch (error) {
      console.error(error.response.data.errorMessage);
      reject(error);
    }
  });

export default userPost;
