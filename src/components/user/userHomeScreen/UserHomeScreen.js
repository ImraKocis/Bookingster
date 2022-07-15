/* eslint-disable no-nested-ternary */
import { View, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Heading, HStack, Spinner, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CubeCard from './components/CubeCard';
import SearchBar from './components/SearchBar';
import userHomeStyles from './styles/userHomeStyles';
import ProfilePicture from './components/ProfilePicture';
import LongCard from './components/LongCard';
import apiInstance from '../../../axios/apiInstance';
import { selectUser } from '../../../redux/features/userSlice';
import { primary, secondary } from '../../../assets/getColors';
import KeyBoardAvoidingViewWrapper from '../../keyboardAvoidingViewWrapper/KeyboardAvoidingViewWrapper';

const styles = userHomeStyles;

function UserHomeScreen({ navigation }) {
  const user = useSelector(selectUser);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [apiData, setApiData] = useState();
  const [error, setError] = useState(false);

  const dismissKeyboard = () => {
    console.log('dismiss');
    setClicked(false);
    Keyboard.dismiss();
  };

  // eslint-disable-next-line consistent-return
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://bookingsterapi.oa.r.appspot.com/bookingster/api/establishment',
        {
          // headers: `Bearer ${user.jwt}`,
          headers: { authorization: `Bearer ${user.jwt}` },
        }
      );
      return response;
    } catch (err) {
      console.log(err.response.data.errorMessage);
      setError(true);
    }
  };

  const loadData = async () => {
    const apiResponse = await getData();
    console.log('api response==>', apiResponse.data);
    setApiData(apiResponse.data.establishments);
  };
  useEffect(() => {
    loadData();

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setClicked(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setClicked(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeading = (bigHeading, smallHeading) => (
    <View style={styles.HeaderView}>
      <Heading size="md" fontWeight={500}>
        {bigHeading}
      </Heading>
      <Heading size="sm" fontWeight={400}>
        {smallHeading}
      </Heading>
    </View>
  );
  return (
    <SafeAreaView style={styles.home__view}>
      {apiData ? (
        <>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={{ justifyContent: 'space-around', flex: 0.2 }}>
              <ProfilePicture />
              <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ marginTop: 10, flex: 0.8 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ display: clicked ? 'none' : 'flex' }}
            >
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{ flex: 1 }}>
                  <View style={styles.HeaderView}>
                    <Heading size="md" fontWeight={500}>
                      Najpopularnija mjesta
                    </Heading>
                    <Heading size="sm" fontWeight={400}>
                      Mjesta s najviše rezervacija
                    </Heading>
                  </View>
                  <View style={{ marginVertical: 5, flex: 1 }}>
                    <FlatList
                      nestedScrollEnabled
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={apiData}
                      renderItem={({ item }) => <CubeCard navigation={navigation} item={item} />}
                      keyExtractor={(item) => item.oib}
                    />
                  </View>

                  <View style={styles.HeaderView}>
                    <Heading size="md" fontWeight={500}>
                      Najnovija mjesta
                    </Heading>
                    <Heading size="sm" fontWeight={400}>
                      Najnovije dodana mjesta
                    </Heading>
                  </View>
                  <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                      // ListHeaderComponent={renderHeading(
                      //   'Najnovija mjesta',
                      //   'Najnovije dodana mjesta'
                      // )}
                      // eslint-disable-next-line react/jsx-no-useless-fragment
                      // ListFooterComponent={<></>}
                      nestedScrollEnabled
                      horizontal
                      showsVerticalScrollIndicator={false}
                      data={apiData}
                      renderItem={({ item }) => <CubeCard navigation={navigation} item={item} />}
                      keyExtractor={(item) => item.oib}
                    />
                    {/* <LongCard buttonText="Rezerviraj" /> */}
                  </SafeAreaView>
                </View>

                {/* {!apiData ? (
              <ActivityIndicator color={primary} style={{flex: 0.8}} size="large" />
              ) : (
                <List
                searchPhrase={searchPhrase}
                data={apiData}
                setClicked={setClicked}
                />
              )} */}
              </TouchableWithoutFeedback>
            </ScrollView>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              {/* <View
                style={{
                  flex: 0.8,
                  // height: '100%',
                  // zIndex: 99,
                  backgroundColor: 'red',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  display: clicked ? 'flex' : 'none',
                }}
              > */}
              <FlatList
                style={{ marginTop: '15%', display: clicked ? 'flex' : 'none' }}
                showsVerticalScrollIndicator={false}
                data={apiData}
                renderItem={({ item }) => (
                  <>
                    <LongCard buttonText="Rezerviraj" item={item} />
                    <LongCard buttonText="Rezerviraj" item={item} />
                  </>
                )}
                keyExtractor={(item) => item.oib}
              />
              {/* <Text>Upišite naziv ili adresu željenog mjesta</Text> */}
              {/* </View> */}
            </TouchableWithoutFeedback>
            {/* <FlatList
              // ListHeaderComponent={renderHeading(
              //   'Najnovija mjesta',
              //   'Najnovije dodana mjesta'
              // )}
              // eslint-disable-next-line react/jsx-no-useless-fragment
              // ListFooterComponent={<></>}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              data={apiData}
              renderItem={({ item }) => <LongCard buttonText="Rezerviraj" item={item} />}
              keyExtractor={(item) => item.oib}
            /> */}
          </View>
        </>
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
          <Button onPress={loadData} backgroundColor={primary} borderRadius={10}>
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
    </SafeAreaView>
  );
}

export default UserHomeScreen;
