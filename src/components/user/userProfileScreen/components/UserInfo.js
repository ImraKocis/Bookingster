import { View, Image } from 'react-native';
import React from 'react';
import { Heading, Text } from 'native-base';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUser } from '../../../../redux/features/userSlice';
import userProfileStyles from '../styles/userProfileStyles';

const styles = userProfileStyles;

function UserInfo() {
  const user = useSelector(selectUser);
  return (
    <View
      style={{
        flex: 1,
        // maxHeight: '22%',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: '5%',
      }}
    >
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

// UserInfo.propTypes = {
//   clicked: PropTypes.bool.isRequired,
// };

export default UserInfo;
