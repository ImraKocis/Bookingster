import { Image, TouchableOpacity } from 'react-native';
import { Text, VStack, HStack, Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import { LoadWelcomeImg } from '../../../assets/getImages';
import Footer from '../../Footer';

function Hint({ handleRightArrowPress }) {
  const [image, setImage] = useState('https://i.imgur.com/wY7xQZU.png');

  const getImage = async () => {
    setImage(await LoadWelcomeImg());
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Box borderTopRadius={50} marginTop={5} elevation={20} flex={1} backgroundColor="white">
      <VStack flex={1}>
        <Image
          source={{ uri: image }}
          style={{
            marginTop: 10,
            width: '35%',
            height: '35%',
            alignSelf: 'center',
          }}
        />
        <Box justifyContent="space-around" marginX="5%" flex={0.7}>
          <Text textAlign="center" fontSize="md" color="gray.700">
            Iduća polja je obvezno pažljivo popuniti radi ispravnosti rada aplikacije
          </Text>
          <Text textAlign="center" fontSize="md" color="gray.700">
            Služite se strelicama za navođenje. Na kraju kliknite &quotPotvrdi&quot
          </Text>
        </Box>
        <Box flex={0.2}>
          <HStack marginX="5%" justifyContent="flex-end">
            <TouchableOpacity onPress={handleRightArrowPress} style={{ padding: 5 }}>
              <VectorIcon size={25} color="black" name="arrow-right" />
            </TouchableOpacity>
          </HStack>
        </Box>
        <Footer />
      </VStack>
    </Box>
  );
}

Hint.propTypes = {
  handleRightArrowPress: PropTypes.func.isRequired,
};

export default Hint;
