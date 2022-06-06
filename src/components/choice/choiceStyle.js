import {StyleSheet} from 'react-native';
import {backgroundColor, primary} from '../../assets/getColors';

export const choiceStyle = StyleSheet.create({
  choiceScreen: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  button: {
    backgroundColor: primary,
    width: 195,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {width: 310, height: 250},
});
