import { View, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import userHomeStyles from '../styles/userHomeStyles';
import { selectUser } from '../../../../redux/features/userSlice';

const styles = userHomeStyles;

// touchableOpacity is used to make the image clickable
function ProfilePicture() {
  const user = useSelector(selectUser);
  return (
    <View style={styles.profile__view}>
      <View style={styles.profile__imageView}>
        <Image
          style={styles.profile__image}
          source={{
            uri: user.photoURL,
          }}
        />
      </View>
    </View>
  );
}

export default ProfilePicture;
