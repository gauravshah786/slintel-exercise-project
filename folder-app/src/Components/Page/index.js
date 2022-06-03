import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import AppHeader from '../AppHeader';
import { fetchContents } from '../../redux/appSlice';
import FileFolderView from '../FileFolderView';
import PageHeader from '../PageHeader';

const Body = styled.div``;

const Page = () => {
  const dispatch = useDispatch();
  // id represents folder id from url
  const { id: folderId} = useParams();
  // TODO: replace from store, replace from react router causes refresh
  const token = localStorage.getItem('token');
  console.log(token, folderId);

  useEffect(() => {
    // fetch Data for a specific user id and folder id
    // infinite loading will need page and offset limit
    dispatch(fetchContents({folderId, token}));
  }, [dispatch, folderId, token]);

  console.log('rendered Page');
  return (
    <div>
      <AppHeader />
      <Body>
        <PageHeader />
        <FileFolderView />
      </Body>
    </div>
  );
};

export default Page;