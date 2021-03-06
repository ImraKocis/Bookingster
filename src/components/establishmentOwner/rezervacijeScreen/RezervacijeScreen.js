/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { View, FlatList, Button, Text, HStack, Spinner, Heading } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { backgroundColor, primary, secondary } from '../../../assets/getColors';
import { selectUser } from '../../../redux/features/userSlice';
import TopHeader from '../../user/userBookingHistoryScreen/components/TopHeader';
import LongCardReservation from './components/LongCardReservation';

// const data = ['1', '11', '12', '13', '14', '15', '16', '17', '18'];
// todo -> history screen, top tab nav
function RezervacijeScreen() {
  const user = useSelector(selectUser);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const apiCall = async () => {
    const res = await axios
      .get(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/reservation/owner?status=${0}&owner=${
          user.UID
        }`,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.reservations)
      .catch((err) => {
        console.log('API ERROR==>', err.response.data.errorMessage);
        setError(true);
      });

    return res;
  };

  const handleApiCall = async () => {
    // console.log('API RESPONSE==>', await apiCall());
    const res = await apiCall();
    setData(res);
    console.log(res);
    setRefreshing(false);
  };

  useEffect(() => {
    handleApiCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    handleApiCall();
  };

  return (
    <View flex={1} backgroundColor={backgroundColor}>
      <TopHeader headerText="Moje nove rezervacije" />
      {data ? (
        <FlatList
          style={{ paddingTop: '2%' }}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={data}
          renderItem={({ item }) => (
            <LongCardReservation handleApiCall={handleApiCall} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text fontSize="lg" my={5}>
            Do??lo je do gre??ke
          </Text>
          <Button onPress={handleApiCall} backgroundColor={primary} borderRadius={10}>
            Poku??aj ponovno
          </Button>
        </View>
      ) : (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color={secondary} fontSize="md">
              Loading
            </Heading>
          </HStack>
        </View>
      )}
    </View>
  );
}

export default RezervacijeScreen;
