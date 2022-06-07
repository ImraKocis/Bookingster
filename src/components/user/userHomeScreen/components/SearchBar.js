import {View, Keyboard} from 'react-native';
import {Text, Input, Icon, SearchIcon, Button} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {userHomeStyles} from '../styles/userHomeStyles';
const styles = userHomeStyles;
const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.searchBar__container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <Input
          height={10}
          fontSize={17}
          borderColor="transparent"
          _focus={{borderColor: 'transparent', backgroundColor: 'transparent'}}
          InputLeftElement={
            <SearchIcon
              color={'black'}
              size={'md'}
              marginRight={1}
              marginLeft={2}
              onPress={() => console.log('Search')}
            />
          }
          width="80%"
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onSubmitEditing={() => console.log('Search Submitted', searchPhrase)}
          onFocus={() => {
            setClicked(true);
          }}
          onBlur={() => {
            setClicked(false);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Icon
            as={<MaterialIcon name="cancel" />}
            size="md"
            color="black"
            alignSelf="center"
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
    </View>
  );
};

export default SearchBar;
