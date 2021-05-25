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
              NewBookScreen: 'new-book',
              BookDetailsScreen: 'book-details',
            },
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
