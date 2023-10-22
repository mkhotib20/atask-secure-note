import React from 'react';
import { FlatList, Platform, RefreshControl, SafeAreaView, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { RootNavigationProp } from '@/models/router/types';

import NotFound from './presentation/NotFound';
import NoteItem from './presentation/NoteItem';
import ScreenHeader from './presentation/ScreenHeader';
import SearchBar from './presentation/SearchBar';
import useNoteData from './repo/useNoteData';
import styles from './styles';

const HomeScreen = () => {
  const { push } = useNavigation<RootNavigationProp>();
  const { noteData, fetchData, setKeyword, keyword } = useNoteData();

  const handleAdd = () => {
    push('EditorScreen');
  };

  return (
    <SafeAreaView style={styles.outerWrapper}>
      {Platform.OS === 'android' && (
        <FAB icon="plus" style={styles.fabStyle} color="white" onPress={handleAdd} mode="elevated" />
      )}
      <View style={styles.upperWrapper}>
        <ScreenHeader />
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </View>
      {!noteData.length && <NotFound onCreateNew={handleAdd} keyword={keyword} />}
      <FlatList
        style={styles.listWrapper}
        refreshControl={<RefreshControl refreshing={false} onRefresh={fetchData} />}
        data={noteData}
        keyExtractor={({ id }, idx) => `${id}_${idx}`}
        renderItem={({ item }) => <NoteItem itemData={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
