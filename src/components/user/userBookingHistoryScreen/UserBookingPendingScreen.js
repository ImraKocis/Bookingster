import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import userBookingHistoryStyles from './Styles/userBookingHistoryStyles';
import TopHeader from './components/TopHeader';
import LongCard from '../userHomeScreen/components/LongCard';
import { selectUser } from '../../../redux/features/userSlice';
import ReservationLongCard from './components/ReservationLongCard';

const styles = userBookingHistoryStyles;

function UserBookingPendingScreen() {
  const user = useSelector(selectUser);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const apiCall = async () => {
    const res = await axios
      .get(
        `https://bookingsterapi.oa.r.appspot.com/bookingster/api/reservation/user?UID=${
          user.UID
        }&status=${0}`,
        { headers: { authorization: `Bearer ${user.jwt}` } }
      )
      .then((response) => response.data.reservations)
      .catch((error) => console.log('API ERROR==>', error.response.data.errorMessage));

    return res;
  };

  const handleApiCall = async () => {
    const res = await apiCall();
    // console.log('API RESPONSE==>', res);
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
    <View style={styles.screenContainer}>
      {/* <TopHeader headerText="Vaše rezervacije" /> */}
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={data}
        renderItem={({ item }) => <ReservationLongCard item={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <LongCard buttonText="Provjeri" />
      <LongCard buttonText="Provjeri" /> */}
    </View>
  );
}

export default UserBookingPendingScreen;
