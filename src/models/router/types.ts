import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  EditorScreen?: {
    data: any;
  };
  LoginScreen: undefined;
};

export type RootStackRouteProp<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
