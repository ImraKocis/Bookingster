import { View, Image } from 'react-native';
import React from 'react';
import { Heading, Text } from 'native-base';
import userProfileStyles from '../styles/userProfileStyles';

const styles = userProfileStyles;

function UserInfo() {
  return (
    <View style={styles.userInfo__mainView}>
      <View style={styles.userInfo__photoView}>
        <Image
          style={styles.userInfo__photo}
          source={{
            uri: 'https://ui-avatars.com/api/?name=IVAN+HORVAT&background=random&rounded=true',
          }}
        />
      </View>
      <View style={styles.userInfo__nameView}>
        <Heading size="xl" fontWeight={400}>
          Ivan Horvat
        </Heading>
        <Text color="gray.500">ivan.horvat@gmial.com</Text>
      </View>
    </View>
  );
}

export default UserInfo;
