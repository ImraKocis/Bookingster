import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  Divider,
  Select,
  CheckIcon,
  Center,
} from 'native-base';
import {useState} from 'react';
import VectorIcon from 'react-native-vector-icons/SimpleLineIcons';

import {Formik} from 'formik';
import * as yup from 'yup';
import {useEffect} from 'react';
import Footer from '../../Footer';
import {primary} from '../../../assets/getColors';

const validationSchema = yup.object().shape({
  numOfTables: yup.string().matches('\\d+', 'Unos je dopušten samo za brojeve'),
});

const Stolovi = ({handleRightArrowPress, handleLeftArrowPress}) => {
  const [selectable, setSelectable] = useState(null);
  const [numOfSelected, setNumOfSelected] = useState({numOfSelected: 0});
  const [tablesChairs, setTablesChairs] = useState({
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    sixAndMore: 0,
  });
  const [tables, setTables] = useState([
    {
      index: 'br stola',
      numOfChairs: 99,
    },
  ]);
  const handleTableChange = val => {
    //console.log(val);
    let arr = [];
    if (val >= 2 && val <= 99) {
      for (let i = 1; i <= val; i++) {
        arr.push({index: i, numOfSelectableChairs: i});
      }
      //console.log(arr);
      setSelectable(arr);
    }
  };

  const handleSelectChange = (key, value) => {
    //console.log(key);
    setTablesChairs({...tablesChairs, [key]: value});
  };
  console.log(tablesChairs);
  useEffect(() => {
    setNumOfSelected({
      numOfSelected: Object.values(tablesChairs).reduce((a, b) => a + b),
    });
    //console.log(numOfSelected);
  }, [tablesChairs]);

  const SelectRow = ({selectedVal, objectKey, heading}) => (
    <HStack mx={2} alignItems={'center'} flex={1}>
      <Text flex={0.6} mx={2}>
        {heading}
      </Text>
      <Select
        minHeight={30}
        flex={0.4}
        mx={2}
        minWidth={100}
        //placeholder="Broj"
        mt={1}
        onValueChange={itemValue => handleSelectChange(objectKey, itemValue)}
        selectedValue={selectedVal.toString()}>
        {selectable.map((item, index) => (
          <Select.Item
            key={index}
            label={item.numOfSelectableChairs.toString()}
            value={item.index}
          />
        ))}
      </Select>
    </HStack>
  );

  return (
    <Formik
      initialValues={{numOfTables: 0}}
      onSubmit={values => console.log(values)}
      validateOnMount={true}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, values, touched, errors, isValid}) => (
        <Box
          borderTopRadius={50}
          marginTop={5}
          elevation={20}
          flex={1}
          backgroundColor={'white'}>
          <VStack flex={0.2}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              flex={1}>
              <Text fontSize={'md'}>Upišite broj stolova u lokalu</Text>
              <Input
                keyboardType="numeric"
                onChangeText={text => {
                  handleChange('numOfTables');
                  handleTableChange(text);
                }}
                onBlur={handleBlur('numOfTables')}
                value={values.numOfTables}
                variant="underlined"
                placeholder="Broj stolova"
                placeholderTextColor={'gray.500'}
                fontSize={13}
                alignSelf="center"
                width={'20%'}
                color="black"
                maxLength={2}
              />
            </HStack>
          </VStack>
          <VStack
            flex={0.05}
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
            {touched.numOfTables && errors.numOfTables && (
              <Text>{errors.numOfTables}</Text>
            )}
            <Divider width={'70%'} my={3} thickness={2} />
          </VStack>
          <VStack flex={0.6} alignItems={'center'} justifyContent={'center'}>
            {selectable && (
              <>
                <SelectRow
                  selectedVal={tablesChairs.two.toString()}
                  heading={'Broj stolova s dvije stolice'}
                  objectKey={'two'}
                />

                <SelectRow
                  selectedVal={tablesChairs.three.toString()}
                  heading={'Broj stolova s tri stolice'}
                  objectKey={'three'}
                />

                <SelectRow
                  selectedVal={tablesChairs.four.toString()}
                  heading={'Broj stolova s četiri stolice'}
                  objectKey={'four'}
                />

                <SelectRow
                  selectedVal={tablesChairs.five.toString()}
                  heading={'Broj stolova s pet stolica'}
                  objectKey={'five'}
                />

                <SelectRow
                  selectedVal={tablesChairs.sixAndMore.toString()}
                  heading={'Broj stolova s šet ili više stolica'}
                  objectKey={'sixAndMore'}
                />
              </>
            )}
          </VStack>
          <HStack
            width="100%"
            position="absolute"
            //alignItems="center"
            bottom={8}
            flex={0.2}
            justifyContent={'center'}>
            <TouchableOpacity
              onPress={handleLeftArrowPress}
              style={{
                flex: 1,
                padding: 5,
                alignSelf: 'flex-start',
              }}>
              <VectorIcon size={25} color={'black'} name="arrow-left" />
            </TouchableOpacity>

            <TouchableOpacity
              //disabled={!isValid}

              onPress={handleRightArrowPress}
              style={{
                flex: 1,
                maxWidth: '30%',
                minHeight: '100%',
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                marginRight: 25,
                borderRadius: 10,

                backgroundColor: primary,
              }}>
              <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
                Potvrdi
              </Text>
            </TouchableOpacity>
          </HStack>
          <Footer />
        </Box>
      )}
    </Formik>
  );
};

export default Stolovi;
