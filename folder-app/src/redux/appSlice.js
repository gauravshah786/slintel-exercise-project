import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { 
  addDocumentAPI,
  deleteDocumentAPI,
  fetchContentsAPI,
  renameDocumentAPI
} from '../service/apiService';
import { GRID_VIEW } from '../constants';

const initialState = { 
  files: [],
  folders: [],
  isLoading: true,
  isModalVisible: false,
  modalConfig: null,
  newDocumentName: '',
  selectedItem: null,
  updatedDocumentName: '',
  view: GRID_VIEW
};

export const fetchContents = createAsyncThunk(
  '/fetchContents', 
  async (params, thunkAPI) => {
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
  async (document, thunkAPI) => {
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
  async (document, thunkAPI) => {
    try {
      const response = await deleteDocumentAPI(document);
      return response.data;
    } catch(error) {
      console.log('Error', error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const renameDocument = createAsyncThunk(
  '/renameDocument',
  async (document, thunkAPI) => {
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
  },
  extraReducers: {
    [fetchContents.fulfilled]: (state, { payload }) => {
      console.log('in resolved data', payload);
      const { files, folders }  = payload;
      return {
        ...state,
        files,
        folders,
        isLoading: false
      }
    },
    [fetchContents.rejected]: (state) => {
      // TODO: set error state true
      return {
        ...state,
        isLoading: false
      }
    },
    [fetchContents.pending]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [addDocument.fulfilled]: (state, action) => {
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
    },
    [addDocument.rejected]: (state) => {
      // TODO: set error state true
      return {
        ...state,
        isLoading: false
      };      
    },
    [addDocument.pending]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [deleteDocument.fulfilled]: (state, action) => {
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
    },
    [deleteDocument.rejected]: (state) => {
      // TODO: set error state true
      return {
        ...state,
        isLoading: false
      };      
    },
    [deleteDocument.pending]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
  },
});

export const {
  renameFolder,
  setNewDocumentName,
  setUpdatedDocumentName,
  updateSelectedItem,
  updateView
} = appSlice.actions;

export default appSlice.reducer;

export const appSelector = state => state.app;