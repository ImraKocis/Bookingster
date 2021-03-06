import { Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Icon, VStack } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { LoadTestImage } from '../../../../assets/getImages';
import userHomeStyles from '../styles/userHomeStyles';

const styles = userHomeStyles;
function CubeCard({ navigation, item }) {
  const [choiceImg, setChoiceImg] = useState('');

  const fetchImg = async () => {
    setChoiceImg(await LoadTestImage());
  };

  useEffect(() => {
    fetchImg();
  }, []);

  // navigirat s item obj na Stack.DetaljiObjekta

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('EstablishmentDetailsScreen', item)}
    >
      <VStack padding={1} style={styles.CardView} flex={1}>
        <Center justifyContent="flex-start" flex={0.5}>
          <Image
            alt="Naziv objekta"
            style={styles.image}
            source={{ uri: item.images[0].imageUrl }}
          />
        </Center>
        <Box marginLeft={3} marginTop={1} flex={0.2}>
          <Text flex={1} mx={2} flexWrap="wrap" fontWeight="bold" fontSize={14}>
            {item.name}
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
            {item.location.address}
            {', '}
            {item.location.city}
          </Text>
          {/* </HStack> */}
        </Box>
      </VStack>
    </TouchableWithoutFeedback>
  );
}

CubeCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default CubeCard;
