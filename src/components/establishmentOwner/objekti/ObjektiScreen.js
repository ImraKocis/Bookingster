import { View, Text, FlatList } from 'native-base';
import React from 'react';
import { backgroundColor } from '../../../assets/getColors';
import LongCard from '../../user/userHomeScreen/components/LongCard';

import noImage from '../../../assets/image.png';
import TopHeader from '../../user/userBookingHistoryScreen/components/TopHeader';

const data = [
  {
    id: 1,
    name: 'Bistro Pizzeria Ivona',
    location: { address: 'Vladimira Nazora 45', city: 'Slatina' },
    imageUrl: noImage,
  },
];

function ObjektiScreen() {
  return (
    <View flex={1} backgroundColor={backgroundColor}>
      <TopHeader headerText="Moji objekti" />

      <FlatList
        style={{ marginTop: 20 }}
        data={data}
        renderItem={({ item }) => <LongCard buttonText="Detalji" item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ObjektiScreen;
