import { View, Text, Button, Image, HStack, VStack, Heading, FlatList, Divider } from 'native-base';
import React from 'react';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { primary, secondary } from '../../../assets/getColors';
import TopHeader from '../userBookingHistoryScreen/components/TopHeader';

// strelica za back da marac bude happy
function EstablishmentDetailsScreen({ route, navigation }) {
  console.log('ITEM==>', route.params);
  return (
    <View flex={1}>
      <TopHeader headerText={route.params.name} />
      <View marginBottom={4} flex={0.35} alignItems="center">
        <View
          borderRadius={19}
          style={{ shadowColor: 'black' }}
          justifyContent="center"
          alignItems="center"
          elevation={10}
          w={300}
          h="90%"
          flex={0.85}
        >
          <Image
            alt="EstablishmentImage"
            source={{ uri: route.params.images[0].imageUrl }}
            w="99%"
            h="99%"
            borderRadius={20}
            elevation={10}
          />
        </View>
        <HStack alignItems="center" mt={2} flex={0.15}>
          <VectorIcon
            color={primary}
            size={25}
            style={{ marginRight: 5 }}
            name="map-marker-radius-outline"
          />
          <Text fontSize="md">{`${route.params.location.address}, ${route.params.location.city}`}</Text>
        </HStack>
      </View>
      <View flex={0.55}>
        <VStack flex={0.8}>
          <VStack mx={10} flex={0.7}>
            <Heading my={1} size="md">
              Radno vrijeme
            </Heading>
            <VStack flex={1}>
              <FlatList
                style={{
                  width: '100%',
                  marginLeft: 10,
                  marginTop: 2,
                }}
                contentContainerStyle={{ justifyContent: 'center', alignSelf: 'center' }}
                showsVerticalScrollIndicator
                // eslint-disable-next-line react/no-unstable-nested-components
                ItemSeparatorComponent={() => (
                  <Divider alignSelf="center" thickness={2} my={2} w="40%" bg={secondary} />
                )}
                data={route.params.workingHours}
                keyExtractor={({ item }) => item}
                renderItem={({ item }) => (
                  <Text fontSize="md">{`${item.day}: ${item.timeFrom} do ${item.timeTo}`}</Text>
                )}
              />
            </VStack>
          </VStack>
          <VStack my={2} flex={0.3}>
            <VStack mx={10} flex={0.5}>
              <Heading size="md">Slobodni stolovi</Heading>
            </VStack>
            <VStack alignItems="center" mx={10} flex={0.5}>
              <Text fontSize="md">{`Broj dostupnih stolova: ${route.params.tables.length} od ${route.params.tables.length}`}</Text>
            </VStack>
          </VStack>
        </VStack>
        <Button
          position="absolute"
          bottom={2}
          alignSelf="center"
          borderRadius={10}
          backgroundColor={primary}
          // fontSize="lg"
          // fontWeight="bold"
          onPress={() => navigation.navigate('ReservationScreen', route.params)}
        >
          Rezerviraj
        </Button>
      </View>
    </View>
  );
}

export default EstablishmentDetailsScreen;
