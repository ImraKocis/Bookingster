import { StyleSheet } from 'react-native';
import { backgroundColor, primary } from '../../../../assets/getColors';

const userHomeStyles = StyleSheet.create({
  image: {
    width: 140,
    height: 95,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  image__long: {
    width: 140,
    height: 95,
    borderRadius: 10,
    marginLeft: 10,
    marginVertical: 10,
  },
  CardView: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    maxWidth: 175,
    minHeight: 185,
    margin: 10,
  },
  LongCardView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    maxHeight: 150,

    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  longCard__Button: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    marginRight: 20,
    marginBottom: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: primary,
  },
  longCard__ButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  searchBar__container: {
    flex: 0.1,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%',
  },
  searchBar__unclicked: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    flex: 1,
    padding: 5,
    marginTop: 40,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',

    justifyContent: 'space-evenly',
  },
  list__container: {
    flex: 0.9,
    marginTop: '5%',
    height: '85%',
    width: '100%',
    // backgroundColor: 'black',
  },
  list__item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  list__title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  list__details: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  home__view: {
    backgroundColor,
    flex: 1,
    width: '100%',
  },
  home__title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  profile__view: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: 20,
  },
  profile__imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profile__image: { width: 50, height: 50, borderRadius: 30 },
  HeaderView: {
    flex: 1,

    marginLeft: 15,
    marginBottom: 10,
    marginTop: 30,
  },
});

export default userHomeStyles;
