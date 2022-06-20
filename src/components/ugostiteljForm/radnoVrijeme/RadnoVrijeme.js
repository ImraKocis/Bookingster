import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Center, Heading, HStack, Text} from 'native-base';
import {useState} from 'react';
import {secondary} from '../../../assets/getColors';
const days = [
  'ponedjeljak',
  'utorak',
  'srijeda',
  'četvrtak',
  'petak',
  'subota',
  'nedjelja',
];
const arr = [];

const RadnoVrijeme = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const handlePress = (day, index) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter(item => item !== day));
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
      <Heading alignSelf={'center'} size={'md'} fontWeight={'normal'}>
        Označite dane kojima je lokal otvoren
      </Heading>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        {days.map(
          (day, index) => (
            console.log(arr.includes(day)),
            (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(day, index);
                }}
                style={{
                  backgroundColor: selectedDays.includes(day)
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
                  <Heading size={'md'}>{day.charAt(0).toUpperCase()}</Heading>
                </Center>
              </TouchableOpacity>
            )
          ),
        )}
      </HStack>
    </Box>
  );
};

export default RadnoVrijeme;
