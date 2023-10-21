import { MMKV } from 'react-native-mmkv';

const localStorage = new MMKV({
  id: 'mmkv-default',
});

export default localStorage;
