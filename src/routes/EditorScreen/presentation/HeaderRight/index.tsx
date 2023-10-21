import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PRIMARY_COLOR } from '@/styles/colors';

import type { HeaderRightProps } from '../../model/types';

const HeaderRight = ({ onSave, isEdit, onDelete }: HeaderRightProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {isEdit && (
        <TouchableNativeFeedback onPress={onDelete}>
          <MaterialCommunityIcons style={{ marginRight: 10 }} color={PRIMARY_COLOR} name="delete-outline" size={20} />
        </TouchableNativeFeedback>
      )}
      <TouchableNativeFeedback onPress={onSave}>
        <MaterialCommunityIcons color={PRIMARY_COLOR} name="check" size={20} />
      </TouchableNativeFeedback>
    </View>
  );
};

export default HeaderRight;
