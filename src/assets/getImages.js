import storage from '@react-native-firebase/storage';

const LoadSignInImg = async () => {
  const signInImg = await storage().ref('SignIn.png').getDownloadURL();
  return signInImg;
};

const LoadSignUpImg = async () => {
  const signUpImg = await storage().ref('SignUp.png').getDownloadURL();
  return signUpImg;
};

const LoadGoogleImg = async () => {
  const googleImg = await storage().ref('GoogleLogo.png').getDownloadURL();
  return googleImg;
};

const LoadChoiceImg = async () => {
  const choiceImg = await storage().ref('Choice.png').getDownloadURL();
  return choiceImg;
};

const LoadWelcomeImg = async () => {
  const welcomeImg = await storage().ref('Welcome.png').getDownloadURL();
  return welcomeImg;
};

const LoadTestImage = async () => {
  const testImg = await storage().ref('ivona.jpg').getDownloadURL();
  return testImg;
};

export {
  LoadSignInImg,
  LoadGoogleImg,
  LoadSignUpImg,
  LoadChoiceImg,
  LoadWelcomeImg,
  LoadTestImage,
};
