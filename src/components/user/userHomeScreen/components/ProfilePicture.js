import {View, Text, Image} from 'react-native';
import React from 'react';
import {userHomeStyles} from '../styles/userHomeStyles';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../../redux/features/userSlice';

const styles = userHomeStyles;

const ProfilePicture = () => {
  const user = useSelector(selectUser);
  return (
    <View style={styles.profile__view}>
      {/*touchableOpacity is used to make the image clickable*/}
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
};

export default ProfilePicture;
