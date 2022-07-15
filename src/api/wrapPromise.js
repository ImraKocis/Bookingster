function wrapPromise(promise) {
  let status = 'pending';
  let response;
  // let error = false;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
      console.log('resData', res);
    },
    (err) => {
      status = 'error';
      response = err;
      console.log('ErrorWrap', err.data.response);
      //   error = err
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        console.log('readStatus==>', status);
        throw suspender;
      case 'error':
        console.log('error status');
        console.log('readStatus==>', status);
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export default wrapPromise;
