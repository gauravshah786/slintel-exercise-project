// TODO: remove antd dependency
import { Button } from 'antd';
import { faGrip, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import {
  appSelector,
  addDocument,
  deleteDocument,
  setNewDocumentName,
  setUpdatedDocumentName,
  renameFolder,
  updateSelectedItem,
  updateView 
} from '../../redux/appSlice';
import CustomModal from '../Modal';
import CreateDocumentModalContent from './CreateDocumentModalContent';
import DeleteDocumentModalContent from './DeleteDocumentModalContent';
import { GRID_VIEW, LIST_VIEW } from '../../constants';
import RenameDocumentModalContent from './RenameDocumentModalContent';

const Header = styled.div`
  border-bottom: 1px blue solid;
  display: grid;
  grid-template-columns: 11fr 1fr;
  height: 60px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
`;

const ViewContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const FaIconContainer = styled.div`
  cursor: pointer;
`;

function createBodyObject(token, name, currentFolder, isFolder) {
  const parentFullPath = currentFolder.fullPath || '';
  const parentId = currentFolder.id || '';
  return {
    isFolder,
    name,
    parentFullPath,
    parentId,
    token
  }
};

// TODO: create own modal and remove antd modal to pass params from modal to parent
// will be able to reuse functions and reduce code
const PageHeader = () => {
  const dispatch = useDispatch();
  // id represents folder id from url
  const { id: documentId} = useParams();
  const [modalConfig, setModalConfig] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItem, view } = useSelector(appSelector);
  const store = useStore();

  const closeModal = () => {
    setIsOpen(() => false);
    setModalConfig(() => null);
  };

  const isSelectedItemEmpty = () => !selectedItem;
  const isSelectedItemFolder = () => selectedItem.isFolder;
  
  const toggleView = () => dispatch(
    updateView(view === GRID_VIEW ? LIST_VIEW : GRID_VIEW)
  );

  const createDocument = (isFolder = false) => {
    const token = localStorage.getItem('token');
    let currentFolder = {};
    const localStorageCurrentFolder = localStorage.getItem('currentFolder');
    console.log(localStorageCurrentFolder);
    if(localStorageCurrentFolder){
      currentFolder = JSON.parse(localStorageCurrentFolder);
    }
    const { app } = store.getState();
    console.log(currentFolder, app.folders, documentId);
    const body = createBodyObject(token, app.newDocumentName, currentFolder, isFolder);
    console.log(body);
    dispatch(addDocument(body));
    dispatch(setNewDocumentName(''));
    closeModal();
    // console.log('document created');
  };

  const handleCreateFolderOk = () => {
    createDocument(true);
  };

  const handleCreateCancel = () => {
    dispatch(setNewDocumentName(''));
    closeModal();
  };

  const handleDeleteOk = () => {
    const token = localStorage.getItem('token');
    const deleteBody = { documentId: selectedItem.id, token };
    dispatch(deleteDocument(deleteBody));
    dispatch(updateSelectedItem(null));
    closeModal();
    // console.log('folder deleted');
  };

  const handleDeleteCancel = () => {
    dispatch(updateSelectedItem(null));
    closeModal();
  };

  const handleRenameOk = () => {
    const { app } = store.getState();
    const newName = app.updatedDocumentName;
    dispatch(renameFolder({from: selectedItem.name, to: newName}));
    dispatch(setUpdatedDocumentName(''));
    dispatch(updateSelectedItem(null));
    closeModal();
    // console.log('folder renamed');
  };

  const handleRenameCancel = () => {
    dispatch(setUpdatedDocumentName(''));
    dispatch(updateSelectedItem(null));
    closeModal();
  };

  const handleCreateFileOk = () => {
    createDocument(false);
  };

  const createFolderConfig = {
    title: 'Create Folder',
    handleOk: handleCreateFolderOk,
    handleCancel: handleCreateCancel,
    okText: 'Create',
    content: <CreateDocumentModalContent />
  };

  const deleteFolderConfig = {
    title: 'Delete Folder',
    handleOk: handleDeleteOk,
    handleCancel: handleDeleteCancel,
    okText: 'Delete',
    content: <DeleteDocumentModalContent/>
  };
  
  const renameFolderConfig = {
    title: 'Rename Folder',
    handleOk: handleRenameOk,
    handleCancel: handleRenameCancel,
    okText: 'Rename',
    content: <RenameDocumentModalContent/>
  };

  const createFileConfig = {
    title: 'Create File',
    handleOk: handleCreateFileOk,
    handleCancel: handleCreateCancel,
    okText: 'Create',
    content: <CreateDocumentModalContent />
  };

  const deleteFileConfig = {
    title: 'Delete File',
    handleOk: handleDeleteOk,
    handleCancel: handleDeleteCancel,
    okText: 'Delete',
    content: <DeleteDocumentModalContent/>
  };

  const renameFileConfig = {
    title: 'Rename File',
    handleOk: handleRenameOk,
    handleCancel: handleRenameCancel,
    okText: 'Rename',
    content: <RenameDocumentModalContent/>
  };
  
  const showCreateModal = (isFolder) => {
    const config = isFolder ? createFolderConfig : createFileConfig;
    setModalConfig(() => config);
    setIsOpen(true);
  };

  const showDeleteModal = (isFolder) => {
    const config = isFolder ? deleteFolderConfig : deleteFileConfig;
    setModalConfig(() => config);
    setIsOpen(true);
  };

  const showRenameModal = (isFolder) => {
    const config = isFolder ? renameFolderConfig : renameFileConfig;
    setModalConfig(() => config);
    setIsOpen(true);
  };

  return (
    <Header>
      {/* <BreadCrumb>
      </BreadCrumb> */}
      <ButtonContainer>
        <Button shape='round' onClick={() => showCreateModal(true)}>
          Create Folder
        </Button>
        <Button 
          shape='round' 
          onClick={() => showDeleteModal(true)} 
          disabled={ isSelectedItemEmpty() || !isSelectedItemFolder() }>
          Delete Folder
        </Button>
        <Button 
          shape='round' 
          onClick={() => showRenameModal(true)} 
          disabled={ isSelectedItemEmpty() || !isSelectedItemFolder() }>
          Rename Folder
        </Button>
        <Button 
          shape='round' 
          onClick={() => showCreateModal(false)}>
          Create File
        </Button>
        <Button 
          shape='round' 
          onClick={() => showDeleteModal(false)} 
          disabled={ isSelectedItemEmpty() || isSelectedItemFolder() }>
          Delete File
        </Button>
        <Button 
          shape='round' 
          onClick={() => showRenameModal(false)} 
          disabled={ isSelectedItemEmpty() || isSelectedItemFolder() }>
          Rename File
        </Button>
      </ButtonContainer>
      <ViewContainer>
        <FaIconContainer onClick={toggleView}>
          <FontAwesomeIcon icon={view === GRID_VIEW ? faList : faGrip} />
        </FaIconContainer>
      </ViewContainer>
      
      {/* Modal is getting re-rendered on input changes for new folder/rename */}
      {
        isOpen && <CustomModal config={modalConfig} />
      }
    </Header>
  );
};

export default PageHeader;