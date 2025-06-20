import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chart, ChartConfig } from '../../types';

interface ChartState {
  charts: Chart[];
  currentChart: Chart | null;
  config: ChartConfig | null;
  loading: boolean;
}

const initialState: ChartState = {
  charts: [],
  currentChart: null,
  config: null,
  loading: false,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<ChartConfig>) => {
      state.config = action.payload;
    },
    generateStart: (state) => {
      state.loading = true;
    },
    generateSuccess: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
      state.currentChart = action.payload;
      state.loading = false;
    },
    setCurrentChart: (state, action: PayloadAction<Chart>) => {
      state.currentChart = action.payload;
    },
    clearConfig: (state) => {
      state.config = null;
    },
  },
});

export const { setConfig, generateStart, generateSuccess, setCurrentChart, clearConfig } = chartSlice.actions;
export default chartSlice.reducer;