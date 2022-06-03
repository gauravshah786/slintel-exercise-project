import { useSelector} from 'react-redux';
import { appSelector } from '../../redux/appSlice';

// pass selectedItem as prop
const DeleteFolderModalContent = () => {
  const app = useSelector(appSelector);
  return (
    <div>
      <p>
        Are you sure you want to delete <b>{app.selectedItem.name}</b> folder with all its sub-folders and files?
      </p>
    </div>
  );
};

export default DeleteFolderModalContent;