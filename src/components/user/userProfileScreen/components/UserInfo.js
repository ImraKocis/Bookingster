import { View, Image } from 'react-native';
import React from 'react';
import { Heading, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/features/userSlice';
import userProfileStyles from '../styles/userProfileStyles';

const styles = userProfileStyles;

function UserInfo() {
  const user = useSelector(selectUser);
  return (
    <View style={styles.userInfo__mainView}>
      <View style={styles.userInfo__photoView}>
        <Image
          style={styles.userInfo__photo}
          source={{
            uri: user.photoURL,
          }}
        />
      </View>
      <View style={styles.userInfo__nameView}>
        <Heading size="xl" fontWeight={400}>
          {user.fullName}
        </Heading>
        <Text color="gray.500">{user.email}</Text>
      </View>
    </View>
  );
}

export default UserInfo;
