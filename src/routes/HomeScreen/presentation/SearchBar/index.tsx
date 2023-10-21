import React from 'react';
import { TextInput, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DARKER_WHITE, LIGHTER_BLACK } from '@/styles/colors';

import { SearchBarProps } from '../../model/types';

const SearchBar = ({ keyword, setKeyword }: SearchBarProps) => {
  return (
    <View
      style={{
        backgroundColor: DARKER_WHITE,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <TextInput
        keyboardType="web-search"
        value={keyword}
        onChangeText={setKeyword}
        returnKeyType="search"
        returnKeyLabel="search"
        placeholder="Search"
        style={{ height: 48, flex: 1 }}
      />
      <MaterialCommunityIcons color={LIGHTER_BLACK} size={24} name="magnify" />
    </View>
  );
};

export default SearchBar;
