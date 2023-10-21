import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import { RootNavigationProp } from '@/models/router/types';
import { PRIMARY_COLOR } from '@/styles/colors';

import { styles } from './styles';

const ScreenHeader = () => {
  const { push } = useNavigation<RootNavigationProp>();

  const handlePressAdd = () => {
    push('EditorScreen');
  };

  return (
    <View style={styles.screenWrapper}>
      <Text style={styles.screenTextTitle}>Secret Note</Text>
      <TouchableNativeFeedback onPress={handlePressAdd}>
        <MaterialCommunityIcons color={PRIMARY_COLOR} style={{ marginLeft: 'auto' }} name="plus" size={24} />
      </TouchableNativeFeedback>
    </View>
  );
};

export default ScreenHeader;
