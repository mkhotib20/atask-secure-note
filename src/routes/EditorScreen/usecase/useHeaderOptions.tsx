import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { UseHeaderOptions } from '../model/types';
import HeaderRight from '../presentation/HeaderRight';

const useHeaderOptions = ({ onSave, isEdit, onDelete }: UseHeaderOptions) => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      headerRight() {
        return <HeaderRight isEdit={isEdit} onSave={onSave} onDelete={onDelete} />;
      },
    });
  }, [setOptions, onSave, onDelete, isEdit]);
};

export default useHeaderOptions;
