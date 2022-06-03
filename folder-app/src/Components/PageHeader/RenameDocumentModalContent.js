import { useDispatch } from 'react-redux';

import { setUpdatedDocumentName } from '../../redux/appSlice';

// pass action as prop
const CreateFolderModalContent = (props) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
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