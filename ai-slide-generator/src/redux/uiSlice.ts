import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface UIState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  loading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;
