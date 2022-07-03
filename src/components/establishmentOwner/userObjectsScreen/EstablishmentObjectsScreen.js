/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { View, Text, FlatList, Button, HStack, Spinner, Heading } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { primary, secondary } from '../../../assets/getColors';
import {
  selectEstablishment,
  updateEstablishmentState,
} from '../../../redux/features/establishmentSlice';
import { selectUser } from '../../../redux/features/userSlice';
import TopHeader from '../../user/userBookingHistoryScreen/components/TopHeader';
import EstablishmentLongCard from './components/EstablishmentLongCard';

function EstablishmentObjectsScreen({ navigation }) {
  const user = useSelector(selectUser);
  const establishment = useSelector(selectEstablishment);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  // const [refreshing, setRefreshing] = useState(false);
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
    dispatch(updateEstablishmentState(res));
    // setData(res);
    // setRefreshing(false);
  };

  useEffect(() => {
    handleApiCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View flex={1}>
      {establishment && <TopHeader headerText="Moji objekti" />}
      {establishment ? (
        <FlatList
          style={{ paddingTop: '2%' }}
          data={establishment}
          keyExtractor={(item) => item.oib}
          renderItem={({ item }) => (
            <EstablishmentLongCard navigation={navigation} buttonText="Odaberi" item={item} />
          )}
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
    </View>
  );
}

export default EstablishmentObjectsScreen;
