import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, VStack, HStack, Text, Center, Image, Icon} from 'native-base';
import {LoadChoiceImg} from '../../../../assets/getImages';
import {userHomeStyles} from '../styles/userHomeStyles';
import IconVector from 'react-native-vector-icons/MaterialIcons';

const styles = userHomeStyles;
const CubeCard = () => {
  const [choiceImg, setChoiceImg] = useState('');
  const fetchImg = async () => {
    setChoiceImg(await LoadChoiceImg());
  };
  useEffect(() => {
    fetchImg();
  }, []);
  return (
    <View style={styles.CardView}>
      <Box flex={1} width={153} maxHeight={177} borderRadius={20}>
        <Center flex={0.6} borderRadius={10} backgroundColor="white">
          <Image
            alt="Naziv objekta"
            style={styles.image}
            source={{uri: choiceImg}}
          />
        </Center>
        <Center flex={0.1}>
          <Text fontWeight={'bold'} fontSize={14}>
            Naziv objekta
          </Text>
        </Center>
        <Center flex={0.3}>
          <HStack>
            <Icon
              as={<IconVector name="person-outline" />}
              size="7"
              ml={3}
              color="black"
              marginRight={2}
            />
            <Text fontWeight={'light'} fontSize={12}>
              Vladimira Nadzora 45, Slatina
            </Text>
          </HStack>
        </Center>
      </Box>
    </View>
  );
};

export default CubeCard;
