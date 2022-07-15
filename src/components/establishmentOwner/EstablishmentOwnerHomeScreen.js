/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { View, Text, VStack, HStack, FlatList, Spinner, Heading, Button } from 'native-base';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { backgroundColor, primary, secondary } from '../../assets/getColors';
import {
  selectEstablishment,
  updateEstablishmentState,
} from '../../redux/features/establishmentSlice';
import { selectUser } from '../../redux/features/userSlice';
import TopHeader from '../user/userBookingHistoryScreen/components/TopHeader';
import SignOutButton from '../user/userProfileScreen/components/SignOutButton';
import Table from './components/Table';

// const data = ['1', '11', '12', '13', '14', '15', '16', '17', '18'];

function EstablishmentOwnerHomeScreen({ navigation, route }) {
  const user = useSelector(selectUser);
  const establishment = useSelector(selectEstablishment);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const apiCall = async () => {
    const res = await axios
      .get(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/establishment/owner?UID=${user.UID}`,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.establishments)
      .catch((err) => {
        console.log('API ERROR==>', err.response.data.errorMessage);
        setError(true);
      });

    return res;
  };

  const handleApiCall = async () => {
    // console.log('API RESPONSE==>', await apiCall());
    const res = await apiCall();
    // console.log(res[0].tables);
    dispatch(updateEstablishmentState(res));
    // setData(res);
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
    <SafeAreaView backgroundColor={backgroundColor} style={{ flex: 1, justifyContent: 'center' }}>
      {establishment && <TopHeader headerText={route.params.name} />}

      {establishment ? (
        <FlatList
          style={{ paddingTop: '2%' }}
          onRefresh={onRefresh}
          refreshing={refreshing}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: 'center' }}
          data={establishment.filter((obj) => obj.oib === route.params.oib)[0].tables}
          renderItem={({ item }) => <Table item={item} />}
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
            Došlo je do greške
          </Text>
          <Button onPress={handleApiCall} backgroundColor={primary} borderRadius={10}>
            Pokušaj ponovno
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
      {/* <SignOutButton /> */}
    </SafeAreaView>
  );
}

export default EstablishmentOwnerHomeScreen;
