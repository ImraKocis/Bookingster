import {
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CubeCard from './components/CubeCard';
import {Heading, ScrollView} from 'native-base';
import SearchBar from './components/SearchBar';
import {userHomeStyles} from './styles/userHomeStyles';
import List from './components/List';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfilePicture from './components/ProfilePicture';
import {primary} from '../../../assets/getColors';
import LongCard from './components/LongCard';

const styles = userHomeStyles;

const UserHomeScreen = ({buttonText}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [apiData, setApiData] = useState();

  const dismissKeyboard = () => {
    setClicked(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    // const getData = async () => {
    //   const apiResponse = await fetch(
    //     'https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages',
    //   );
    //   const data = await apiResponse.json();
    //   setApiData(data);
    // };
    // getData();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.home__view}>
        <ProfilePicture />

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

        <View style={{flex: 0.8, display: clicked ? 'none' : 'flex'}}>
          <View style={styles.HeaderView}>
            <Heading size={'md'} fontWeight={'500'}>
              Najpopularnija mjesta
            </Heading>
            <Heading size={'sm'} fontWeight={'400'}>
              Mjesta s najvise rezervacija
            </Heading>
          </View>
          <View style={{flex: 1}}>
            <LongCard buttonText={buttonText} />
          </View>
          <View style={styles.HeaderView}>
            <Heading size={'md'} fontWeight={'500'}>
              Najnovija mjesta
            </Heading>
            <Heading size={'sm'} fontWeight={'400'}>
              Najnovije dodana mjesta
            </Heading>
          </View>
          <View style={{flex: 1}}>
            <LongCard buttonText={buttonText} />
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
            zIndex: 99,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            display: clicked ? 'flex' : 'none',
          }}>
          <Text>Upisite naziv ili adresu zeljenog mjesta</Text>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UserHomeScreen;
