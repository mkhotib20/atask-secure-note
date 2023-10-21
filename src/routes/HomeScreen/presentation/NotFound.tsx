import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { DEFAULT_WHITE, LIGHTER_BLACK } from '@/styles/colors';

import type { NotfoundProps } from '../model/types';

const NotFound = ({ keyword = '', onCreateNew }: NotfoundProps) => {
  const notfoundWording = keyword
    ? "We couldn't find any notes matching your search. Try different keywords or create a new note to capture what you're looking for."
    : "Oops, it looks like you don't have any notes yet. Start jotting down your thoughts and ideas to create your own digital notebook today!";

  const needToShowButton = !keyword;

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text variant="bodySmall" style={{ textAlign: 'center', color: LIGHTER_BLACK }}>
        {notfoundWording}
      </Text>
      {needToShowButton && (
        <Button onPress={onCreateNew} textColor={DEFAULT_WHITE} mode="contained" style={{ marginTop: 32 }}>
          Create New
        </Button>
      )}
    </View>
  );
};

export default NotFound;
