import { View, FlatList } from 'native-base';
import React from 'react';
import { backgroundColor } from '../../../assets/getColors';
import TopHeader from '../../user/userBookingHistoryScreen/components/TopHeader';
import LongCardReservation from './components/LongCardReservation';

const data = ['1', '11', '12', '13', '14', '15', '16', '17', '18'];

function RezervacijeScreen() {
  return (
    <View flex={1} backgroundColor={backgroundColor}>
      <TopHeader headerText="Moje nove rezervacije" />
      <FlatList
        data={data}
        renderItem={() => <LongCardReservation />}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

export default RezervacijeScreen;
