import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Heading, Image, Input, Icon, HStack, FormControl, Text } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import { selectUser } from '../../../../redux/features/userSlice';
import userProfileStyles from '../styles/userProfileStyles';
import { primary } from '../../../../assets/getColors';

const styles = userProfileStyles;

function UserDetails() {
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name); // ime iz reduxa
  const [lastName, setLastName] = useState(user.lastname); // prezime iz reduxa
  const [isChanged, setIsChanged] = useState(false); // da li je ime ili prezime promenjeno
  return (
    <View style={styles.userDetails__mainView}>
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
        <Text color="gray.500">Kliknite za promjenu slike</Text>
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
              // onChangeText={text => setIme(text)}
              // value={ime}
            />
            {/* <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {validationError.ime}
                    </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl flex={0.45}>
            <Input
              variant="underlined"
              fontSize="md"
              color="black"
              value={lastName}
              // onChangeText={value => setPrezime(value)}
              // value={prezime}
              placeholder="Prezime"
            />
          </FormControl>
        </HStack>
      </View>
      <HStack justifyContent="space-around" alignItems="center" flex={0.7}>
        <TouchableOpacity style={styles.userDetails__formButton}>
          <Text color="white" textAlign="center" fontSize="sm" fontWeight="bold">
            Promjeni lozinku
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isChanged}
          style={{
            flex: 1,
            marginVertical: '2%',
            marginHorizontal: '15%',
            borderRadius: 10,
            height: '80%',
            minWidth: '35%',
            backgroundColor: isChanged ? primary : 'gray',
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

export default UserDetails;
