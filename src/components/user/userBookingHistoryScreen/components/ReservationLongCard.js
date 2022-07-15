import { View, Text, Heading, Image, HStack, VStack } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../../../../assets/getColors';
import { formatForLongCardReservation } from '../../../../utils/dateTimeFunctions';

function ReservationLongCard({ item }) {
  return (
    <HStack padding={2} elevation={6} borderRadius={15} background="white" mx={2} my={2} flex={1}>
      <View flex={0.4}>
        <Image
          alt="CoverImage"
          source={{ uri: item.establishment.images[0].imageUrl }}
          width={140}
          height={100}
          borderRadius={10}
        />
      </View>
      <View flex={0.6}>
        <Heading ml={2} size="md">
          {item.establishment.name}
        </Heading>
        <VStack flex={1} mx={2}>
          <HStack flex={1}>
            <VectorIcon
              style={{ marginRight: 5 }}
              name="map-marker-radius-outline"
              size={20}
              color={primary}
            />
            <Text>{`${item.establishment.location.address}, ${item.establishment.location.city}`}</Text>
          </HStack>
          <HStack flex={1}>
            <VectorIcon
              style={{ marginRight: 5 }}
              name="calendar-outline"
              size={20}
              color={primary}
            />
            <Text>{`Dolazak: ${formatForLongCardReservation(new Date(item.reservedFrom))}`}</Text>
          </HStack>
          <HStack flex={1}>
            <IonIcon style={{ marginRight: 5 }} name="people-outline" size={20} color={primary} />
            <Text>{`Broj osoba: ${item.places}`}</Text>
          </HStack>
        </VStack>
      </View>
    </HStack>
  );
}

ReservationLongCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default ReservationLongCard;
