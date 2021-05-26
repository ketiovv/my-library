import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Library: {
            screens: {
              LibraryScreen: 'library',
              BookDetailsScreen: 'book-details',
            },
          },
          NewBook: {
            screens:{
              NewBookScreen: 'new-book',
            }
          },
          MyRates: {
            screens: {
              MyRatesScreen: 'my-rates',
            },
          },
        },
      },
      LandingScreen: 'landing',
      LoginScreen: 'login',
      RegisterScreen: 'register',
      NotFound: '*',
    },
  },
};
