import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { RootNavigationProp } from '@/models/router/types';
import { DARKER_WHITE, DEFAULT_BLACK, LIGHTER_BLACK, PRIMARY_COLOR } from '@/styles/colors';

import type { NoteItemProps } from '../../model/types';

dayjs.extend(relativeTime);

const NoteItem = ({ itemData }: NoteItemProps) => {
  const { push } = useNavigation<RootNavigationProp>();
  const createdDayjs = dayjs(itemData.created_at);
  const isMoreThan5Days = dayjs().diff(createdDayjs, 'days') > 5;
  const renderedDate = isMoreThan5Days ? createdDayjs.format('DD/MM/YY HH:mm') : createdDayjs.fromNow();

  return (
    <View style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
      <TouchableRipple
        onPress={() =>
          push('EditorScreen', {
            data: itemData,
          })
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: DARKER_WHITE,
          }}
        >
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <Text numberOfLines={1} style={{ fontWeight: '700', color: PRIMARY_COLOR }}>
              {itemData.title}
            </Text>
            <Text style={{ marginLeft: 'auto', fontSize: 12, color: LIGHTER_BLACK }}>{renderedDate}</Text>
          </View>
          <Text ellipsizeMode="tail" numberOfLines={5} style={{ color: DEFAULT_BLACK }}>
            {itemData.content}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default NoteItem;
