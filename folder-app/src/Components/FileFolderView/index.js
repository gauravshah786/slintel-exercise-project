import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  appSelector,
  updateSelectedItem
} from '../../redux/appSlice';
import GridView from '../GridView';
import { GRID_VIEW } from '../../constants';
import ListView from '../ListView';
import Loading from '../Loading';

const FileFolderView = () => {
  const dispatch = useDispatch();
  const {
    files,
    folders,
    isLoading,
    selectedItem,
    view 
  } = useSelector(appSelector);
  const navigate = useNavigate();

  const handleFolderClick = (e) => {
    const id = e.currentTarget.id;
    const item = folders.find(folder => folder.name === id);
    switch (e.detail) {
      case 1:
        dispatch(updateSelectedItem(item));
        break;
      case 2:
        dispatch(updateSelectedItem(null));
        const to = `/folder/${item.id}`;
        // TODO: check libraries to maintain state on routing
        localStorage.setItem('currentFolder', JSON.stringify(item));
        navigate(to);
        break;
      default:
        break;
    }
  }

  const handleFileClick = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
    const item = files.find(file => file.name === id);
    dispatch(updateSelectedItem(item));
  }

  const getView = () => {
    if(isLoading){
      return (<Loading/>);
    }
  
    // get view from store
    if(view === GRID_VIEW){
      return (
        <GridView
          files={files}
          folders={folders}
          handleFileClick={handleFileClick}
          handleFolderClick={handleFolderClick}
          selected={selectedItem}
        />
      );
    }
    
    return (
      <ListView
        files={files}
        folders={folders}
        handleFileClick={handleFileClick}
        handleFolderClick={handleFolderClick}
        selected={selectedItem}
      />
    );
  };

  console.log('in file folder view');
  return (
    <div>
      { getView() }
    </div>
  );
};

export default FileFolderView;
  