import { View, Image, TouchableOpacity } from 'react-native';
import { Text, HStack, VStack, Center, Heading } from 'native-base';
import React, { useState, useEffect } from 'react';
import { LoadWelcomeImg } from '../../assets/getImages';
import welcomeStyle from './welcomeStyle';

const styles = welcomeStyle;

function Welcome({ navigation }) {
  const [welcomeImg, setWelcomeImg] = useState();

  const GetUrls = async () => {
    setWelcomeImg(await LoadWelcomeImg());
  };

  useEffect(() => {
    GetUrls();
  }, []);

  return (
    <View style={styles.welcomeScreen}>
      <Center flex={0.4} marginTop={10}>
        <VStack flex={1}>
          <Image style={styles.image} source={{ uri: welcomeImg }} />
        </VStack>
      </Center>
      <Center marginTop={5} flex={0.1}>
        <HStack>
          <Heading
            size="2xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            Dobrodošli
          </Heading>
        </HStack>
      </Center>
      <Center flex={0.4}>
        <VStack flex={1}>
          <HStack marginY={7}>
            <Center>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Prijava')}
              >
                <Text style={styles.buttonText}>Prijava</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
          <HStack>
            <Center>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Choice_navigator')}
              >
                <Text style={styles.buttonText}>Novi račun</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
        </VStack>
      </Center>
      <Center flex={0.1}>
        <HStack
          width="100%"
          position="absolute"
          justifyContent="center"
          alignItems="center"
          bottom={1}
        >
          <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
        </HStack>
      </Center>
    </View>
  );
}

export default Welcome;
