import {View, Image, TouchableOpacity} from 'react-native';
import {Text, VStack, HStack, Center, Box} from 'native-base';
import {LoadWelcomeImg} from '../../../assets/getImages';

import React, {useEffect, useState} from 'react';
import {backgroundColor, primary} from '../../../assets/getColors';

import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import CustomStepIndicator from '../stepIndicator/CustomStepIndicator';
import Footer from '../../Footer';

const Hint = ({currentPosition, handleRightArrowPress}) => {
  const [image, setImage] = useState('https://i.imgur.com/wY7xQZU.png');
  //const [position, setPosition] = useState(currentPosition);
  const getImage = async () => {
    setImage(await LoadWelcomeImg());
  };
  useEffect(() => {
    getImage();
  }, []);
  useEffect(() => {
    console.log('Hola Amigo'); //save u redux, u ovome ne treba
  }, [currentPosition]);
  // const handleArrowPress = () => {
  //   ViewPager.current.setPage(currentPosition + 1);
  //   // console.log('pressed');
  //   // navigation.navigate('Osobni_podaci');
  //   //setPosition(position + 1);
  // };
  return (
    <Box
      borderTopRadius={50}
      marginTop={5}
      elevation={20}
      flex={1}
      backgroundColor={'white'}>
      <VStack flex={1}>
        <Image
          source={{uri: image}}
          style={{
            marginTop: 10,
            width: '35%',
            height: '35%',
            alignSelf: 'center',
          }}
        />
        <Box justifyContent={'space-around'} marginX={'5%'} flex={0.7}>
          <Text textAlign={'center'} fontSize={'md'} color={'gray.700'}>
            Iduća polja je obvezno pažljivo popuniti radi ispravnosti rada
            aplikacije
          </Text>
          <Text textAlign={'center'} fontSize={'md'} color={'gray.700'}>
            Služite se strijelicama za navođenje. Na kraju kliknite 'Potvrdi'
          </Text>
        </Box>
        <Box flex={0.2}>
          <HStack marginX={'5%'} justifyContent={'flex-end'}>
            <TouchableOpacity
              onPress={handleRightArrowPress}
              style={{padding: 5}}>
              <VectorIcon size={25} color={'black'} name="arrow-right" />
            </TouchableOpacity>
          </HStack>
        </Box>
        <Footer />
      </VStack>
    </Box>
  );
};

export default Hint;
