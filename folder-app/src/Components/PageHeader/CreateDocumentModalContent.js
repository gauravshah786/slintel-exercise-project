import { useDispatch } from 'react-redux';

// pass as prop
import { setNewDocumentName } from '../../redux/appSlice';

const CreateDocumentModalContent = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    console.log('in create folder modal', value);
    dispatch(setNewDocumentName(value));
  };

  return (
    <div>
      <label htmlFor='newDocument'>
        Name:
      </label>
      <input 
        name='newDocument'
        type='text' 
        onChange={handleChange}/>
    </div>
  );
};

export default CreateDocumentModalContent;