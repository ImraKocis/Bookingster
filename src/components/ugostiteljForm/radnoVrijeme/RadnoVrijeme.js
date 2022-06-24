import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from 'native-base';

import {primary, secondary} from '../../../assets/getColors';
import DateTimePicker from '@react-native-community/datetimepicker';
import VectorIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';

import useStateWithCallback from 'use-state-with-callback';
import Footer from '../../Footer';

const days = [
  'Ponedjeljak',
  'Utorak',
  'Srijeda',
  'Četvrtak',
  'Petak',
  'Subota',
  'Nedjelja',
];

const RadnoVrijeme = ({
  handleRightArrowPress,
  handleLeftArrowPress,
  setScreenThree,
}) => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [setTime, setSetTime] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  // const [selectedDays, setSelectedDays] = useStateWithCallback([], () => {
  //   setShowFrom(false);
  //   setShowTo(false);
  // });

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysApi, setSelectedDaysApi] = useState([]);

  const onChange = (selectedTime, dateType) => {
    const time = selectedTime;
    setShowFrom(false);
    setShowTo(false);
    if (selectedTime != undefined) {
      if (dateType == 'do') {
        setFrom(new Date(time));

        //setShowFrom(false);
        console.log(from);
      } else if (dateType == 'od') {
        setTo(new Date(time));

        //setShowTo(false);
      }
    } else {
      // setShowFrom(false);
      // setShowTo(false);
    }
  };

  const onAddPress = (tFrom, tTo) => {
    // if (tFrom < tTo || tFrom.getTime() === tTo.getTime()) {

    // } else {
    //   Alert.alert(
    //     'Pažnja',
    //     'Početno radno vrijeme mora biti manje od krajnjeg radnog vremena',
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //       },
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ],
    //   );
    // }

    setSetTime([...setTime, {od: tFrom, do: tTo}]);
  };

  const handlePress = (day, index, tFrom, tTo) => {
    if (!selectedDays.some(obj => obj.day == day)) {
      const sortedDays = [
        ...selectedDays,
        {
          day,
          index,
          od: tFrom,
          do: tTo,
          daySelected: true,
        },
      ];
      const arrForApi = [
        ...selectedDaysApi,
        {
          day,
          timeFrom: (
            (tFrom.getHours() < 10 ? '0' : '') +
            tFrom.getHours() +
            ':' +
            (tFrom.getMinutes() < 10 ? '0' : '') +
            tFrom.getMinutes()
          ).toString(),
          timeTo: (
            (tTo.getHours() < 10 ? '0' : '') +
            tTo.getHours() +
            ':' +
            (tTo.getMinutes() < 10 ? '0' : '') +
            tTo.getMinutes()
          ).toString(),
        },
      ];
      sortedDays.sort((a, b) => (a.index > b.index ? 1 : -1));
      setSelectedDays(sortedDays);
      setSelectedDaysApi(arrForApi);
      setScreenThree(arrForApi);
    } else {
      setSelectedDays(selectedDays.filter(item => item.day !== day));
    }
    console.log(selectedDays);
  };
  return (
    <Box
      borderTopRadius={50}
      marginTop={5}
      elevation={20}
      flex={1}
      backgroundColor={'white'}>
      <Heading
        flex={0.1}
        my={3}
        alignSelf={'center'}
        size={'md'}
        fontWeight={'normal'}>
        Označite dane kojima je lokal otvoren
      </Heading>
      <VStack flex={0.3}>
        <HStack
          mx={5}
          justifyContent={'space-around'}
          alignItems={'center'}
          //backgroundColor={'amber.100'}
          flex={1}>
          <Text fontSize={'xl'}>
            Od{' '}
            {(from.getHours() < 10 ? '0' : '') +
              from.getHours() +
              ':' +
              (from.getMinutes() < 10 ? '0' : '') +
              from.getMinutes()}
          </Text>
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
              mode={'time'}
              is24Hour={true}
              onChange={val => onChange(val.nativeEvent.timestamp, 'do')}
            />
          )}
          <Text fontSize={'xl'}>
            Do{' '}
            {(to.getHours() < 10 ? '0' : '') +
              to.getHours() +
              ':' +
              (to.getMinutes() < 10 ? '0' : '') +
              to.getMinutes()}
          </Text>
          <TouchableWithoutFeedback onPress={() => setShowTo(true)}>
            <Icon
              as={<VectorIcons name="clock-edit-outline" />}
              size="8"
              borderRadius={10}
              color={secondary}
              //marginRight={2}
            />
          </TouchableWithoutFeedback>

          {showTo && (
            <DateTimePicker
              testID="dateTimePicker"
              value={to}
              mode={'time'}
              is24Hour={true}
              onChange={val => onChange(val.nativeEvent.timestamp, 'od')}
            />
          )}
        </HStack>

        <HStack flex={1} justifyContent={'center'}>
          <TouchableWithoutFeedback onPress={() => onAddPress(from, to)}>
            <View
              style={{
                borderRadius: 10,
                flex: 1,
                marginHorizontal: '30%',
                backgroundColor: primary,
                maxHeight: '80%',
                justifyContent: 'center',
              }}>
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={'xl'}
                textAlign={'center'}>
                Dodaj
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </HStack>
      </VStack>
      <HStack flex={0.05} w={'100%'} justifyContent={'center'}>
        <Divider width={'70%'} my={3} thickness={2} />
      </HStack>
      <VStack flex={1}>
        {setTime.some(val => val.od) &&
          setTime.some(val => val.do) &&
          setTime.map((timeItem, timeIndex) => (
            <HStack
              key={timeIndex}
              flex={0.2}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <HStack mx={1} flex={0.3}>
                <Text fontSize={'md'}>
                  {(timeItem.od.getHours() < 10 ? '0' : '') +
                    timeItem.od.getHours() +
                    ':' +
                    (timeItem.od.getMinutes() < 10 ? '0' : '') +
                    timeItem.od.getMinutes()}{' '}
                  -{' '}
                  {(timeItem.do.getHours() < 10 ? '0' : '') +
                    timeItem.do.getHours() +
                    ':' +
                    (timeItem.do.getMinutes() < 10 ? '0' : '') +
                    timeItem.do.getMinutes()}
                </Text>
              </HStack>
              <HStack flex={0.7}>
                {days.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    //disabled={day.daySelected}
                    onPress={() => {
                      handlePress(
                        day,
                        index,
                        setTime[timeIndex].od,
                        setTime[timeIndex].do,
                      );
                    }}
                    style={{
                      backgroundColor: selectedDays.some(
                        obj =>
                          obj.day == day &&
                          obj.od == setTime[timeIndex].od &&
                          obj.do == setTime[timeIndex].do,
                      )
                        ? secondary
                        : 'gray',
                      flex: 1,
                      borderRadius: 10,
                      alignItems: 'center',
                      marginVertical: '5%',
                      marginHorizontal: '2%',
                      width: 40,
                      height: 40,
                    }}>
                    <Center flex={1}>
                      <Heading size={'md'}>{day.charAt(0)}</Heading>
                    </Center>
                  </TouchableOpacity>
                ))}
              </HStack>
            </HStack>
          ))}
        <HStack
          width="100%"
          position="absolute"
          alignItems="center"
          bottom={8}
          flex={0.2}
          justifyContent={'space-between'}>
          <TouchableOpacity
            onPress={handleLeftArrowPress}
            style={{
              padding: 5,
            }}>
            <VectorIcon size={25} color={'black'} name="arrow-left" />
          </TouchableOpacity>

          <TouchableOpacity
            //disabled={!isValid}

            onPress={handleRightArrowPress}
            style={{
              padding: 5,
            }}>
            <VectorIcon
              size={25}
              color={true ? 'black' : 'gray'}
              name="arrow-right"
            />
          </TouchableOpacity>
        </HStack>
        <Footer />
      </VStack>
    </Box>
  );
};

export default RadnoVrijeme;
