/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  AuthenticationNavigator: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Library: undefined;
  NewBook: undefined;
  MyRates: undefined;
};

export type LibraryParamList = {
  LibraryScreen: undefined;
  BookDetailsScreen: undefined;
};

export type NewBookParamList = {
  NewBookScreen: undefined;
};

export type MyRatesParamList = {
  MyRatesScreen: undefined;
};

export type AuthenticationParamList = {
  LandingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Root: undefined;
};
