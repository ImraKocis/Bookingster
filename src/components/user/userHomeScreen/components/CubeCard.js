import { Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Icon, VStack } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoadTestImage } from '../../../../assets/getImages';
import userHomeStyles from '../styles/userHomeStyles';

const styles = userHomeStyles;
function CubeCard() {
  const [choiceImg, setChoiceImg] = useState('');

  const fetchImg = async () => {
    setChoiceImg(await LoadTestImage());
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => console.log('Card pressed')}>
      <VStack style={styles.CardView} flex={1} borderTopRadius={20}>
        <Center marginTop={2} alignSelf="center" justifyContent="center" flex={0.6}>
          <Image alt="Naziv objekta" style={styles.image} source={{ uri: choiceImg }} />
        </Center>
        <Box marginLeft={3} marginTop={1} flex={0.1}>
          <Text fontWeight="bold" fontSize={14}>
            Naziv objekta
          </Text>
        </Box>
        <Box flexDirection="row" marginLeft={3} flex={0.3}>
          {/* <HStack  flex={1}> */}
          <Icon
            as={<IconVector name="map-marker-radius-outline" />}
            size="md"
            color="rose.500"
            marginRight={1.5}
            alignSelf="center"
          />
          <Text
            flex={1}
            alignSelf="center"
            fontWeight="normal"
            marginRight={1}
            flexWrap="wrap"
            fontSize="xs"
          >
            Vladimira Nadzora 45, Slatina
          </Text>
          {/* </HStack> */}
        </Box>
      </VStack>
    </TouchableWithoutFeedback>
  );
}

export default CubeCard;
