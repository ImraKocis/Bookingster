import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Heading, Image, Input, Icon, HStack, FormControl, Text } from 'native-base';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import userProfileStyles from '../styles/userProfileStyles';

const styles = userProfileStyles;

function UserDetails() {
  const [name, setName] = useState(''); // ime iz reduxa
  const [lastName, setLastName] = useState(''); // prezime iz reduxa
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
            uri: 'https://ui-avatars.com/api/?name=IVAN+HORVAT&background=random&rounded=true',
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
      <TouchableOpacity style={styles.userDetails__formButton}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          Promjeni lozinku
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserDetails;
