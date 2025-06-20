import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExcelData, AIInsight } from '../../types';

interface DataState {
  files: ExcelData[];
  currentFile: ExcelData | null;
  insights: AIInsight[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  files: [],
  currentFile: null,
  insights: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    uploadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action: PayloadAction<ExcelData>) => {
      state.files.push(action.payload);
      state.currentFile = action.payload;
      state.loading = false;
    },
    uploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentFile: (state, action: PayloadAction<ExcelData>) => {
      state.currentFile = action.payload;
    },
    addInsight: (state, action: PayloadAction<AIInsight>) => {
      state.insights.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { uploadStart, uploadSuccess, uploadFailure, setCurrentFile, addInsight, clearError } = dataSlice.actions;
export default dataSlice.reducer;