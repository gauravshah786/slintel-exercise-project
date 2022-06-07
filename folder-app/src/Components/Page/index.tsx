import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AppHeader from '../AppHeader';
import { fetchContents } from '../../redux/appSlice';
import FileFolderView from '../FileFolderView';
import PageHeader from '../PageHeader';
import { AppDispatch } from '../../redux/store';

const Body = styled.div``;

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  // id represents document id from url
  const { id } = useParams();
  // TODO: replace from store, replace from react router causes refresh
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    // fetch Data for a specific user id and folder id
    // infinite loading will need page and offset limit
    const documentId = id || '';
    dispatch(fetchContents({ token, documentId }));
  }, [dispatch, id, token]);

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