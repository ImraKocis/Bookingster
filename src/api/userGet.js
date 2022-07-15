import instance from '../axios/adminInstance';

const userGet = (user) => instance.get(`user?UID=${user.uid}`);

export default userGet;
