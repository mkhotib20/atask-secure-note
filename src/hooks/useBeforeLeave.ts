import { useEffect } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootNavigationProp } from '@/models/router/types';

const useBeforeLeave = (hasUnsavedChanges = false) => {
  const navigation = useNavigation<RootNavigationProp>();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'RESET') {
          return;
        }
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Are you sure want to leave?',
          'You have unsaved changes! If you leave, your changes will be gone!',
          [
            { text: 'No' },
            {
              text: 'Yes',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  const remove = () => {
    navigation.removeListener('beforeRemove', () => {});
  };
  return { remove };
};

export default useBeforeLeave;
