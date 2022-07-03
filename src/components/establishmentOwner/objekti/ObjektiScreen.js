import { View, Text, FlatList, Spinner, HStack, Heading } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { backgroundColor, secondary } from '../../../assets/getColors';
import LongCard from '../../user/userHomeScreen/components/LongCard';

import noImage from '../../../assets/image.png';
import TopHeader from '../../user/userBookingHistoryScreen/components/TopHeader';
import { selectUser } from '../../../redux/features/userSlice';

// const data = [
//   {
//     id: 1,
//     name: 'Bistro Pizzeria Ivona',
//     location: { address: 'Vladimira Nazora 45', city: 'Slatina' },
//     imageUrl: noImage,
//   },
// ];

function ObjektiScreen() {
  const user = useSelector(selectUser);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const apiCall = async () => {
    const res = await axios
      .get(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/establishment/owner?UID=${user.UID}`,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.establishments)
      .catch((error) => console.log('API ERROR==>', error.response.data.errorMessage));

    return res;
  };

  const handleApiCall = async () => {
    // console.log('API RESPONSE==>', await apiCall());
    const res = await apiCall();
    setData(res);
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
      <TopHeader headerText="Moji objekti" />

      {data ? (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={{ marginTop: 20 }}
          data={data}
          renderItem={({ item }) => <LongCard buttonText="Detalji" item={item} />}
          keyExtractor={(item) => item.oib}
        />
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

export default ObjektiScreen;
