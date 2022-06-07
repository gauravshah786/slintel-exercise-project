import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { 
  addDocumentAPI,
  deleteDocumentAPI,
  fetchContentsAPI,
  renameDocumentAPI
} from '../service/apiService';
import {
  AddDocumentParams,
  Document,
  FetchContentsParams,
  RenameDocumentParams
} from '../types';
import type { RootState } from './store';

export enum View {
  grid_view = 'grid_view',
  list_view = 'list_view'
};

type ViewType = keyof typeof View;

interface AppState {
  files: Array<Document>,
  folders: Array<Document>,
  isLoading: boolean,
  isModalVisible: boolean,
  modalConfig: null,
  newDocumentName: string | null,
  selectedItem: Document | null,
  updatedDocumentName: string | null,
  view: ViewType
};

const initialState: AppState = { 
  files: [],
  folders: [],
  isLoading: true,
  isModalVisible: false,
  modalConfig: null,
  newDocumentName: null,
  selectedItem: null,
  updatedDocumentName: null,
  view: View.grid_view
};


export const fetchContents = createAsyncThunk(
  '/fetchContents', 
  async (params: FetchContentsParams, thunkAPI) => {
    try {
      const response = await fetchContentsAPI(params);
      return response.data;
    } catch(error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addDocument = createAsyncThunk(
  '/addDocument',
  async (document: AddDocumentParams, thunkAPI) => {
    try {
      const response = await addDocumentAPI(document);
      return response.data;
    } catch(error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  '/deleteDocument',
  async (reqBody: FetchContentsParams, thunkAPI) => {
    try {
      const response = await deleteDocumentAPI(reqBody);
      return response.data;
    } catch(error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const renameDocument = createAsyncThunk(
  '/renameDocument',
  async (document: RenameDocumentParams, thunkAPI) => {
    try {
      const response = await renameDocumentAPI(document);
      return response.data;
    } catch(error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // TODO: update this, can not use state directly
    renameFolder(state, action){
      const { from, to } = action.payload;
      const newFolders = state.folders.map(folder => {
        return folder.name !== from
          ? folder : { ...folder, name: to };
      });
      return {
        ...state,
        folders: newFolders
      };
    },
    updateView(state, action) {
      return {
        ...state,
        view: action.payload
      };
    },
    updateSelectedItem(state, action) {
      return  {
        ...state,
        selectedItem: action.payload
      };
    },
    // TODO: create your own modal component
    // pass the updated or newly created object to Ok callback
    // modal should have its own state
    // name should not be saved in store
    setNewDocumentName(state, action){
      return {
        ...state,
        newDocumentName: action.payload
      }
    },
    setUpdatedDocumentName(state, action){
      return {
        ...state,
        updatedDocumentName: action.payload
      }
    },
    setCurrentPath(state, action){
      return {
        ...state,
        currentPath: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.fulfilled, (state, { payload }) => {
        console.log('in resolved data', payload);
        const { files, folders }  = payload;
        return {
          ...state,
          files,
          folders,
          isLoading: false
        };
      })
      .addCase(fetchContents.rejected, (state) => {
        // TODO: set error state true
        return {
          ...state,
          isLoading: false
        }
      })
      .addCase(fetchContents.pending, (state) => {
        return {
          ...state,
          isLoading: true
        }
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        console.log('addDocument fulfilled', action);
        const { document } = action.payload;
        // Should we get full data on each document creation?
        const newState = document.isFolder ? 
          {
            ...state,
            folders: [...state.folders, document],
            isLoading: false
          } 
          :
          {
            ...state,
            files: [...state.files, document],
            isLoading: false
          };
        return newState;
      })
      .addCase(addDocument.rejected, (state) => {
        // TODO: set error state true
        return {
          ...state,
          isLoading: false
        };      
      })
      .addCase(addDocument.pending, (state) => {
        return {
          ...state,
          isLoading: true
        }
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        console.log('deleteDocument fulfilled', action);
        const { document } = action.payload;
        // Should we get full data?
        let updatedState;
        if(document.isFolder){
          const filtered = state.folders
                            .filter(folder => folder.name !== document.name);
          updatedState = {
            ...state,
            folders: filtered,
            isLoading: false
          }
        } else {
          const filtered = state.files
                            .filter(file => file.name !== document.name);
          updatedState = {
            ...state,
            files: filtered,
            isLoading: false
          }
        }
        return updatedState;
      })
      .addCase(deleteDocument.rejected, (state) => {
        // TODO: set error state true
        return {
          ...state,
          isLoading: false
        };      
      })
      .addCase(deleteDocument.pending, (state) => {
        return {
          ...state,
          isLoading: true
        }
      })
  },
});

export const {
  renameFolder,
  setCurrentPath,
  setNewDocumentName,
  setUpdatedDocumentName,
  updateSelectedItem,
  updateView
} = appSlice.actions;

export default appSlice.reducer;

export const appSelector = (state: RootState) => state.app;