import { Alert, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Heading, HStack, Icon, Image, Input, Text, VStack } from 'native-base';
import VectorIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import KeyboardAvoidingViewWrapper from '../../keyboardAvoidingViewWrapper/KeyboardAvoidingViewWrapper';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';
import { primary, secondary } from '../../../assets/getColors';
import { selectUser } from '../../../redux/features/userSlice';

function ReservationScreenNew({ navigation, route }) {
  const user = useSelector(selectUser);
  const [showFrom, setShowFrom] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [timeChanged, setTimeChanged] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [places, setPlaces] = useState();
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
    setShowFromDate(false);
    if (selectedTime !== undefined) {
      if (dateType === 'time') {
        setFrom(new Date(time));
        setTimeChanged(true);
      }
      if (dateType === 'date') {
        setFromDate(new Date(time));
        setDateChanged(true);
      }
    }
  };

  const handleApiCall = async (obj) => {
    const res = await axios
      .post('https://bookingsterapi.oa.r.appspot.com/bookingster/api/reservation', obj, {
        headers: { authorization: `Bearer ${user.jwt}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        Alert.alert('Upozorenje', error.response.data.errorMessage, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      });

    return res;
  };

  const handleReservationRequest = async () => {
    const apiObj = {
      establishmentOIB: route.params.oib,
      establishmentOwner: route.params.owner,
      reservedBy: user.UID,
      nameOnReservation: user.fullName,
      reservedFrom: {
        year: fromDate.getFullYear(),
        month: fromDate.getMonth(),
        day: fromDate.getDate(),
        hours: from.getHours(),
        minutes: from.getMinutes(),
      },
      places,
    };

    console.log('API RESPONSE==>', await handleApiCall(apiObj));

    console.log('API OBJ==>', apiObj);
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <View
        style={{
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TopHeader headerText="Rezervacija" />
        {/* <Text>{route.params.images[0].imageUrl}</Text> */}
        <VStack marginTop={5} flex={1} elevation={10}>
          <Image
            alt="CoverImage"
            borderRadius={20}
            source={{ uri: route.params.images[0].imageUrl }}
            width={300}
            height={200}
          />
        </VStack>
        <VStack alignItems="center" flex={1}>
          <HStack mt={2} flex={0.5}>
            <VectorIcons
              color={primary}
              size={25}
              style={{ marginRight: 5 }}
              name="map-marker-radius-outline"
            />
            <Text>{`${route.params.location.address}, ${route.params.location.city}`}</Text>
          </HStack>
          <HStack flex={0.5}>
            <Heading>{route.params.name}</Heading>
          </HStack>
        </VStack>
        <HStack flex={1} w="90%" my={3} justifyContent="space-around">
          <Text fontSize="md">Datum dolaska</Text>
          <TouchableWithoutFeedback onPress={() => setShowFromDate(true)}>
            <Icon
              as={<VectorIcons name="calendar-outline" />}
              size="8"
              borderRadius={10}
              color={secondary}
            />
          </TouchableWithoutFeedback>
          {showFromDate && (
            <DateTimePicker
              testID="dateTimePicker"
              minimumDate={new Date()}
              value={fromDate}
              mode="date"
              is24Hour
              onChange={(val) => onChange(val.nativeEvent.timestamp, 'date')}
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
              onChange={(val) => onChange(val.nativeEvent.timestamp, 'time')}
            />
          )}
        </HStack>
        <VStack flexDirection="row" justifyContent="center" alignItems="center" flex={1}>
          <Input
            w="30%"
            keyboardType="numeric"
            variant="underlined"
            fontSize={15}
            color="black"
            placeholderTextColor="black"
            borderBottomColor="black"
            paddingLeft={2}
            onChangeText={(value) => setPlaces(value)}
            value={places}
            placeholder="Broj mjesta"
          />
        </VStack>
        <VStack marginY={5} alignItems="center" flex={1}>
          <Text color={timeChanged && dateChanged ? 'black' : 'gray.500'} fontSize="xl">
            Dolazak {`${formatDateString(fromDate)} u ${formatTimeString(from)}h`}
          </Text>
        </VStack>
        <VStack flex={1}>
          <TouchableOpacity
            onPress={handleReservationRequest}
            disabled={!places && timeChanged && dateChanged}
            style={{
              alignSelf: 'center',
              elevation: 6,
              borderRadius: 10,
              flex: 1,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: places && timeChanged && dateChanged ? primary : 'gray',
            }}
          >
            <Text color="white" fontSize="md" mx={1}>
              Potvrdi Rezervaciju
            </Text>
          </TouchableOpacity>
        </VStack>
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}

export default ReservationScreenNew;
