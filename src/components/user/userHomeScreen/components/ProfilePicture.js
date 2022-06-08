import {View, Text, Image} from 'react-native';
import React from 'react';
import {userHomeStyles} from '../styles/userHomeStyles';

const styles = userHomeStyles;

const ProfilePicture = () => {
  return (
    <View style={styles.profile__view}>
      {/*touchableOpacity is used to make the image clickable*/}
      <View style={styles.profile__imageView}>
        <Image
          style={styles.profile__image}
          source={{
            uri: 'https://ui-avatars.com/api/?name=IME+PREZIME&background=random&rounded=true',
          }}
        />
      </View>
    </View>
  );
};

export default ProfilePicture;
