import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Box, Heading, HStack, Image, VStack, Text } from 'native-base';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import Footer from '../../Footer';
import { primary } from '../../../assets/getColors';

function DodajSliku({ handleRightArrowPress, handleLeftArrowPress, setScreenFour }) {
  const [imagePath, setImagePath] = useState();

  const handleImageSelecting = () => {
    let nameArr = '';
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImagePath(image.path);
      // console.log(image);
      nameArr = image.path.split('/');
      // console.log('pero', nameArr[nameArr.length - 1]);
      setScreenFour([
        {
          name: nameArr[nameArr.length - 1],
          isMain: true,
          priority: 0,
          base64: image.data,
        },
      ]);
    });
  };

  const handleImageDelete = () => {
    setImagePath(null);
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <Box borderTopRadius={50} marginTop={5} elevation={20} flex={1} backgroundColor="white">
      <Heading
        flex={0.1}
        my={3}
        alignSelf="center"
        textAlign="center"
        size="md"
        fontWeight="normal"
      >
        Odaberite sliku koja će biti naslovna slika vašeg objekta
      </Heading>
      <VStack flex={0.9}>
        <VStack marginTop={5} flex={0.7}>
          {imagePath &&
            (console.log(imagePath),
            (
              <Image
                alt="SelectedImage"
                borderRadius={10}
                w={250}
                h={200}
                alignSelf="center"
                source={{
                  uri: imagePath,
                }}
              />
            ))}
        </VStack>
        <HStack
          flex={0.1}
          width="100%"
          position="absolute"
          alignItems="center"
          justifyContent="center"
          bottom={20}
        >
          <TouchableWithoutFeedback onPress={handleImageSelecting}>
            <Box mx={5} padding={2} backgroundColor={primary} borderRadius={10}>
              <Text fontSize="md" color="white" fontWeight="bold">
                {imagePath ? 'Dodaj drugu' : 'Dodaj'} sliku
              </Text>
            </Box>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleImageDelete}>
            <Box mx={5} padding={2} backgroundColor={primary} borderRadius={10}>
              <Text fontSize="md" color="white" fontWeight="bold">
                Ukloni Sliku
              </Text>
            </Box>
          </TouchableWithoutFeedback>
        </HStack>
        <HStack
          width="100%"
          position="absolute"
          alignItems="center"
          bottom={8}
          flex={0.2}
          justifyContent="space-between"
        >
          <TouchableOpacity
            onPress={handleLeftArrowPress}
            style={{
              padding: 5,
            }}
          >
            <VectorIcon size={25} color="black" name="arrow-left" />
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={!isValid}

            onPress={handleRightArrowPress}
            style={{
              padding: 5,
            }}
          >
            <VectorIcon size={25} color="black" name="arrow-right" />
          </TouchableOpacity>
        </HStack>
        <Footer />
      </VStack>
    </Box>
  );
}

DodajSliku.propTypes = {
  handleLeftArrowPress: PropTypes.func.isRequired,
  handleRightArrowPress: PropTypes.func.isRequired,
  setScreenFour: PropTypes.func.isRequired,
};

export default DodajSliku;
