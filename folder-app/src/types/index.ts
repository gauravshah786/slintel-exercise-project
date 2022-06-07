interface FetchContentsParams {
  token: string,
  documentId: string
};

interface Document {
  fullPath: string,
  id: string,
  isFolder: boolean,
  name: string,
  parentId: string
};

interface AddDocumentParams {
  isFolder: boolean,
  name: string,
  parentFullPath: string,
  parentId: string,
  token: string,
};

interface RenameDocumentParams {
  document: Document,
  to: string
};

export {
  AddDocumentParams,
  Document,
  FetchContentsParams,
  RenameDocumentParams
};

