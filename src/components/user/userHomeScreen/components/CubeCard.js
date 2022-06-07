import {View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, HStack, Text, Center, Icon} from 'native-base';
import {LoadTestImage} from '../../../../assets/getImages';
import {userHomeStyles} from '../styles/userHomeStyles';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = userHomeStyles;
const CubeCard = () => {
  const [choiceImg, setChoiceImg] = useState('');
  const fetchImg = async () => {
    setChoiceImg(await LoadTestImage());
  };
  useEffect(() => {
    fetchImg();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => console.log('Card pressed')}
      style={styles.CardView}>
      <Box flex={1} borderTopRadius={20}>
        <Center
          marginTop={2}
          maxWidth={138}
          maxHeight={105}
          alignSelf="center"
          justifyContent="center"
          padding={10}
          flex={0.6}
          backgroundColor="white">
          <Image
            alt="Naziv objekta"
            style={styles.image}
            source={{uri: choiceImg}}
          />
        </Center>
        <Box marginLeft={3} marginTop={1} flex={0.1}>
          <Text fontWeight={'bold'} fontSize={14}>
            Naziv objekta
          </Text>
        </Box>
        <Box marginLeft={3} flex={0.3}>
          <HStack flex={1}>
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
              fontWeight={'normal'}
              marginRight={1}
              flexWrap={'wrap'}
              fontSize={'xs'}>
              Vladimira Nadzora 45, Slatina
            </Text>
          </HStack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default CubeCard;
