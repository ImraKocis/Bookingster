import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Heading } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import CubeCard from './components/CubeCard';
import SearchBar from './components/SearchBar';
import userHomeStyles from './styles/userHomeStyles';
import ProfilePicture from './components/ProfilePicture';
import LongCard from './components/LongCard';

const styles = userHomeStyles;

function UserHomeScreen() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [apiData, setApiData] = useState();

  const dismissKeyboard = () => {
    setClicked(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        'https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages'
      );
      const data = await apiResponse.json();
      setApiData(data);
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.home__view}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <>
          <ProfilePicture />
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </>
      </TouchableWithoutFeedback>
      <View style={{ flex: 0.8 }}>
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
                  renderItem={({ item }) => <CubeCard />}
                  keyExtractor={(item) => item.id}
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
              <View style={{ flex: 1 }}>
                <LongCard buttonText="Rezerviraj" />
              </View>
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
          <View
            style={{
              flex: 1,
              height: '100%',
              zIndex: 99,
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              display: clicked ? 'flex' : 'none',
            }}
          >
            <Text>Upišite naziv ili adresu željenog mjesta</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

export default UserHomeScreen;
