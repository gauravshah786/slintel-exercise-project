import React from 'react';
import { useDispatch } from 'react-redux';

import { setUpdatedDocumentName } from '../../redux/appSlice';

// TODO: pass action as prop
const CreateFolderModalContent = () => {
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setUpdatedDocumentName(value));
  };

  return (
    <div>
      <label htmlFor='updatedFolder'>
        Updated name:
      </label>
      <input 
        name='updatedFolder' 
        type='text'
        onChange={handleChange} />
    </div>
  );
};

export default CreateFolderModalContent;