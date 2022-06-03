import axios from 'axios'; 

const SIGNIN_URL = '/api/login';

export const signIn = async (credentials) => {
  console.log('in signIn auth', credentials);
  const response = await axios.post(SIGNIN_URL, credentials);
  console.log('in signIn service', response);
  return response.data;
};

// call required to sign out cookie based authentication
// const SIGNOUT_URL = '/logout';
// export const signOut = () => {
//   console.log('in signOut auth');
// };

const DOCUMENT_URL = '/api/document';

export const fetchContentsAPI = async (params) => {
  console.log('in fetch content', params);
  const { token, documentId } = params;

  const url = documentId !== undefined ? `${DOCUMENT_URL}/${documentId}` : DOCUMENT_URL;
  console.log(url);
  console.log(`${DOCUMENT_URL}/${documentId}`);
  const options = {
    'headers': {
      'Authorization': `token ${token}`
    }
  };
  const response = await axios.get(url, options);
  console.log('in fetch service', response);
  return response.data;
};

export const addDocumentAPI = async (document) => {
  console.log('in add document', document);
  const response = await axios.post(DOCUMENT_URL, document);
  console.log('in add service', response);
  return response.data;
};

export const deleteDocumentAPI = async (document) => {
  console.log('in delete document', document);
  const response = await axios.delete(DOCUMENT_URL, document);
  console.log('in delete service', response);
  return response.data;
};

export const renameDocumentAPI = async (document) => {
  console.log('in rename document', document);
  const response = await axios.patch(DOCUMENT_URL, document);
  console.log('in rename service', response);
  return response.data;
};