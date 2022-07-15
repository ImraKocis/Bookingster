/* eslint-disable react/no-unstable-nested-components */
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Button, Icon, HStack, Image, VStack, Heading, Input } from 'native-base';
import React, { useState } from 'react';
import VectorIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableWithoutFeedback } from 'react-native';
import { backgroundColor, primary, secondary } from '../../../assets/getColors';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';
import KeyboardAvoidingViewWrapper from '../../keyboardAvoidingViewWrapper/KeyboardAvoidingViewWrapper';

function ReservationScreen({ navigation, route }) {
  const [showFrom, setShowFrom] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());

  const days = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];

  const formatTimeString = (date) =>
    `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`;

  const formatDateString = (date) =>
    `${days[date.getDay()].slice(0, 3)} ${date.getMonth() + 1}.${date.getFullYear()}.`;

  const onChange = (selectedTime, dateType) => {
    const time = selectedTime;
    setShowFrom(false);

    if (selectedTime !== undefined) {
      if (dateType === 'do') setFrom(new Date(time));
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function ImageComponent() {
    return (
      <View
        // backgroundColor="red.100"
        flex={1}
        padding={2}
        mt={2}
        marginBottom={4}
        alignItems="center"
        minH={200}
      >
        <View
          flex={0.85}
          borderRadius={19}
          style={{ shadowColor: 'black' }}
          justifyContent="center"
          alignItems="center"
          elevation={10}
          w={300}
          h="90%"
          minH={200}
        >
          <Image
            alt="EstablishmentImage"
            source={{ uri: route.params.images[0].imageUrl }}
            w="99%"
            h="99%"
            borderRadius={20}
            elevation={10}
          />
        </View>
        <VStack minH={100} flex={0.25} alignItems="center" mt={2} backgroundColor="amber.100">
          <HStack flex={1}>
            <VectorIcons
              color={primary}
              size={25}
              style={{ marginRight: 5 }}
              name="map-marker-radius-outline"
            />
            <Text fontSize="md">{`${route.params.location.address}, ${route.params.location.city}`}</Text>
          </HStack>
          <Heading fontSize="md">{`${route.params.name}`}</Heading>
        </VStack>
      </View>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function DateTimePickerComponent() {
    return (
      <HStack flex={1} justifyContent="space-around">
        <Text fontSize="md">Datum dolaska</Text>
        <TouchableWithoutFeedback onPress={() => setShowFromDate(true)}>
          <Icon
            as={<VectorIcons name="clock-edit-outline" />}
            size="8"
            borderRadius={10}
            color={secondary}
          />
        </TouchableWithoutFeedback>
        {showFromDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode="date"
            is24Hour
            onChange={(val) => onChange(val.nativeEvent.timestamp, 'do')}
          />
        )}
        <Text fontSize="md">Vrijeme dolaska</Text>
        <TouchableWithoutFeedback onPress={() => setShowFrom(true)}>
          <Icon
            as={<VectorIcons name="clock-edit-outline" />}
            size="8"
            borderRadius={10}
            color={secondary}
          />
        </TouchableWithoutFeedback>
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={from}
            mode="time"
            is24Hour
            onChange={(val) => onChange(val.nativeEvent.timestamp, 'do')}
          />
        )}
      </HStack>
    );
  }

  function InputComponent() {
    return (
      <View flexDirection="row" justifyContent="center" alignItems="center" flex={1}>
        <Input
          w="30%"
          keyboardType="numeric"
          variant="underlined"
          fontSize={15}
          color="black"
          placeholderTextColor="black"
          borderBottomColor="black"
          // onChangeText={(value) => setPrezime(value)}
          // value={prezime}
          placeholder="Broj mjesta"
        />
      </View>
    );
  }

  function DateTimeComponent() {
    return (
      <VStack alignItems="center" flex={1}>
        <Text fontSize="xl">
          Dolazak {`${formatDateString(fromDate)} u ${formatTimeString(from)}h`}
        </Text>
      </VStack>
    );
  }

  function ButtonComponent() {
    return (
      <View flex={1}>
        <Button
          alignSelf="center"
          elevation={6}
          borderRadius={10}
          backgroundColor={primary}
          onPress={() => navigation.navigate('Rezervacije')}
        >
          Potvrdi Rezervaciju
        </Button>
      </View>
    );
  }

  return (
    // <KeyboardAvoidingViewWrapper>
    <View flex={1}>
      <TopHeader headerText="Rezervacija" />
      <ImageComponent />
      <DateTimePickerComponent />
      <InputComponent />
      <DateTimeComponent />
      <ButtonComponent />
    </View>
    // </KeyboardAvoidingViewWrapper>
  );
}

export default ReservationScreen;
