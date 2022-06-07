import React from 'react';
import { useSelector} from 'react-redux';

import { appSelector } from '../../redux/appSlice';

// pass selectedItem as prop
const DeleteFolderModalContent = () => {
  const app = useSelector(appSelector);
  const name = app.selectedItem?.name || '';
  return (
    <div>
      <p>
        Are you sure you want to delete <b>{name}</b> folder with all its sub-folders and files?
      </p>
    </div>
  );
};

export default DeleteFolderModalContent;