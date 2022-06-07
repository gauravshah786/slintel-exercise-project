import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  appSelector,
  updateSelectedItem
} from '../../redux/appSlice';
import GridView from '../GridView';
import ListView from '../ListView';
import Loading from '../Loading';
import { View } from '../../redux/appSlice';
import { Document } from '../../types';
import { AppDispatch } from '../../redux/store';

export interface ViewProps {
  files: Array<Document>,
  folders: Array<Document>,
  handleFileClick: (e: React.MouseEvent<HTMLElement>) => void,
  handleFolderClick: (e: React.MouseEvent<HTMLElement>) => void,
  selected: Document | null
};

const FileFolderView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    files,
    folders,
    isLoading,
    selectedItem,
    view 
  } = useSelector(appSelector);
  const navigate = useNavigate();

  const handleFolderClick = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    const item = folders.find(folder => folder.name === id);
    switch (e.detail) {
      case 1:
        dispatch(updateSelectedItem(item));
        break;
      case 2:
        dispatch(updateSelectedItem(null));
        const to = item ? `/folder/${item.id}` : '/';
        // TODO: check libraries to maintain state on routing
        localStorage.setItem('currentFolder', JSON.stringify(item));
        navigate(to);
        break;
      default:
        break;
    }
  }

  const handleFileClick = (e: React.MouseEvent<HTMLElement>) => {
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
    if(view === View.grid_view){
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
  