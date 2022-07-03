import axios from 'axios';
import { View, Text, HStack, VStack, Heading } from 'native-base';
import React from 'react';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import IconVector from 'react-native-vector-icons/MaterialCommunityIcons';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { primary, secondary } from '../../../../assets/getColors';
import {
  formatDateString,
  formatTimeString,
  formatForLongCardReservation,
} from '../../../../utils/dateTimeFunctions';
import { selectUser } from '../../../../redux/features/userSlice';
import {
  selectEstablishment,
  updateEstablishmentState,
} from '../../../../redux/features/establishmentSlice';

// const instance = axios.create({
//   url: 'https://bookingsterapi.oa.r.appspot.com/bookingster/api/reservation/status',
//   timeout: 1000,
//   headers: { authorization: `Bearer user.jwt` },
// });

function LongCardReservation({ item, handleApiCall }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleApiPatch = async (status) => {
    const res = await axios
      .patch(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/reservation/status?newStatus=${status}&reservationId=${item.id}&establishmentOIB=${item.establishmentOIB}`,
        null,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.success)
      .catch((err) => console.log(err.response.data.errorMessage));

    return res;
  };

  const apiCall = async () => {
    const res = await axios
      .get(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/establishment/owner?UID=${user.UID}`,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.establishments)
      .catch((err) => {
        console.log('API ERROR==>', err.response.data.errorMessage);
      });

    return res;
  };

  const handleBtnPress = async (status) => {
    // console.log(item.id);
    // console.log(item.establishmentOIB);

    const res = await handleApiPatch(status);
    const apiCallRes = await apiCall();
    handleApiCall();
    dispatch(updateEstablishmentState(apiCallRes));
    console.log(apiCallRes);
    console.log(res);
    // return res;
  };

  return (
    <HStack
      backgroundColor="white"
      padding={2}
      flex={1}
      elevation={6}
      borderRadius={20}
      mx={5}
      my={2}
      //   maxH={150}
      minH={150}
    >
      <VStack flex={0.75}>
        <HStack alignItems="center" mt={1} ml={3} flex={1}>
          <VectorIcon style={{ marginRight: 5 }} name="person-outline" color="black" size={25} />
          <Heading fontWeight="bold" size="lg">
            {item.nameOnReservation}
          </Heading>
        </HStack>

        <VStack mt={2} ml={3} flex={1}>
          <HStack flex={1}>
            <IconVector size={25} name="map-marker-radius-outline" />
            <Text fontSize="md">{item.establishment.name}</Text>
          </HStack>
          <HStack flex={1}>
            <VectorIcon
              style={{ marginRight: 5 }}
              name="calendar-outline"
              color="black"
              size={25}
            />
            <Text fontSize="lg">{`Dolazak: ${formatForLongCardReservation(
              new Date(item.reservedFrom)
            )}`}</Text>
          </HStack>
          <HStack flex={1}>
            <VectorIcon style={{ marginRight: 5 }} name="people-outline" color="black" size={25} />
            <Text fontSize="lg">{`Broj gostiju: ${item.places}`}</Text>
          </HStack>
        </VStack>
      </VStack>
      <VStack marginRight={1} flex={0.25}>
        <View
          alignItems="center"
          backgroundColor={secondary}
          margin={1}
          borderRadius={10}
          justifyContent="center"
          flex={0.5}
        >
          <VectorIcon
            flex={1}
            size={30}
            color="white"
            onPress={() => handleBtnPress(1)}
            name="checkmark"
          />
        </View>
        <View
          alignItems="center"
          backgroundColor={primary}
          margin={1}
          borderRadius={10}
          justifyContent="center"
          flex={0.5}
        >
          <VectorIcon
            flex={1}
            size={30}
            color="white"
            onPress={() => handleBtnPress(2)}
            name="close"
          />
        </View>
      </VStack>
    </HStack>
  );
}

LongCardReservation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  handleApiCall: PropTypes.func.isRequired,
};

export default LongCardReservation;
