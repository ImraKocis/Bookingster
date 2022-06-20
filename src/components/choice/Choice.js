import {View, Image, TouchableOpacity} from 'react-native';
import {Text, HStack, VStack, Center, Heading} from 'native-base';
import React, {useState, useEffect} from 'react';
import {LoadChoiceImg} from '../../assets/getImages';
import {choiceStyle} from './choiceStyle';
import userPost from '../../api/userPost';
import {useSelector, useDispatch} from 'react-redux';
import {
  logout,
  selectUser,
  updateUserInfo,
} from '../../redux/features/userSlice';
import auth from '@react-native-firebase/auth';
const styles = choiceStyle;

export default function Choice({navigation, isNewUser, setUserInfo}) {
  const [choiceImg, setChoiceImg] = useState();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const LogoutUser = () => {
    dispatch(logout());
    auth().signOut();
  };
  const GetUrls = async () => {
    setChoiceImg(await LoadChoiceImg());
  };
  const saveUserToFirebase = signUpType => {
    //console.log('signUpType', signUpType);
    //dispatch(updateUserInfo({accountType: signUpType}));
    //console.log('USEREEEEEE:', user);
    const splitName = user.displayName.split(' ');
    const {0: fN, 1: lN} = splitName;
    console.log('PHOTO_URL', user.photoURL);
    userPost({
      name: user.displayName,
      lastname: null,
      authType: 'google',
      photoURL:
        user.photoURL == null
          ? `https://ui-avatars.com/api/?name=${fN}+${lN}&background=random&rounded=true`
          : user.photoURL,
      accountType: signUpType,
      UID: user.uid,
    }).then(response => {
      setUserInfo(response.user);
      console.log('API RESPONSE =>', response.user);
    });
  };
  useEffect(() => {
    GetUrls();
  }, []);
  return (
    <View style={styles.choiceScreen}>
      <Center flex={0.4} marginTop={10}>
        <VStack flex={1}>
          <Image style={styles.image} source={{uri: choiceImg}} />
        </VStack>
      </Center>
      <Center marginTop={5} flex={0.1}>
        <HStack>
          <Heading
            size="2xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Vi ste?
          </Heading>
        </HStack>
      </Center>
      <Center flex={0.4}>
        <VStack flex={1}>
          <HStack marginY={7}>
            <Center>
              {/*navigacija na novi racun te ugostitelj hint, itd. */}

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  isNewUser
                    ? saveUserToFirebase(1)
                    : navigation.navigate('Novi_racun_ugostitelj')
                }>
                <Text style={styles.buttonText}>Ugostitelj</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
          <HStack>
            <Center>
              {/*navigacija na novi reacun te prijavu */}
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  isNewUser
                    ? saveUserToFirebase(0)
                    : navigation.navigate('Novi_racun_korisnik')
                }>
                <Text style={styles.buttonText}>Korisnik</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
          <HStack>
            <Center>
              {/*navigacija na novi reacun te prijavu */}
              <TouchableOpacity style={styles.button} onPress={LogoutUser}>
                <Text style={styles.buttonText}>Odjava</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
        </VStack>
      </Center>
      <Center flex={0.1}>
        <HStack
          width="100%"
          position="absolute"
          justifyContent="center"
          alignItems="center"
          bottom={1}>
          <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
        </HStack>
      </Center>
    </View>
  );
}
