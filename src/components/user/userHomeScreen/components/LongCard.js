import {View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, HStack, Text, Center, Icon, VStack} from 'native-base';
import {LoadTestImage} from '../../../../assets/getImages';
import {userHomeStyles} from '../styles/userHomeStyles';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = userHomeStyles;
const LongCard = ({buttonText}) => {
  const [choiceImg, setChoiceImg] = useState('');
  const fetchImg = async () => {
    setChoiceImg(await LoadTestImage());
  };
  useEffect(() => {
    fetchImg();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => console.log('LongCard pressed')}
      style={styles.LongCardView}>
      <HStack flex={1} borderTopRadius={20}>
        <Center alignContent="center" flex={0.4} backgroundColor="transparent">
          <Image
            alt="Naziv objekta"
            style={styles.image__long}
            source={{uri: choiceImg}}
          />
        </Center>
        <VStack flex={0.6}>
          <Box marginLeft={3} marginTop={3} flex={0.3}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              Bistro Pizzeria Ivona
            </Text>
          </Box>
          <Box marginLeft={3} flex={0.5}>
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
          <TouchableOpacity style={styles.longCard__Button}>
            {/*S propsima iz tab navigatora slat tekst za btn=> rezerviraj ili provjeri ovisno o tabu(za history) */}
            <Text style={styles.longCard__ButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default LongCard;
