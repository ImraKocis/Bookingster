import { View, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, Center, Icon, VStack } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { LoadTestImage } from '../../../../assets/getImages';
import userHomeStyles from '../../../user/userHomeScreen/styles/userHomeStyles';

const styles = userHomeStyles;
function EstablishmentLongCard({ buttonText, item, navigation }) {
  const [choiceImg, setChoiceImg] = useState('');

  const fetchImg = async () => {
    setChoiceImg(await LoadTestImage());
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('EstablishmentTablesScreen', item)}
    >
      <HStack style={styles.LongCardView}>
        <Center alignContent="center" flex={0.4} backgroundColor="transparent">
          <Image
            alt="Naziv objekta"
            style={styles.image__long}
            source={{ uri: item.images[0].imageUrl }}
          />
        </Center>
        <VStack flex={0.6}>
          <Box marginLeft={3} marginTop={3} flex={0.3}>
            <Text fontWeight="bold" fontSize="md">
              {item.name}
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
                fontWeight="normal"
                marginRight={1}
                flexWrap="wrap"
                fontSize="xs"
              >
                {/* {console.log(item)} */}
                {item.location.address}
                {', '}
                {item.location.city}
              </Text>
            </HStack>
          </Box>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('EstablishmentTablesScreen', item)}
          >
            <View style={styles.longCard__Button}>
              <Text style={styles.longCard__ButtonText}>{buttonText}</Text>
            </View>
          </TouchableWithoutFeedback>
        </VStack>
      </HStack>
    </TouchableWithoutFeedback>
  );
}

EstablishmentLongCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default EstablishmentLongCard;
