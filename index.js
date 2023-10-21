/**
 * @format
 */
import { AppRegistry } from 'react-native';
import bcrypt from 'react-native-bcrypt';

import isaac from 'isaac';

import { name as appName } from './app.json';
import App from './src/App';

bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return [...buf.map(() => Math.floor(isaac.random() * 256))];
});

AppRegistry.registerComponent(appName, () => App);
