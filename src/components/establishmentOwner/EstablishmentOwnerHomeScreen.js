import { View, Text, VStack, HStack, FlatList } from 'native-base';

import React from 'react';
import { SafeAreaView } from 'react-native';
import { backgroundColor, primary } from '../../assets/getColors';
import Table from './components/Table';

const data = ['1', '11', '12', '13', '14', '15', '16', '17', '18'];

function EstablishmentOwnerHomeScreen() {
  return (
    <SafeAreaView backgroundColor={backgroundColor} style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
        //   contentContainerStyle={{ displa }}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'center' }}
        data={data}
        renderItem={() => <Table />}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
}

export default EstablishmentOwnerHomeScreen;
