import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import userHomeStyles from '../styles/userHomeStyles';

const styles = userHomeStyles;

// definition of the Item, which will be rendered in the FlatList
function Item({ name, details }) {
  return (
    <View style={styles.list__item}>
      <Text style={styles.list__title}>{name}</Text>
      <Text style={styles.list__details}>{details}</Text>
    </View>
  );
}

// the filter
function List({ searchPhrase, setClicked, data }) {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase.trim().length < 1) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter for name
    if (item.name.trim().toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter for the description
    if (item.details.trim().toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
      return <Item name={item.name} details={item.details} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    </SafeAreaView>
  );
}

List.propTypes = {
  searchPhrase: PropTypes.string,
  setClicked: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object({})).isRequired,
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
};

List.defaultProps = {
  searchPhrase: '',
};

export default List;
