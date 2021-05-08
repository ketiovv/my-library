/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

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
      AuthenticationNavigator:{
        screens:{
          LandingScreen: 'landing',
          LoginScreen: 'login',
          RegisterScreen: 'register',
        },
      },
      NotFound: '*',
    },
  },
};
