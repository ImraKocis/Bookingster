import {View, Image, TouchableOpacity} from 'react-native';
import {Text, HStack, VStack, Center, Heading} from 'native-base';
import React, {useState, useEffect} from 'react';
import {LoadChoiceImg} from '../../assets/getImages';
import {choiceStyle} from './choiceStyle';

const styles = choiceStyle;

export default function Choice({navigation}) {
  const [choiceImg, setChoiceImg] = useState();

  const GetUrls = async () => {
    setChoiceImg(await LoadChoiceImg());
  };

  useEffect(() => {
    GetUrls();
  }, []);
  return (
    <View style={styles.choiceScreen}>
      <Center flex={0.4} marginTop={10}>
        <VStack flex={1}>
          <Image style={styles.image} source={{uri: choiceImg}} />
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
            }}>
            Vi ste?
          </Heading>
        </HStack>
      </Center>
      <Center flex={0.4}>
        <VStack flex={1}>
          <HStack marginY={7}>
            <Center>
              {/*navigacija na novi racun te ugostitelj hint, itd. */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Novi_racun_ugostitelj')}>
                <Text style={styles.buttonText}>Ugostitelj</Text>
              </TouchableOpacity>
            </Center>
          </HStack>
          <HStack>
            <Center>
              {/*navigacija na novi reacun te prijavu */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Novi_racun_korisnik')}>
                <Text style={styles.buttonText}>Korisnik</Text>
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
          bottom={1}>
          <Text>© 2022 Bookingster - Sva prava pridržana.</Text>
        </HStack>
      </Center>
    </View>
  );
}
