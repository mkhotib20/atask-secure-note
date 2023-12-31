import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PRIMARY_COLOR } from '@/styles/colors';

import type { HeaderRightProps } from '../../model/types';
import styles from './styles';

const HeaderRight = ({ onSave, isEdit, onDelete }: HeaderRightProps) => {
  return (
    <View style={styles.headerWrapper}>
      {isEdit && (
        <TouchableNativeFeedback testID="deleteButton" onPress={onDelete}>
          <MaterialCommunityIcons style={styles.headerIcon} color={PRIMARY_COLOR} name="delete-outline" size={24} />
        </TouchableNativeFeedback>
      )}
      {/* need use test id because its icon */}
      <TouchableNativeFeedback testID="saveButton" onPress={onSave}>
        <MaterialCommunityIcons color={PRIMARY_COLOR} name="check" size={24} />
      </TouchableNativeFeedback>
    </View>
  );
};

export default HeaderRight;
