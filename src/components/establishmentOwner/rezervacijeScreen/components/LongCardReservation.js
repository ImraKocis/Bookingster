import axios from 'axios';
import { View, Text, HStack, VStack, Heading } from 'native-base';
import React from 'react';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import { primary, secondary } from '../../../../assets/getColors';

const instance = axios.create({
  url: 'https://bookingsterapi.oa.r.appspot.com/bookingster/api/',
  timeout: 1000,
  headers: { authorization: `Bearer user.jwt` },
});

function LongCardReservation() {
  const handleBtnPress = (status) => {
    // post na api sa stausom
    if (status === 1) {
      console.log('odobreno');
    } else if (status === 2) {
      console.log('odbijeno');
    }
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
            Ime Prezime
          </Heading>
        </HStack>

        <VStack mt={2} ml={3} flex={1}>
          <HStack flex={0.5}>
            <VectorIcon
              style={{ marginRight: 5 }}
              name="calendar-outline"
              color="black"
              size={25}
            />
            <Text fontSize="lg">Dolazak: 2.7. u 20:00</Text>
          </HStack>
          <HStack flex={0.5}>
            <VectorIcon style={{ marginRight: 5 }} name="people-outline" color="black" size={25} />
            <Text fontSize="lg">Broj Gostiju: 3</Text>
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

export default LongCardReservation;
