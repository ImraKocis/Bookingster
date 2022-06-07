import React from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import {userHomeStyles} from '../styles/userHomeStyles';
const styles = userHomeStyles;

// definition of the Item, which will be rendered in the FlatList
const Item = ({name, details}) => (
  <View style={styles.list__item}>
    <Text style={styles.list__title}>{name}</Text>
    <Text style={styles.list__details}>{details}</Text>
  </View>
);

// the filter
const List = ({searchPhrase, setClicked, data}) => {
  const renderItem = ({item}) => {
    // when no input, show all
    if (searchPhrase === '') {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the description
    if (
      item.details
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;
