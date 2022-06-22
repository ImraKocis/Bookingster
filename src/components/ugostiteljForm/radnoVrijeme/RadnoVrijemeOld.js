import {View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from 'native-base';
import {useState} from 'react';
import {secondary} from '../../../assets/getColors';
import DateTimePicker from '@react-native-community/datetimepicker';
import VectorIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';

const days = [
  'Ponedjeljak',
  'Utorak',
  'Srijeda',
  'Četvrtak',
  'Petak',
  'Subota',
  'Nedjelja',
];
const arr = [];

const RadnoVrijeme = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimePickerFrom, setShowTimePickerFrom] = useState([]);
  const [showTimePickerTo, setShowTimePickerTo] = useState([]);
  const [show, setShow] = useState(false);

  const onChange = (selectedTime, item, dateType) => {
    console.log(selectedTime);
    if (selectedTime != undefined) {
      if (dateType === 'od') {
        item.od = new Date(selectedTime);
      } else if (dateType === 'do') {
        item.do = new Date(selectedTime);
      }
      //console.log(selectedTime);
      let arr = [
        ...selectedDays.filter(dan => dan.day !== item.day),
        item,
      ].sort((a, b) => (a.index > b.index ? 1 : -1));
      setItemPropertyShowForTimePicker(dateType);
      setSelectedDays(arr);
    } else setItemPropertyShowForTimePicker(dateType);
  };
  const setItemPropertyShowForTimePicker = dateType => {
    let days = {};
    if (selectedDays.length > 0) {
      selectedDays.map(item => {
        days[item.index] = false;
      });
      if (dateType === 'od') setShowTimePickerFrom(days);
      else if (dateType === 'do') setShowTimePickerTo(days);
      else {
        setShowTimePickerFrom(days);
        setShowTimePickerTo(days);
      }
    }
  };

  useEffect(() => {
    setItemPropertyShowForTimePicker('init');
  }, [selectedDays]);

  const handleOnPress = (index, dateType) => {
    let days = {};
    Object.keys(dateType == 'od' ? showTimePickerFrom : showTimePickerTo).map(
      item => {
        days[item.index] = false;
      },
    );
    days[index] = true;
    if (dateType === 'od') setShowTimePickerFrom(days);
    else if (dateType === 'do') setShowTimePickerTo(days);
  };

  const handlePress = (day, index) => {
    if (!selectedDays.some(obj => obj.day == day)) {
      const sortedDays = [
        ...selectedDays,
        {day, index, od: new Date(), do: new Date(), show: false},
      ];
      sortedDays.sort((a, b) => (a.index > b.index ? 1 : -1));
      setSelectedDays(sortedDays);
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
        flex={0.05}
        my={3}
        alignSelf={'center'}
        size={'md'}
        fontWeight={'normal'}>
        Označite dane kojima je lokal otvoren
      </Heading>
      <HStack flex={0.2} alignItems={'center'} justifyContent={'space-between'}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handlePress(day, index);
            }}
            style={{
              backgroundColor: selectedDays.some(obj => obj.day == day)
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
      <HStack flex={0.05} w={'100%'} justifyContent={'center'}>
        <Divider width={'70%'} my={3} thickness={2} />
      </HStack>
      <VStack alignItems={'center'} justifyContent={'space-between'} flex={0.6}>
        {selectedDays.map((item, index) => (
          <HStack
            //alignItems={'center'}
            flex={1}
            justifyContent={'space-between'}
            key={item.index}>
            <Text
              //textAlign={'left'}
              //alignSelf={'center'}
              flex={0.4}
              ml={4}
              fontSize={'md'}>
              {item.day}
            </Text>

            <Text flex={0.2} fontSize={'md'}>
              Od{' '}
              {(item.od.getHours() < 10 ? '0' : '') +
                item.od.getHours() +
                ':' +
                (item.od.getMinutes() < 10 ? '0' : '') +
                item.od.getMinutes()}
            </Text>

            <TouchableWithoutFeedback
              onPress={handleOnPress.bind(this, item.index, 'od')}>
              <Icon
                as={<VectorIcons name="clock-edit-outline" />}
                size="5"
                flex={0.1}
                //marginRight={4}
                color="black"
              />
            </TouchableWithoutFeedback>
            {showTimePickerFrom[item.index] && (
              <DateTimePicker
                key={index}
                testID="dateTimePicker"
                value={item.od}
                mode={'time'}
                is24Hour={true}
                onChange={val =>
                  onChange(val.nativeEvent.timestamp, item, 'od')
                }
              />
            )}

            <TouchableWithoutFeedback
              onPress={handleOnPress.bind(this, item.index, 'do')}>
              <Text flex={0.2} fontSize={'md'}>
                Do{' '}
                {(item.do.getHours() < 10 ? '0' : '') +
                  item.do.getHours() +
                  ':' +
                  (item.do.getMinutes() < 10 ? '0' : '') +
                  item.do.getMinutes()}
              </Text>
            </TouchableWithoutFeedback>

            {showTimePickerTo[item.index] && (
              <DateTimePicker
                key={index}
                testID="dateTimePicker"
                value={item.do}
                mode={'time'}
                is24Hour={true}
                onChange={val =>
                  onChange(val.nativeEvent.timestamp, item, 'do')
                }
              />
            )}
            <Icon
              as={<VectorIcons name="clock-edit-outline" />}
              size="5"
              flex={0.1}
              color="black"
              //marginRight={2}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default RadnoVrijemeOld;
