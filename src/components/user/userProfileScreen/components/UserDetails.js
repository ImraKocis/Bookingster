import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Heading, Image, Input, Icon, HStack, FormControl, Text } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { selectUser } from '../../../../redux/features/userSlice';
import userProfileStyles from '../styles/userProfileStyles';
import { primary } from '../../../../assets/getColors';

const styles = userProfileStyles;

function UserDetails() {
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name); // ime iz reduxa
  const [lastName, setLastName] = useState(user.lastname); // prezime iz reduxa
  const [isChanged, setIsChanged] = useState(false); // da li je ime ili prezime promenjeno

  const handleUpdateBtnPress = () => {
    console.log('btn press');
  };
  return (
    <View
      style={{
        flex: 1,
        // maxHeight: '45%',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 15,
        marginHorizontal: 20,
      }}
    >
      <Heading marginLeft="2%" marginTop="2%" size="md" fontWeight={400}>
        Osobni Podaci
      </Heading>
      <View style={styles.userDetails__photoView}>
        <Image
          alt="userPhoto"
          style={styles.userDetails__photo}
          source={{
            uri: user.photoURL,
          }}
        />
        {/* <Text color="gray.500">Kliknite za promjenu slike</Text> */}
      </View>
      <View style={styles.userDetails__formView}>
        <HStack flex={1} justifyContent="space-between">
          <FormControl flex={0.45}>
            <Input
              variant="underlined"
              fontSize="md"
              color="black"
              InputLeftElement={
                <Icon
                  as={<IconVector name="person-outline" />}
                  size="6"
                  ml={3}
                  color="black"
                  marginRight={2}
                />
              }
              placeholder="Ime"
              value={name}
              onChangeText={(text) => setName(text)}
              // onFocus={() => setClicked(true)}
              // onBlur={() => setClicked(false)}
            />
          </FormControl>
          <FormControl flex={0.45}>
            <Input
              variant="underlined"
              fontSize="md"
              color="black"
              value={lastName}
              onChangeText={(value) => setLastName(value)}
              // onFocus={() => setClicked(true)}
              // onBlur={() => setClicked(false)}
              placeholder="Prezime"
            />
          </FormControl>
        </HStack>
      </View>
      <HStack justifyContent="space-around" alignItems="center" flex={0.4}>
        <TouchableOpacity style={styles.userDetails__formButton}>
          <Text color="white" textAlign="center" fontSize="sm" fontWeight="bold">
            Promjeni lozinku
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={() => `${user.name} ${user.lastname}` !== `${name} ${lastName}`}
          style={{
            flex: 1,
            marginVertical: '5%',
            marginHorizontal: '15%',
            borderRadius: 10,
            height: '70%',
            minWidth: '35%',
            backgroundColor:
              `${user.name} ${user.lastname}` !== `${name} ${lastName}` ? primary : 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text alignSelf="center" color="white" fontSize="md" fontWeight="bold">
            Ažuriraj
          </Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
}

// UserDetails.propTypes = {
//   setClicked: PropTypes.func.isRequired,
// };

export default UserDetails;
