import React from 'react';
import { TextInput, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { LIGHTER_BLACK } from '@/styles/colors';

import { SearchBarProps } from '../../model/types';
import styles from './styles';

const SearchBar = ({ keyword, setKeyword }: SearchBarProps) => {
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        keyboardType="web-search"
        value={keyword}
        onChangeText={setKeyword}
        returnKeyType="search"
        returnKeyLabel="search"
        placeholder="Search"
        style={styles.searchInput}
      />
      <MaterialCommunityIcons color={LIGHTER_BLACK} size={24} name="magnify" />
    </View>
  );
};

export default SearchBar;
